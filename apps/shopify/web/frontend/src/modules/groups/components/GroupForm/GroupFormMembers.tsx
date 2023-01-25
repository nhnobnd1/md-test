import { usePrevious, useToggle } from "@moose-desk/core";
import {
  AgentRepository,
  BaseMetaDataListResponse,
  GetMembersGroupRequest,
  GroupMembers,
} from "@moose-desk/repo";
import {
  EmptySearchResult,
  Filters,
  IndexTable,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { SelectionType } from "@shopify/polaris/build/ts/latest/src/utilities/index-provider";
import { useCallback, useMemo, useState } from "react";
import { map } from "rxjs";
import { Pagination } from "src/components/Pagination";
import { LoadMoreValue, Select } from "src/components/Select";
import env from "src/core/env";

interface GroupFormMembersProps {
  id?: string;
}

const GroupFormMembers = ({ id }: GroupFormMembersProps) => {
  const defaultFilter: () => GetMembersGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] = useState<GetMembersGroupRequest>(
    defaultFilter()
  );
  const prevFilter = usePrevious<GetMembersGroupRequest>(filterData);

  const [groupMembers, setGroupMembers] = useState<GroupMembers[]>([]);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const {
    state: modalDelete,
    on: openModalDelete,
    off: closeModalDelete,
  } = useToggle(false);

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState<any>(groupMembers);

  const isDetail = useMemo(() => {
    return !!id;
  }, [id]);

  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old) => {
      return {
        ...old,
        query: queryValue,
      };
    });
  }, []);

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
      clearSelection();
      handleSelectionChange(selectionType, toggleType, selection);
    },
    []
  );

  const removeMemberGroup = useCallback(() => {
    openModalDelete();
  }, []);

  const bulkActions = useMemo(() => {
    return [{ content: "Remove member group", onAction: removeMemberGroup }];
  }, [selectedResources, removeMemberGroup]);

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
    [AgentRepository]
  );

  const handleSelectAgent = useCallback((value) => {
    console.log(value, "value change");
  }, []);

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
        resourceName={{ singular: "group", plural: "groups" }}
        itemCount={groupMembers.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelection}
        hasMoreItems
        lastColumnSticky
        // loading={loadingList}
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
        {groupMembers.map((membersItem, index) => (
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
