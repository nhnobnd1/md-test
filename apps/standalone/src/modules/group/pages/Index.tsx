import {
  generatePath,
  PageComponent,
  useJob,
  useNavigate,
  usePrevious,
} from "@moose-desk/core";
import {
  Agent,
  GetListUserGroupRequest,
  UserGroup,
  UserGroupRepository,
} from "@moose-desk/repo";
import { TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { catchError, map, of } from "rxjs";
import { HeaderList } from "src/components/HeaderList";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import { getListGroupFilter } from "src/modules/group/helper/api";
import GroupRoutePaths from "src/modules/group/routes/paths";
import { defaultFilter } from "src/utils/localValue";

interface GroupIndexPageProps {}

const GroupIndexPage: PageComponent<GroupIndexPageProps> = () => {
  // const [groups, setGroups] = useState<UserGroup[]>([]);
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const { isAdmin, isAgent } = usePermission();
  const [showTitle, setShowTitle] = useState(true);

  const [filterData, setFilterData] =
    useState<GetListUserGroupRequest>(defaultFilter);
  // const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const { t } = useTranslation();

  const prevFilter = usePrevious<GetListUserGroupRequest>(filterData);

  const {
    data: dataGroup,
    isLoading: loadingList,
    refetch,
  } = useQuery({
    queryKey: ["getGroups", filterData],
    queryFn: () => getListGroupFilter(filterData),
    retry: 1,

    onError: () => {
      // message.error(t("messages:error.get_agent"));
    },
  });

  const groups = useMemo(() => {
    if (!dataGroup?.data) return [];
    return dataGroup.data;
  }, [dataGroup?.data]);
  const meta = useMemo(() => {
    if (!dataGroup?.metadata)
      return { page: 0, totalPage: 0, totalCount: 0, resultsPerPage: 0 };
    return dataGroup.metadata;
  }, [dataGroup?.metadata]);

  const { run: deleteGroupApi } = useJob(
    (id: string) => {
      message.loading.show(t("messages:loading.deleting_group"));

      return UserGroupRepository()
        .delete(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success(t("messages:success.delete_group"));
                refetch();
              });
            } else {
              message.loading.hide().then(() => {
                notification.error(t("messages:error.delete_group"));
              });
            }
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.error(t("messages:error.delete_group"));
            });
            return of(err);
          })
        );
    },
    { showLoading: true }
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

  return (
    <div>
      <Header title={showTitle ? "Groups" : ""}>
        <div className="flex-1 flex justify-end">
          <HeaderList
            setShowTitle={setShowTitle}
            handleSearch={(searchText: string) => {
              setFilterData((value) => {
                return {
                  ...value,
                  query: searchText,
                  page: 1,
                };
              });
            }}
          >
            <ButtonAdd
              onClick={() => {
                navigate(GroupRoutePaths.Create);
              }}
              disabled={isAgent}
            >
              Add new
            </ButtonAdd>
          </HeaderList>
        </div>
      </Header>

      <div className="mt-5">
        <Table
          dataSource={groups}
          loading={loadingList}
          onChange={onChangeTable}
        >
          <Table.Column
            key="name"
            title="Group name"
            render={(_, record: UserGroup) => (
              <span
                className="cursor-pointer hover:underline hover:text-blue-500"
                onClick={() =>
                  navigate(
                    generatePath(GroupRoutePaths.Detail, { id: record._id })
                  )
                }
              >
                {record.name}
              </span>
            )}
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

          {!isAgent ? (
            <Table.Column
              align="center"
              title="Action"
              render={(_, record: Agent) => (
                <TableAction
                  record={record}
                  edit={!isAgent}
                  specialDelete={
                    isAdmin
                      ? {
                          title:
                            "Are you sure that you want to permanently remove this group?",
                          description:
                            "This group will be removed permanently. This action cannot be undone",
                        }
                      : null
                  }
                  onSpecialDelete={handleDelete}
                  onlyIcon
                  onEdit={() => {
                    navigate(
                      generatePath(GroupRoutePaths.Detail, { id: record._id })
                    );
                  }}
                />
              )}
            />
          ) : (
            <></>
          )}
        </Table>
        {meta?.totalCount && meta ? (
          <Pagination
            className="mt-4 flex justify-end"
            currentPage={filterData.page ?? 1}
            total={meta?.totalCount}
            pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
            onChange={onPagination}
          />
        ) : null}
      </div>
    </div>
  );
};

export default GroupIndexPage;
