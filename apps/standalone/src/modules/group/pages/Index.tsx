import {
  generatePath,
  PageComponent,
  useDebounceFn,
  useJob,
  useNavigate,
  usePrevious,
} from "@moose-desk/core";
import {
  Agent,
  BaseMetaDataListResponse,
  GetListUserGroupRequest,
  UserGroup,
  UserGroupRepository,
} from "@moose-desk/repo";
import { Input, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import GroupRoutePaths from "src/modules/group/routes/paths";

interface GroupIndexPageProps {}

const GroupIndexPage: PageComponent<GroupIndexPageProps> = () => {
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();

  const defaultFilter: () => GetListUserGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] =
    useState<GetListUserGroupRequest>(defaultFilter);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const prevFilter = usePrevious<GetListUserGroupRequest>(filterData);

  const { run: getListGroup, processing: loadingList } = useJob(
    (payload: GetListUserGroupRequest) => {
      return UserGroupRepository()
        .getList(payload)
        .pipe(
          map(
            ({ data }) => {
              if (data.statusCode === 200) {
                const listGroup = data.data.map((item) => ({
                  ...item,
                  id: item._id,
                }));
                setGroups(listGroup);
                setMeta(data.metadata);
              } else {
                message.error("Get data agent failed");
              }
            },
            catchError((err) => {
              message.error("Get data agent failed");
              return of(err);
            })
          )
        );
    }
  );

  const { run: deleteGroupApi } = useJob(
    (id: string) => {
      message.loading.show("Deleting the group");
      return UserGroupRepository()
        .delete(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success("Delete group successfully");
                getListGroup(filterData);
              });
            } else {
              message.loading.hide().then(() => {
                notification.error("Delete group failed");
              });
            }
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.error("Delete group failed");
            });
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const { run: getListGroupDebounce } = useDebounceFn(
    (payload: GetListUserGroupRequest) => {
      getListGroup(payload);
    },
    { wait: 300 }
  );

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

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

  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<UserGroup>) => {
      if (sorter.order && sorter.columnKey) {
        setFilterData((value) => ({
          ...value,
          sortBy: sorter.columnKey as string,
          sortOrder: sorter.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((value) => ({
          ...value,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    [setFilterData]
  ) as TableProps<Agent>["onChange"];

  const handleDelete = useCallback((record: UserGroup) => {
    deleteGroupApi(record._id);
  }, []);

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListGroupDebounce(filterData);
    } else {
      getListGroup(filterData);
    }
  }, [filterData]);

  return (
    <div>
      <Header title="Group">
        <div className="flex-1 flex justify-end">
          <ButtonAdd
            onClick={() => {
              navigate(GroupRoutePaths.Create);
            }}
          >
            Add Group
          </ButtonAdd>
        </div>
      </Header>
      <div className="search mb-6">
        <Input.Search
          placeholder="Search"
          enterButton
          onSearch={(searchText: string) => {
            setFilterData((value) => {
              return {
                ...value,
                query: searchText,
                page: 1,
              };
            });
          }}
        />
      </div>
      <div>
        <Table
          dataSource={groups}
          loading={loadingList}
          onChange={onChangeTable}
        >
          <Table.Column
            key="name"
            title="Group name"
            render={(_, record: UserGroup) => <span>{record.name}</span>}
            sorter={{
              compare: (a: any, b: any) => a.name - b.name,
            }}
          />
          <Table.Column
            key="memberCount"
            title="Number of Agents"
            align="center"
            dataIndex="memberCount"
            sorter={{
              compare: (a: any, b: any) => a.memberCount - b.memberCount,
            }}
          ></Table.Column>

          <Table.Column
            align="center"
            title="Action"
            render={(_, record: Agent) => (
              <TableAction
                record={record}
                edit
                specialDelete={{
                  title:
                    "Are you sure that you want to permanently remove this group",
                  description:
                    "This group will be removed permanently. This action cannot be undone",
                }}
                onDelete={handleDelete}
                onlyIcon
                onEdit={() => {
                  navigate(
                    generatePath(GroupRoutePaths.Detail, { id: record._id })
                  );
                }}
              />
            )}
          />
        </Table>
        {meta && (
          <Pagination
            className="mt-4 flex justify-end"
            currentPage={filterData.page ?? 1}
            total={meta?.totalCount}
            pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
            onChange={onPagination}
          />
        )}
      </div>
    </div>
  );
};

export default GroupIndexPage;
