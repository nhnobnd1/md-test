import {
  useDebounceFn,
  useJob,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  AgentRepository,
  BaseMetaDataListResponse,
  GetMembersGroupRequest,
  GroupMembers,
  UserGroupRepository,
} from "@moose-desk/repo";
import { Input } from "antd";
import { uniqBy } from "lodash-es";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import Select, {
  LoadMoreValue,
  OptionType,
} from "src/components/UI/Select/Select";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
// import PhUserPlusFill from "~icons/ph/user-plus-fill";

interface GroupFormMemberProps {
  groupId?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

const GroupFormMember = memo(
  ({ value, groupId, onChange }: GroupFormMemberProps) => {
    const defaultFilter: () => GetMembersGroupRequest = () => ({
      page: 1,
      limit: 5,
      query: "",
    });
    const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
    const [groupMembersTable, setGroupMembersTable] = useState<GroupMembers[]>(
      []
    );
    const { toggle: updateTable } = useToggle();

    const [groupIds, setGroupIds] = useState<string[]>(value ?? []);

    const [filterData, setFilterData] = useState<GetMembersGroupRequest>(
      defaultFilter()
    );
    const prevFilter = usePrevious<GetMembersGroupRequest>(filterData);
    const [meta, setMeta] = useState<BaseMetaDataListResponse>();

    const resetFilterData = useCallback(() => {
      setFilterData(defaultFilter());
    }, []);

    const isDetail = useMemo(() => {
      return !!groupId;
    }, [groupId]);

    const fetchAgents = useCallback(
      (params: LoadMoreValue) => {
        const limit = env.DEFAULT_PAGE_SIZE;
        return AgentRepository()
          .getList({
            page: params.page,
            limit: limit,
            query: params.searchText,
          })
          .pipe(
            map(({ data }) => {
              return {
                options: data.data.map((item) => ({
                  label: item.lastName.includes("admin")
                    ? `${item.firstName} - ${item.email}`
                    : `${item.firstName} ${item.lastName} - ${item.email}`,
                  value: item._id,
                  obj: item,
                })),
                canLoadMore: params.page < data.metadata.totalPage,
              };
            })
          );
      },
      [AgentRepository, groupMembers]
    );

    const handleSelectAgent = useCallback(
      (value: string, option: OptionType | OptionType[]) => {
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

              setMeta(data.metadata);
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

    useEffect(() => {
      if (isDetail && groupId) {
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
    }, [filterData]);

    useEffect(() => {
      value && setGroupIds(value);
    }, [value]);

    return (
      <div>
        <div className="pb-6">
          <Select.Ajax
            className="w-full"
            placeholder="Search agents"
            // suffixIcon={<PhUserPlusFill></PhUserPlusFill>}
            onChange={handleSelectAgent}
            value={null}
            virtual
            disableValues={groupIds}
            loadMore={fetchAgents}
          />
        </div>
        <div>
          <div>
            <Input.Search
              allowClear
              value={filterData.query}
              placeholder="Search"
              onChange={(value) => handleFiltersQueryChange(value.target.value)}
            />
          </div>
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
                <TableAction
                  record={record}
                  showDelete
                  onDelete={() => handleOpenModalRemove(record)}
                  onlyIcon
                />
              )}
            />
          </Table>
          {/* {meta && isDetail && groupMembersTable.length > 0 && (
            <Pagination
              className="mt-4 flex justify-end"
              currentPage={filterData.page ?? 1}
              total={meta?.totalCount}
              showTotal={undefined}
              pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
              onChange={onPagination}
            />
          )} */}
        </div>
      </div>
    );
  }
);

export default GroupFormMember;
