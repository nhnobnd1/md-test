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
import { useCallback, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import { PageComponent } from "src/core/models/routes";
import { GetListAgentRequest } from "src/modules/agent/models";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface AgentIndexPageProps {}

const AgentIndexPage: PageComponent<AgentIndexPageProps> = () => {
  const agents = [
    {
      id: "1",
      name: "Agent A",
      role: "System Admin",
      status: true,
      isAvailability: true,
    },
    {
      id: "2",
      name: "Agent B",
      role: "Agent Leader",
      status: false,
      isAvailability: true,
    },
    {
      id: "3",
      name: "Agent A",
      role: "Standard Agent",
      status: true,
      isAvailability: true,
    },
  ];

  const navigate = useNavigate();

  const tabs = [{ id: "all", content: "All", panelID: "all-agent" }];
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const defaultFilter = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
  });

  const [filterData, setFilterData] =
    useState<GetListAgentRequest>(defaultFilter);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(agents);
  const [selectedTab, setSelectedTab] = useState(0);

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

  const handleTabChange = useCallback((index) => {
    console.log("tab change index", index);
  }, []);

  const editAgent = useCallback(() => {
    console.log("edit");
  }, []);

  const removeAgent = useCallback(() => {
    console.log("remove");
  }, []);

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
            loading={isLoadingTable}
            promotedBulkActions={[
              { content: "Edit agent", onAction: editAgent },
              { content: "Remove agent", onAction: removeAgent },
            ]}
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
              { title: "2FA A", hidden: false },
            ]}
          >
            {agents.map((agentItem, index) => (
              <IndexTable.Row
                id={agentItem.id}
                key={agentItem.id}
                selected={selectedResources.includes(agentItem.id)}
                position={index}
              >
                <IndexTable.Cell className="py-3">
                  <div className="unstyle-link">
                    <Link
                      dataPrimaryLink
                      data-polaris-unstyled
                      url={generatePath(AgentRoutePaths.Detail, { id: "1" })}
                    >
                      <Text variant="bodyMd" fontWeight="semibold" as="span">
                        {agentItem.name}
                      </Text>
                    </Link>
                  </div>
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  {agentItem.role}
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  <Text variant="bodyMd" as="span">
                    <Badge status={agentItem.status ? "success" : "info"}>
                      {agentItem.status ? "Active" : "Draft"}
                    </Badge>
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell className="py-3">
                  <Text variant="bodyMd" as="span">
                    {agentItem.isAvailability ? "Yes" : "No"}
                  </Text>
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>

          <div className="flex items-center justify-center py-4">
            {filterData.page && filterData.limit && (
              <Pagination
                currentPage={filterData.page}
                total={agents.length}
                pageSize={filterData.limit}
                hasPrevious
                onPrevious={() => {
                  console.log("Previous");
                }}
                hasNext
                onNext={() => {
                  console.log("Next");
                }}
              />
            )}
          </div>
        </Tabs>
      </Card>
    </Page>
  );
};

export default AgentIndexPage;
