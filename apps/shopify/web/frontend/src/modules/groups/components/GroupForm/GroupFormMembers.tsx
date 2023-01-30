import { useDebounceFn, useJob, usePrevious } from "@moose-desk/core";
import {
  AgentRepository,
  BaseMetaDataListResponse,
  GetMembersGroupRequest,
  GroupMembers,
  UserGroupRepository,
} from "@moose-desk/repo";
import {
  EmptySearchResult,
  Filters,
  IndexTable,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { SelectionType } from "@shopify/polaris/build/ts/latest/src/utilities/index-provider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import { Pagination } from "src/components/Pagination";
import { LoadMoreValue, Select, SelectedObj } from "src/components/Select";
import env from "src/core/env";

interface GroupFormMembersProps {
  id?: string;
  value?: GroupMembers[];
  onChange?: (value: string[]) => void;
}

const GroupFormMembers = ({ id, value, onChange }: GroupFormMembersProps) => {
  const defaultFilter: () => GetMembersGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] = useState<GetMembersGroupRequest>(
    defaultFilter()
  );
  const prevFilter = usePrevious<GetMembersGroupRequest>(filterData);

  const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
  const [groupMembersTable, setGroupMembersTable] = useState<GroupMembers[]>(
    []
  );
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState<any>(groupMembers);

  const isDetail = useMemo(() => {
    return !!id;
  }, [id]);

  const handleFiltersQueryChange = useCallback(
    (queryValue: string) => {
      if (isDetail) {
        setFilterData((old) => {
          return {
            ...old,
            query: queryValue,
          };
        });
      } else {
        if (queryValue) {
          setGroupMembersTable(
            groupMembers.filter((item) => item.name.includes(queryValue ?? ""))
          );
        } else {
          setGroupMembersTable(groupMembers);
        }
      }
    },
    [groupMembers, filterData, isDetail]
  );

  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const handleSelection = useCallback(
    (selectionType: SelectionType, toggleType: boolean, selection?: any) => {
      handleSelectionChange(selectionType, toggleType, selection);
    },
    []
  );

  const removeMemberGroup = useCallback(() => {
    setGroupMembers(
      groupMembers.filter((item) => !selectedResources.includes(item._id))
    );
    clearSelection();
  }, [selectedResources]);

  const bulkActions = useMemo(() => {
    return [{ content: "Remove member group", onAction: removeMemberGroup }];
  }, [selectedResources, removeMemberGroup]);

  const [isFirst, setIsFirst] = useState(true);

  const fetchAgents = useCallback(
    (params: LoadMoreValue) => {
      const limit = env.DEFAULT_PAGE_SIZE;
      // if (isDetail && isFirst && id) {
      //   setIsFirst(false);
      //   return UserGroupRepository()
      //     .getListMembers(id, {
      //       ...filterData,
      //       limit: 10000,
      //     })
      //     .pipe(
      //       map(({ data }) => {
      //         return {
      //           options: data.data.map((item) => ({
      //             label: item.name,
      //             value: item._id,
      //             obj: item,
      //           })),
      //           canLoadMore: true,
      //         };
      //       })
      //     );
      // }
      return AgentRepository()
        .getList({
          page: params.page,
          limit: limit,
          query: params.searchText,
        })
        .pipe(
          map(({ data }) => {
            console.log(data, "data");
            return {
              options: data.data.map((item) => ({
                label: item.lastName.includes("admin")
                  ? item.firstName
                  : item.firstName + item.lastName,
                value: item._id,
                obj: item,
              })),
              canLoadMore: params.page < data.metadata.totalPage,
            };
          })
        );
    },
    [AgentRepository, groupMembers, isFirst, id]
  );

  const handleSelectAgent = useCallback((value: SelectedObj[]) => {
    setGroupMembers(
      value.map((item) => ({
        _id: item.key,
        email: item.value.email,
        name: item.value.label,
      }))
    );
  }, []);

  useEffect(() => {
    setGroupMembersTable(groupMembers);
    const ids = groupMembers.map((item) => item._id);
    onChange && onChange(ids);
  }, [groupMembers]);

  const { run: getListMemberGroupApi, processing: loadingGetList } = useJob(
    (id: string, payload: GetMembersGroupRequest) => {
      return UserGroupRepository()
        .getListMembers(id, payload)
        .pipe(
          map(({ data }) => {
            setGroupMembers(data.data);
            setMeta(data.metadata);
          })
        );
    },
    { showLoading: true }
  );

  const { run: getListMemberGroupDebounce } = useDebounceFn(
    (id: string, payload: GetMembersGroupRequest) => {
      getListMemberGroupApi(id, payload);
    },
    { wait: 300 }
  );

  useEffect(() => {
    if (isDetail && id) {
      if (prevFilter?.query !== filterData.query && filterData.query) {
        getListMemberGroupDebounce(id, filterData);
      } else {
        getListMemberGroupApi(id, filterData);
      }
    }
  }, [filterData, id]);

  return (
    <>
      <div className="pb-6">
        <Select.Ajax
          label="Add members"
          placeholder="Search agents"
          height="250px"
          onChange={handleSelectAgent}
          loadMore={fetchAgents}
        />
      </div>
      <div className="pb-2">
        <Filters
          queryValue={filterData.query}
          onQueryChange={handleFiltersQueryChange}
          onQueryClear={handleQueryValueRemove}
          queryPlaceholder="Search"
          filters={[]}
          onClearAll={resetFilterData}
        ></Filters>
      </div>
      <IndexTable
        loading={loadingGetList}
        resourceName={{ singular: "group", plural: "groups" }}
        itemCount={groupMembersTable.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelection}
        hasMoreItems
        lastColumnSticky
        promotedBulkActions={bulkActions}
        emptyState={
          <EmptySearchResult
            title={"No member group yet"}
            description={"Try changing the filters or search term"}
            withIllustration
          />
        }
        headings={[{ title: "Name" }, { title: "Email" }]}
      >
        {groupMembersTable.map((membersItem, index) => (
          <IndexTable.Row
            id={membersItem._id}
            key={membersItem._id}
            selected={selectedResources.includes(membersItem._id)}
            position={index}
          >
            <IndexTable.Cell className="py-3">
              <div className="unstyle-link">
                <Text variant="bodyMd" fontWeight="semibold" as="span">
                  {membersItem.name}
                </Text>
              </div>
            </IndexTable.Cell>
            <IndexTable.Cell className="py-3">
              <Text variant="bodyMd" as="span">
                {membersItem.email}
              </Text>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
      <div className="flex items-center justify-center py-8">
        {filterData.page && filterData.limit && meta?.totalCount && (
          <Pagination
            total={meta.totalCount}
            pageSize={filterData.limit ?? 0}
            currentPage={filterData.page}
            onChangePage={(page) =>
              setFilterData((val) => {
                return { ...val, page };
              })
            }
          />
        )}
      </div>
    </>
  );
};

export default GroupFormMembers;
