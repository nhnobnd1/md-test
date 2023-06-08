import {
  createdDatetimeFormat,
  generatePath,
  upperCaseFirst,
  useJob,
  useNavigate,
  useToggle,
} from "@moose-desk/core";
import {
  BaseDeleteList,
  GetListTagRequest,
  GetListTicketRequest,
  StatusTicket,
  Tag,
  TagRepository,
  Ticket,
  TicketRepository,
  TicketStatistic,
} from "@moose-desk/repo";
import { ScreenType } from "@moose-desk/repo/global/Global";
import {
  Button,
  ButtonGroup,
  EmptySearchResult,
  Filters,
  IndexTable,
  Layout,
  LegacyCard,
  Loading,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  Text,
  TextContainer,
  useIndexResourceState,
} from "@shopify/polaris";
import { FC, useCallback, useEffect, useState } from "react";
import { map } from "rxjs";

import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import useGlobalData from "src/hooks/useGlobalData";
import useScreenType from "src/hooks/useScreenType";
import { useSubdomain } from "src/hooks/useSubdomain";
import { ButtonTrashTicket } from "src/modules/ticket/components/ButtonTrashTicket";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import CancelIcon from "~icons/mdi/cancel";
import RestoreIcon from "~icons/mdi/restore";
interface TrashTicketProps {}

const TrashTicket: FC<TrashTicketProps> = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const {
    state: btnSort,
    toggle: toggleBtnSort,
    off: closeBtnSort,
  } = useToggle();
  const [sortValue, setSortValue] = useState<string[]>([]);
  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const screenType = useScreenType();
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [filterData, setFilterData] = useState<GetListTicketRequest>(
    defaultFilter()
  );
  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    removeSelectedResources,
  } = useIndexResourceState(tickets);
  const [statistic, setStatistic] = useState<TicketStatistic>({
    statusCode: 200,
    data: {
      OPEN: 0,
      PENDING: 0,
      RESOLVED: 0,
      TRASH: 0,
      NEW: 0,
    },
  });
  const [meta, setMeta] = useState<any>();
  const [activeButtonIndex, setActiveButtonIndex] = useState("TRASH");
  const listSort = [
    "ticketId",
    "subject",
    "customer",
    "tags",
    "priority",
    "updatedTimestamp",
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
  const handleButtonClick = useCallback(
    (index: string) => {
      if (activeButtonIndex === index) return;
      setActiveButtonIndex(index);
    },
    [activeButtonIndex]
  );
  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old: any) => {
      return {
        ...old,
        query: queryValue,
      };
    });
  }, []);
  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old: any) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);
  const { run: getListTagApi } = useJob((payload: GetListTagRequest) => {
    return TagRepository()
      .getList(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            const tags = data.data.map((item: Tag) => ({
              ...item,
              id: item._id,
            }));
            setTags((prevTags) => {
              return [...prevTags, ...tags];
            });

            if (data.metadata.totalPage > (payload.page as number)) {
              getListTagApi({
                page: (payload.page as number) + 1,
                limit: payload.limit,
              });
            }
          } else {
            // message.error("Get data ticket failed");
          }
        })
      );
  });
  const { run: restoreTicketApi } = useJob((payload: BaseDeleteList) => {
    return TicketRepository()
      .restore(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            getListTrashApi(filterData);
            getStatisticTicket();
          } else {
            // message.error("Get data ticket failed");
          }
        })
      );
  });
  const { run: getStatisticTicket } = useJob(() => {
    return TicketRepository()
      .getStatistic()
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setStatistic(data);
          } else {
            // message.error("Get data ticket failed");
          }
        })
      );
  });
  const { run: getListTrashApi, processing: loadingList } = useJob(
    (payload: GetListTicketRequest) => {
      return TicketRepository()
        .getListTrash(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const tickets = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setTickets(tickets);
              setMeta(data.metadata);
            } else {
              // message.error("Get data ticket failed");
            }
          })
        );
    }
  );
  const { run: forceDeleteApi } = useJob((payload: BaseDeleteList) => {
    return TicketRepository()
      .deletePermanently(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            getListTrashApi(filterData);
            getStatisticTicket();
          } else {
            // message.error("Get data ticket failed");
          }
        })
      );
  });
  const handleRestore = (ids: string[]): void => {
    restoreTicketApi({
      ids,
    });
  };
  const handleDelete = (ids: string[]) => {
    forceDeleteApi({
      ids,
    });
  };
  const rowMarkup = tickets.map(
    (
      {
        _id,
        ticketId,
        subject,
        priority,
        updatedDatetime,
        tags,
        incoming,
        createdViaWidget,
        fromEmail,
        toEmails,
      },
      index
    ) => (
      <IndexTable.Row
        id={_id}
        key={ticketId}
        selected={selectedResources.includes(_id)}
        position={index}
        onClick={() => {}}
      >
        <IndexTable.Cell>
          <div className="">
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {ticketId}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="max-w-lg truncate">
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {subject}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {createdViaWidget || incoming ? (
            <span className="subject max-w-lg truncate">{`${fromEmail.email}`}</span>
          ) : (
            <span className="subject max-w-lg truncate">{`${toEmails[0]?.email}`}</span>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="flex flex-col wrap gap-2">
            {tags?.slice(-2).map((item, indexTag) => (
              <span className="tag-item" key={item + indexTag}>
                #{item}
              </span>
            ))}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>{upperCaseFirst(priority)}</IndexTable.Cell>
        <IndexTable.Cell>
          {createdDatetimeFormat(updatedDatetime, timezone)}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup>
            <div className="flex gap-2 ">
              <ButtonTrashTicket
                title="Are you sure that you want to restore this ticket"
                content="This ticket will be moved back to the Ticket list. You can continue working with it."
                action={() => {
                  handleRestore([_id]);
                }}
                primaryContent="Restore"
                icon={<RestoreIcon fontSize={16} />}
              />
              <ButtonTrashTicket
                title="Are you sure that you want to permanently remove this ticket?"
                content="This ticket will be remove permanently. This action cannot be undone."
                action={() => {
                  handleDelete([_id]);
                }}
                primaryContent="Remove"
                icon={<CancelIcon fontSize={16} />}
              />
            </div>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  useEffect(() => {
    getListTagApi({
      page: 1,
      limit: 500,
    });
    getStatisticTicket();
  }, []);
  useEffect(() => {
    getListTrashApi(filterData);
  }, [filterData]);
  return (
    <Page
      breadcrumbs={[{ onAction: () => navigate(TicketRoutePaths.Index) }]}
      fullWidth
      primaryAction={
        <div className="flex gap-2">
          <div className="min-w-[300px] flex-1">
            {selectedResources.length === 0 ? (
              <Filters
                queryValue={filterData.query}
                onQueryChange={handleFiltersQueryChange}
                onQueryClear={handleQueryValueRemove}
                queryPlaceholder="Search"
                filters={[]}
                onClearAll={resetFilterData}
              ></Filters>
            ) : (
              <div
                className={`col-span-3 col-start-2 justify-end flex gap-3 ${
                  selectedResources?.length ? "block" : "hidden"
                } items-center`}
              >
                <span>{selectedResources?.length} Selected</span>

                <ButtonTrashTicket
                  title="Are you sure that you want to restore this ticket"
                  content="This ticket will be moved back to the Ticket list. You can continue working with it."
                  action={() => {
                    handleRestore(selectedResources);
                  }}
                  primaryContent="Restore"
                  text={
                    screenType === ScreenType.SM
                      ? undefined
                      : "Restore Selected"
                  }
                  icon={<RestoreIcon fontSize={16} />}
                />
                <ButtonTrashTicket
                  title="Are you sure that you want to restore this ticket"
                  content="This ticket will be moved back to the Ticket list. You can continue working with it."
                  action={() => {
                    handleRestore(selectedResources);
                  }}
                  primaryContent="Remove"
                  text={
                    screenType === ScreenType.SM
                      ? undefined
                      : "Deleted Selected"
                  }
                  icon={<CancelIcon fontSize={16} />}
                />
              </div>
            )}
          </div>
        </div>
      }
    >
      <LegacyCard sectioned>
        <div className="grid grid-cols-5 gap-6 ">
          <div className="flex justify-end"></div>
        </div>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-5">
            {loadingList && <Loading />}
            {loadingList ? (
              <>
                <Layout>
                  <Layout.Section>
                    <LegacyCard sectioned>
                      <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText />
                      </TextContainer>
                    </LegacyCard>
                    <LegacyCard sectioned>
                      <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText />
                      </TextContainer>
                    </LegacyCard>
                  </Layout.Section>
                </Layout>
              </>
            ) : (
              <>
                {" "}
                <div className="flex mb-2  ticket-statistic">
                  <ButtonGroup segmented spacing="loose">
                    <Button
                      pressed={activeButtonIndex === "ALL"}
                      onClick={() => {
                        handleButtonClick("ALL");
                        navigate(generatePath(TicketRoutePaths.Index));
                      }}
                    >
                      All (
                      {`${
                        statistic?.data.OPEN +
                        statistic?.data.PENDING +
                        statistic?.data.RESOLVED
                      }`}
                      )
                    </Button>
                    <Button
                      pressed={activeButtonIndex === StatusTicket.NEW}
                      onClick={() => {
                        handleButtonClick(StatusTicket.NEW);
                        navigate(TicketRoutePaths.Index, {
                          state: StatusTicket.NEW,
                        });
                      }}
                    >
                      New ({`${statistic?.data.NEW}`})
                    </Button>
                    <Button
                      pressed={activeButtonIndex === StatusTicket.OPEN}
                      onClick={() => {
                        handleButtonClick(StatusTicket.OPEN);
                        navigate(TicketRoutePaths.Index, {
                          state: StatusTicket.OPEN,
                        });
                      }}
                    >
                      Open ({`${statistic?.data.OPEN}`})
                    </Button>
                    <Button
                      pressed={activeButtonIndex === StatusTicket.PENDING}
                      onClick={() => {
                        handleButtonClick(StatusTicket.PENDING);
                        navigate(TicketRoutePaths.Index, {
                          state: StatusTicket.PENDING,
                        });
                      }}
                    >
                      Pending ({`${statistic?.data.PENDING}`})
                    </Button>
                    <Button
                      pressed={activeButtonIndex === StatusTicket.RESOLVED}
                      onClick={() => {
                        handleButtonClick(StatusTicket.RESOLVED);
                        navigate(TicketRoutePaths.Index, {
                          state: StatusTicket.RESOLVED,
                        });
                      }}
                    >
                      Resolve ({`${statistic?.data.RESOLVED}`})
                    </Button>
                    <Button
                      pressed={activeButtonIndex === "TRASH"}
                      onClick={() => {
                        handleButtonClick("TRASH");
                      }}
                    >
                      Trash ({`${statistic?.data.TRASH}`})
                    </Button>
                  </ButtonGroup>
                </div>
                <IndexTable
                  resourceName={{ singular: "ticket", plural: "tickets" }}
                  itemCount={tickets?.length}
                  selectedItemsCount={
                    allResourcesSelected ? "All" : selectedResources?.length
                  }
                  onSelectionChange={handleSelectionChange}
                  loading={loadingList}
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
                    { title: "#" },
                    { title: "Ticket Title" },
                    { title: "Customer" },
                    { title: "Tags" },
                    { title: "Priority" },
                    { title: "Last Update" },
                    { title: "Action" },
                  ]}
                  sortable={[true, true, true, true, true, true, false]}
                  sortDirection={direction}
                  sortColumnIndex={indexSort}
                  onSort={handleSort}
                >
                  {rowMarkup}
                </IndexTable>
                <div>
                  {meta?.totalCount ? (
                    <div className="flex items-center justify-center py-8">
                      {filterData.page &&
                        filterData.limit &&
                        meta?.totalCount && (
                          <>
                            <div className="col-span-1 flex justify-center">
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
                            </div>
                            <div className="col-span-1 ">
                              <p></p>
                            </div>
                          </>
                        )}
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </LegacyCard>
    </Page>
  );
};
export default TrashTicket;
