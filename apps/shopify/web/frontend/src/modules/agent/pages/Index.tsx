import {
  generatePath,
  PageComponent,
  useDebounceFn,
  useJob,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import { Agent, AgentRepository, GetListAgentRequest } from "@moose-desk/repo";
import {
  Badge,
  ButtonGroup,
  Card,
  EmptySearchResult,
  Filters,
  IndexTable,
  Link,
  Loading,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import { Banner } from "src/components/Banner";
import { useBannerState } from "src/components/Banner/useBannerState";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ButtonSort } from "src/components/Button/ButtonSort";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import { useBanner } from "src/hooks/useBanner";
import { SortOrderOptions } from "src/models/Form";
import { BaseMetaDataListResponse } from "src/models/Request";
import { Role } from "src/models/Rule";
import { getStatusAgent, optionsSort } from "src/modules/agent/constant";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface AgentIndexPageProps {}

const AgentIndexPage: PageComponent<AgentIndexPageProps> = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const [sortValue, setSortValue] = useState<string[]>([]);
  const navigate = useNavigate();
  const {
    state: btnSort,
    toggle: toggleBtnSort,
    off: closeBtnSort,
  } = useToggle();
  useBannerState(showBanner);

  const defaultFilter: () => GetListAgentRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] =
    useState<GetListAgentRequest>(defaultFilter);

  const prevFilter = usePrevious<GetListAgentRequest>(filterData);

  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState<any>(agents);

  const { run: getListAgentApi, processing: loadingList } = useJob(
    (payload: GetListAgentRequest) => {
      return AgentRepository()
        .getList(payload)
        .pipe(
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

  const getLabelRole = useCallback((role: Role) => {
    switch (role) {
      case Role.Admin:
        return "System Admin";
      case Role.AgentLeader:
        return "Agent Leader";
      case Role.BasicAgent:
        return "Basic Agent";
      default:
        return "Basic Agent";
    }
  }, []);

  const bulkActions = useMemo(() => {
    if (selectedResources.length > 1) {
      return [];
    } else {
      return [
        { content: "Edit agent", onAction: editAgent },
        { content: "Remove agent", onAction: removeAgent },
      ];
    }
  }, [selectedResources, removeAgent, editAgent]);

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

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListAgentApi(filterData);
    }
  }, [filterData]);

  return (
    <Page
      title="Account"
      primaryAction={{
        content: "Add agent",
        onAction: () => navigate(generatePath(AgentRoutePaths.Create)),
      }}
      fullWidth
    >
      {banner.visible && (
        <div className="mb-4">
          <Banner banner={banner} onDismiss={closeBanner}></Banner>
        </div>
      )}
      <Card>
        <div className="flex-1 px-4 pt-4 pb-2">
          <Filters
            queryValue={filterData.query}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            queryPlaceholder="Search"
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
                options={optionsSort}
              />
            </div>
          </Filters>
        </div>
        {loadingList && <Loading />}
        <IndexTable
          resourceName={{ singular: "agent", plural: "agents" }}
          itemCount={agents.length}
          selectable={false}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          hasMoreItems
          loading={loadingList}
          promotedBulkActions={bulkActions}
          lastColumnSticky
          emptyState={
            <EmptySearchResult
              title={
                "Sorry! There is no records matched with your search criteria"
              }
              description={"Try changing the filters or search term"}
              withIllustration
            />
          }
          headings={[
            { title: "Agent" },
            { title: "Email" },
            { title: "Roles" },
            { title: "Status" },
            { title: "2FA Availability" },
            { title: "Action" },
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
              <IndexTable.Cell>{agentItem.email}</IndexTable.Cell>
              <IndexTable.Cell className="py-3">
                {getLabelRole(agentItem.role)}
              </IndexTable.Cell>
              <IndexTable.Cell className="py-3">
                <Text variant="bodyMd" as="span">
                  <Badge
                    status={
                      getStatusAgent(
                        agentItem.isActive,
                        agentItem.emailConfirmed
                      ).status
                    }
                  >
                    {
                      getStatusAgent(
                        agentItem.isActive,
                        agentItem.emailConfirmed
                      ).label
                    }
                  </Badge>
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell className="py-3">
                <Text variant="bodyMd" as="span">
                  {agentItem.twoFactorEnabled
                    ? agentItem.twoFactorMethod
                    : "Off"}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell className="py-3">
                <ButtonGroup>
                  <ButtonEdit
                    onClick={() =>
                      navigate(
                        generatePath(AgentRoutePaths.Detail, {
                          id: agentItem._id,
                        })
                      )
                    }
                  ></ButtonEdit>
                </ButtonGroup>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
        {meta?.totalCount ? (
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
        ) : null}
      </Card>
    </Page>
  );
};

export default AgentIndexPage;
