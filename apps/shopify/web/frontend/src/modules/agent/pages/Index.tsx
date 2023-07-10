import {
  generatePath,
  PageComponent,
  useNavigate,
  usePrevious,
} from "@moose-desk/core";
import { GetListAgentRequest, ScreenType } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Badge,
  ButtonGroup,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Link,
  Loading,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Banner } from "src/components/Banner";
import { useBannerState } from "src/components/Banner/useBannerState";
import { HeaderList } from "src/components/HeaderList";
import Pagination from "src/components/Pagination/Pagination";
import { useBanner } from "src/hooks/useBanner";
import useScreenType from "src/hooks/useScreenType";
import { Role } from "src/models/Rule";
import { ModalAddNewAgent } from "src/modules/agent/components/Modal/ModalAddNewAgent";
import { ModalDetailAgent } from "src/modules/agent/components/Modal/ModalDetailAgent";
import { getStatusAgent } from "src/modules/agent/constant";
import { getListAgentFilter } from "src/modules/agent/helper/api";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import { defaultFilter } from "src/utils/localValue";

interface AgentIndexPageProps {}

const AgentIndexPage: PageComponent<AgentIndexPageProps> = () => {
  // const [agents, setAgents] = useState<Agent[]>([]);
  const { banner, show: showBanner, close: closeBanner } = useBanner();
  const navigate = useNavigate();

  useBannerState(showBanner);
  const [screenType] = useScreenType();

  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [filterData, setFilterData] =
    useState<GetListAgentRequest>(defaultFilter);

  const prevFilter = usePrevious<GetListAgentRequest>(filterData);
  const {
    data: dataAgents,
    isLoading: loadingList,
    refetch,
  } = useQuery({
    queryKey: ["getAgents", filterData],
    queryFn: () => getListAgentFilter(filterData),
    retry: 1,

    onError: () => {
      // message.error(t("messages:error.get_agent"));
      show(t("messages:error.get_agent"), { isError: true });
    },
  });
  const agents = useMemo(() => {
    if (!dataAgents?.data) return [];
    return dataAgents.data;
  }, [dataAgents?.data]);
  const meta = useMemo(() => {
    if (!dataAgents?.metadata)
      return { page: 0, totalPage: 0, totalCount: 0, resultsPerPage: 0 };
    return dataAgents.metadata;
  }, [dataAgents?.metadata]);

  // const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const { show } = useToast();
  const { t } = useTranslation();

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState<any>(agents);
  const [showTitle, setShowTitle] = useState(true);

  // const { run: getListAgentApi, processing: loadingList } = useJob(() => {
  //   return AgentRepository()
  //     .getList(filterData)
  //     .pipe(
  //       map(({ data }) => {
  //         const listAgent = data.data.map((item) => ({
  //           ...item,
  //           id: item._id,
  //         }));
  //         setAgents(listAgent);
  //         setMeta(data.metadata);
  //       }),
  //       catchError((err) => {
  //         show(t("messages:error.get_agent"), { isError: true });
  //         return of(err);
  //       })
  //     );
  // });

  // const { run: getListDebounce } = useDebounceFn(
  //   () => {
  //     getListAgentApi();
  //   },
  //   { wait: 300 }
  // );

  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old) => {
      return {
        ...old,
        query: queryValue,
      };
    });
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

  const listSort = [
    "lastName",
    "email",
    "role",
    "isActive",
    "twoFactorEnabled",
  ];

  const handleSort = (
    headingIndex: number,
    direction: "descending" | "ascending"
  ) => {
    setIndexSort(Number(headingIndex));
    setDirection(direction);
    setFilterData((pre) => ({
      ...pre,
      sortBy: listSort[Number(headingIndex)],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
  // useEffect(() => {
  //   if (prevFilter?.query !== filterData.query && filterData.query) {
  //     getListDebounce();
  //   } else {
  //     getListAgentApi();
  //   }
  // }, [filterData]);
  const css = `
  .Polaris-Page-Header__RightAlign ,.Polaris-Page-Header__PrimaryActionWrapper{
    width:100%!important;
    margin:0
  }
  `;
  return (
    <>
      <style scoped>{screenType === ScreenType.SM ? css : ""}</style>{" "}
      <Page
        title={
          (
            <div
              className={`min-w-[100px]  ${
                showTitle ? "inline-block" : "hidden"
              }`}
            >
              <span>Agents</span>
            </div>
          ) as any
        }
        primaryAction={
          <div className="flex justify-end">
            <HeaderList
              setShowTitle={setShowTitle}
              handleSearch={handleFiltersQueryChange}
            >
              <ModalAddNewAgent getListAgentApi={refetch} />
            </HeaderList>
          </div>
        }
        fullWidth
      >
        {banner.visible && (
          <div className="mb-4">
            <Banner banner={banner} onDismiss={closeBanner}></Banner>
          </div>
        )}
        <LegacyCard>
          {/* <div className="flex-1 px-4 pt-4 pb-2">
          <Filters
            queryValue={filterData.query}
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={handleQueryValueRemove}
            queryPlaceholder="Search"
            filters={[]}
            onClearAll={resetFilterData}
          ></Filters>
        </div> */}
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
            sortable={[true, true, true, true, true, false]}
            sortDirection={direction}
            sortColumnIndex={indexSort}
            onSort={handleSort}
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
                    <ModalDetailAgent
                      getListAgentApi={refetch}
                      agentSaved={agentItem}
                    />
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
        </LegacyCard>
      </Page>
    </>
  );
};

export default AgentIndexPage;
