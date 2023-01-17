import {
  generatePath,
  PageComponent,
  useDebounceFn,
  useJob,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  BaseMetaDataListResponse,
  GetListUserGroupRequest,
  UserGroup,
  UserGroupRepository,
} from "@moose-desk/repo";
import {
  Card,
  EmptySearchResult,
  Filters,
  IndexTable,
  Link,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import { ButtonSort } from "src/components/Button/ButtonSort";
import env from "src/core/env";
import { SortOrderOptions } from "src/models/Form";
import GroupsRoutePaths from "src/modules/groups/routes/paths";

interface GroupsIndexPageProps {}

const GroupsIndexPage: PageComponent<GroupsIndexPageProps> = () => {
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState<string[]>([]);
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const {
    state: btnSort,
    toggle: toggleBtnSort,
    off: closeBtnSort,
  } = useToggle();

  const defaultFilter: () => GetListUserGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] =
    useState<GetListUserGroupRequest>(defaultFilter);
  const prevFilter = usePrevious<GetListUserGroupRequest>(filterData);

  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const { run: getListGroupApi, processing: loadingList } = useJob(
    (payload: GetListUserGroupRequest) => {
      return UserGroupRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            const listGroup = data.data.map((item) => ({
              ...item,
              id: item._id,
            }));
            setGroups(listGroup);
            setMeta(data.metadata);
          })
        );
    }
  );

  const { run: getListDebounce } = useDebounceFn(
    (payload: GetListUserGroupRequest) => {
      getListGroupApi(payload);
    },
    { wait: 300 }
  );

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState<any>(groups);

  const editGroup = useCallback(() => {
    navigate(generatePath(GroupsRoutePaths.Detail));
  }, [navigate, GroupsRoutePaths]);

  const removeGroup = useCallback(() => {}, []);

  const bulkActions = useMemo(() => {
    if (selectedResources.length > 1) {
      return [];
    } else {
      return [
        { content: "Edit agent", onAction: editGroup },
        { content: "Remove agent", onAction: removeGroup },
      ];
    }
  }, [selectedResources, removeGroup, editGroup]);

  const handleSort = useCallback(
    (selected: string[]) => {
      const arraySort = selected[0].split(":");
      const sortBy = arraySort[0];
      const sortOrder = arraySort[1] === SortOrderOptions.ACS ? 1 : -1;
      setSortValue(selected);

      setFilterData((value) => {
        return { ...value, sortBy, sortOrder };
      });
    },
    [filterData]
  );

  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old) => {
      return {
        ...old,
        query: queryValue,
      };
    });
  }, []);

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListGroupApi(filterData);
    }
  }, [filterData]);

  return (
    <Page
      title="Group"
      primaryAction={{
        content: "Add Group",
        onAction: () => navigate(generatePath(GroupsRoutePaths.Create)),
      }}
      fullWidth
    >
      <Card>
        <div className="flex-1 px-4 pt-4 pb-2">
          <Filters
            queryValue={filterData.query}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            filters={[]}
            onClearAll={resetFilterData}
          >
            <div className="pl-2">
              <ButtonSort
                active={btnSort}
                sortValue={sortValue}
                onSort={handleSort}
                onShow={toggleBtnSort}
                onClose={closeBtnSort}
                options={[]}
              />
            </div>
          </Filters>
        </div>
        <IndexTable
          resourceName={{ singular: "group", plural: "groups" }}
          itemCount={groups.length}
          selectable={true}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          hasMoreItems
          loading={false}
          promotedBulkActions={bulkActions}
          lastColumnSticky
          emptyState={
            <EmptySearchResult
              title={"No group yet"}
              description={"Try changing the filters or search term"}
              withIllustration
            />
          }
          headings={[{ title: "Group name" }, { title: "Number of Agents" }]}
        >
          {groups.map((groupItem, index) => (
            <IndexTable.Row
              id={groupItem._id}
              key={groupItem._id}
              selected={selectedResources.includes(groupItem._id)}
              position={index}
            >
              <IndexTable.Cell className="py-3">
                <div className="unstyle-link">
                  <Link
                    dataPrimaryLink
                    data-polaris-unstyled
                    url={generatePath(GroupsRoutePaths.Detail, {
                      id: groupItem._id,
                    })}
                    removeUnderline={true}
                  >
                    <Text variant="bodyMd" fontWeight="semibold" as="span">
                      {groupItem.name}
                    </Text>
                  </Link>
                </div>
              </IndexTable.Cell>
              <IndexTable.Cell className="py-3">
                <Text variant="bodyMd" as="span">
                  {groupItem.memberCount}
                </Text>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </Card>
    </Page>
  );
};

export default GroupsIndexPage;
