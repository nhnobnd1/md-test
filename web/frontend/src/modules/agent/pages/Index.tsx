import {
  Badge,
  Card,
  EmptySearchResult,
  Filters,
  IndexTable,
  Link,
  Page,
  Tabs,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { IndexTableSortDirection } from "@shopify/polaris/build/ts/latest/src/components/IndexTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { map } from "rxjs";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import { useDebounceFn, useJob, usePrevious } from "src/core/hooks";
import { PageComponent } from "src/core/models/routes";
import { BaseMetaDataListResponse } from "src/models/Request";
import { Agent, GetListAgentRequest } from "src/modules/agent/models/Agent";
import AgentRepository from "src/modules/agent/repositories/AgentRepository";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface AgentIndexPageProps {}

const AgentIndexPage: PageComponent<AgentIndexPageProps> = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  const navigate = useNavigate();

  const tabs = [{ id: "all", content: "All", panelID: "all-agent" }];

  const defaultFilter = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] =
    useState<GetListAgentRequest>(defaultFilter);

  const prevFilter = usePrevious<GetListAgentRequest>(filterData);

  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState<any>(agents);

  const [selectedTab, setSelectedTab] = useState(0);

  const { run: getListAgentApi, processing: loadingList } = useJob(
    (payload: GetListAgentRequest) => {
      return AgentRepository.getList(payload).pipe(
        map(({ data }) => {
          const listAgent = data.data.map((item) => ({
            ...item,
            id: item._id,
          }));
          setAgents(listAgent);
          setMeta(data.metadata);
        })
      );
    }
  );

  const { run: getListDebounce } = useDebounceFn(
    (payload: GetListAgentRequest) => {
      getListAgentApi(payload);
    },
    { wait: 300 }
  );

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

  const editAgent = useCallback(() => {
    navigate(generatePath(AgentRoutePaths.Create));
  }, [navigate, AgentRoutePaths]);

  const removeAgent = useCallback(() => {}, []);

  const bulkActions = useMemo(() => {
    if (selectedResources.length > 1) {
      return [{ content: "Remove agent", onAction: removeAgent }];
    } else {
      return [
        { content: "Edit agent", onAction: editAgent },
        { content: "Remove agent", onAction: removeAgent },
      ];
    }
  }, [selectedResources, removeAgent, editAgent]);

  const handleTabChange = useCallback((index) => {}, []);

  const handleSort = useCallback(
    (index, direction: IndexTableSortDirection) => {
      if (index === 0) {
        const sortFirstName = [...agents].sort((rowA, rowB) => {
          const nameA = rowA.firstName;
          const nameB = rowB.firstName;
          if (direction === "descending")
            return nameA > nameB ? 1 : nameB > nameA ? -1 : 0;
          else return nameA > nameB ? -1 : nameB > nameA ? 1 : 0;
        });
        return setAgents(sortFirstName);
      }
    },
    [agents]
  );

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListAgentApi(filterData);
    }
  }, [filterData]);

  return (
    <Page
      title="List Agent"
      primaryAction={{
        content: "Add agent",
        onAction: () => navigate(generatePath(AgentRoutePaths.Create)),
      }}
      fullWidth
    >
      <Card>
        <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
          <div className="flex-1 px-4 pt-4 pb-2">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              filters={[]}
              onClearAll={resetFilterData}
            />
          </div>
          <IndexTable
            resourceName={{ singular: "agent", plural: "agents" }}
            itemCount={agents.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            hasMoreItems
            loading={loadingList}
            sortable={[true, true, true, true]}
            onSort={handleSort}
            promotedBulkActions={bulkActions}
            lastColumnSticky
            emptyState={
              <EmptySearchResult
                title={"No agent yet"}
                description={"Try changing the filters or search term"}
                withIllustration
              />
            }
            headings={[
              { title: "Agent" },
              { title: "Roles" },
              { title: "Status" },
              { title: "2FA Availability" },
            ]}
          >
            {agents.map((agentItem, index) => (
              <IndexTable.Row
                id={agentItem._id}
                key={agentItem._id}
                selected={selectedResources.includes(agentItem._id)}
                position={index}
              >
                <IndexTable.Cell className="py-3">
                  <div className="unstyle-link">
                    <Link
                      dataPrimaryLink
                      data-polaris-unstyled
                      url={generatePath(AgentRoutePaths.Detail, {
                        id: agentItem._id,
                      })}
                      removeUnderline={true}
                    >
                      <Text variant="bodyMd" fontWeight="semibold" as="span">
                        {agentItem.lastName === "admin"
                          ? agentItem.firstName
                          : agentItem.firstName + " " + agentItem.lastName}
                      </Text>
                    </Link>
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  {agentItem.role}
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  <Text variant="bodyMd" as="span">
                    <Badge status={agentItem.isActive ? "success" : "critical"}>
                      {agentItem.isActive ? "Active" : "Deactivate"}
                    </Badge>
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  {/* <Text variant="bodyMd" as="span">
                    {agentItem.isAvailability ? "Yes" : "No"}
                  </Text> */}
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
        </Tabs>
      </Card>
    </Page>
  );
};

export default AgentIndexPage;
