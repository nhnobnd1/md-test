import {
  useDebounceFn,
  useJob,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  GetMembersGroupRequest,
  GroupMembers,
  UserGroupRepository,
} from "@moose-desk/repo";
import { uniqBy } from "lodash-es";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import useDeepEffect from "src/hooks/useDeepEffect";
import useMessage from "src/hooks/useMessage";
import { AgentSelect } from "src/modules/ticket/components/TicketForm/AgentSelect";
import { defaultFilter } from "src/utils/localValue";
// import PhUserPlusFill from "~icons/ph/user-plus-fill";

interface GroupFormMemberProps {
  groupId?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

const GroupFormMember = memo(
  ({ value, groupId, onChange }: GroupFormMemberProps) => {
    const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
    const [groupMembersTable, setGroupMembersTable] = useState<GroupMembers[]>(
      []
    );
    const { toggle: updateTable } = useToggle();
    const message = useMessage();
    const [groupIds, setGroupIds] = useState<string[]>(value ?? []);
    const [filterData, setFilterData] =
      useState<GetMembersGroupRequest>(defaultFilter);
    const prevFilter = usePrevious<GetMembersGroupRequest>(filterData);
    const { t } = useTranslation();

    const isDetail = useMemo(() => {
      return !!groupId;
    }, [groupId]);

    const handleSelectAgent = useCallback(
      (value: string, option: any) => {
        value = value?.split(",")[0];
        if (!Array.isArray(option) && value) {
          if (isDetail) {
            setGroupIds([...groupIds, value]);
          }

          const memberExist = groupMembers.find((item) => item._id === value);
          if (!memberExist) {
            setGroupMembers((values) => {
              return [
                {
                  _id: value,
                  email: option.obj?.email,
                  name:
                    option.obj?.lastName === "admin"
                      ? option.obj?.firstName
                      : option.obj?.firstName + " " + option.obj?.lastName,
                },
                ...values,
              ];
            });
          }
        }
      },
      [groupMembers, groupIds]
    );

    const { run: getListMemberGroupApi, processing: loadingGetList } = useJob(
      (
        id: string,
        payload: GetMembersGroupRequest,
        option?: { reset: boolean }
      ) => {
        return UserGroupRepository()
          .getListMembers(id, payload)
          .pipe(
            map(({ data }) => {
              if (option?.reset) {
                setGroupMembers(data.data);
              } else {
                let dataMember: GroupMembers[] = [];
                if (groupIds.length > 0) {
                  data.data.forEach((item) => {
                    if (groupIds.includes(item._id)) {
                      dataMember.push(item);
                    }
                  });
                } else {
                  dataMember = [...data.data];
                }
                setGroupMembers(
                  uniqBy([...groupMembers, ...dataMember], "_id")
                );
              }
            }),
            catchError((err) => {
              message.error(t("messages:error.something_went_wrong"));
              return of(err);
            })
          );
      }
    );

    const { run: getListMemberGroupDebounce } = useDebounceFn(
      (id: string, payload: GetMembersGroupRequest) => {
        getListMemberGroupApi(id, payload, { reset: true });
      },
      { wait: 300 }
    );

    const [memberRemove, setMemberRemove] = useState<GroupMembers | null>(null);

    const prevMemberRemove = usePrevious<GroupMembers | null>(memberRemove);

    const handleOpenModalRemove = useCallback((member: GroupMembers) => {
      setMemberRemove(member);
    }, []);

    const handleFiltersQueryChange = useCallback(
      (queryValue: string) => {
        setFilterData((old) => {
          return {
            ...old,
            query: queryValue,
            page: 1,
          };
        });
      },
      [filterData]
    );

    const removeMembersItem = useCallback(
      (id: string) => {
        if (isDetail) {
          setGroupIds(groupIds.filter((item) => item !== id));
        }
        setMemberRemove(null);
        setGroupMembers(groupMembers.filter((item) => item._id !== id));
      },
      [groupMembers]
    );

    const onPagination = useCallback(
      ({ page, limit }: { page: number; limit: number }) => {
        setFilterData((value) => {
          return {
            ...value,
            page,
            limit,
          };
        });
      },
      []
    );

    useEffect(() => {
      if (prevMemberRemove?._id !== memberRemove?._id && memberRemove) {
        removeMembersItem(memberRemove._id);
      }
    }, [memberRemove]);

    useEffect(() => {
      setGroupMembersTable(groupMembers);
      if (isDetail) {
        onChange && onChange(groupIds);
      } else {
        const ids = groupMembers.map((item) => item._id);
        onChange && onChange(ids);
      }
    }, [groupMembers]);

    useDeepEffect(() => {
      if (isDetail && groupId && groupIds.length > 0) {
        if (prevFilter?.query !== filterData.query && filterData.query) {
          getListMemberGroupDebounce(groupId, filterData);
        } else {
          getListMemberGroupApi(groupId, filterData);
        }
      } else {
        if (filterData.query) {
          const filterRegex = new RegExp(filterData.query.toLowerCase(), "g");
          setGroupMembersTable(
            groupMembers.filter(
              (item) =>
                item.name.toLocaleLowerCase().match(filterRegex) ||
                item.email.toLocaleLowerCase().match(filterRegex)
            )
          );
        } else {
          setGroupMembersTable(groupMembers);
        }
      }
    }, [filterData, groupIds]);

    useEffect(() => {
      value && setGroupIds(value);
    }, [value]);

    return (
      <div>
        <div className="flex gap-3 xs:flex-col md:flex-row">
          <div className="mb-5  flex-1">
            <AgentSelect
              placeholder="+ Add member"
              onChange={handleSelectAgent}
              className="w-full"
              filter={false}
            />
          </div>
          <div className="mb-5 flex-1">
            <MDSearchInput onTypeSearch={handleFiltersQueryChange} />
          </div>
        </div>
        <div>
          <Table
            dataSource={groupMembersTable}
            loading={loadingGetList}
            onChange={updateTable}
            pagination={
              !isDetail
                ? groupMembersTable.length > 0 && {
                    defaultCurrent: 1,
                    pageSize: 5,
                    defaultPageSize: 5,
                  }
                : groupMembersTable.length > 0 && {
                    current: filterData.page,
                    pageSize: filterData.limit,
                    total: groupIds.length,
                    onChange: (page: number, pageSize: number) =>
                      onPagination({ page: page, limit: pageSize }),
                  }
            }
          >
            <Table.Column
              key="name"
              title="Name"
              render={(_, record: GroupMembers) => (
                <span>{record.name.replace("admin", "")}</span>
              )}
              sorter={{
                compare: (a: any, b: any) => a.name.localeCompare(b.name),
              }}
            />
            <Table.Column
              key="email"
              title="Email"
              dataIndex="email"
              sorter={{
                compare: (a: any, b: any) => a.name.localeCompare(b.name),
              }}
            ></Table.Column>

            <Table.Column
              align="center"
              title="Action"
              render={(_, record: GroupMembers) => (
                // <TableAction
                //   record={record}
                //   showDelete
                //   onDelete={() => handleOpenModalRemove(record)}
                //   onlyIcon
                // />
                <TableAction
                  record={record}
                  specialDelete={{
                    title: "Remove member ?",
                    description:
                      "This Agent will be removed permanently. This action cannot be undone.",
                    textDelete: "Remove",
                  }}
                  onSpecialDelete={() => handleOpenModalRemove(record)}
                  onlyIcon
                />
              )}
            />
          </Table>
        </div>
      </div>
    );
  }
);

export default GroupFormMember;
