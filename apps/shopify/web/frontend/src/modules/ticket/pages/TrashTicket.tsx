import {
  createdDatetimeFormat,
  generatePath,
  MediaScreen,
  upperCaseFirst,
  useNavigate,
} from "@moose-desk/core";
import {
  BaseDeleteList,
  GetListTicketRequest,
  ScreenType,
  StatusTicket,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  ButtonGroup,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Loading,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { FC, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import useGlobalData from "src/hooks/useGlobalData";
import useScreenType from "src/hooks/useScreenType";
import { useSubdomain } from "src/hooks/useSubdomain";
import { ButtonTrashTicket } from "src/modules/ticket/components/ButtonTrashTicket";
import { HeaderListTicket } from "src/modules/ticket/components/HeaderListTicket";
import {
  deleteAllTicket,
  forceDeleteApi,
  getListTrashApi,
  getStatisticTicket,
  restoreTicketApi,
} from "src/modules/ticket/helper/api";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import CancelIcon from "~icons/mdi/cancel";
import RestoreIcon from "~icons/mdi/restore";
interface TrashTicketProps {}
const defaultFilter: () => any = () => ({
  page: 1,
  limit: env.DEFAULT_PAGE_SIZE,
  query: "",
});
const TrashTicket: FC<TrashTicketProps> = () => {
  const navigate = useNavigate();
  // const [tickets, setTickets] = useState<Ticket[]>([]);

  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [screenType, screenWidth] = useScreenType();
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const { show } = useToast();

  const [filterData, setFilterData] = useState<GetListTicketRequest>(
    defaultFilter()
  );

  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");

  const { t, i18n } = useTranslation();

  const { data: dataTicket, isLoading: loadingList } = useQuery({
    queryKey: ["getListTrash", filterData],
    queryFn: () => getListTrashApi(filterData),
    retry: 1,

    onError: () => {
      show(t("messages:error.get_ticket"), { isError: true });
    },
  });
  const [showTitle, setShowTitle] = useState(true);

  const tickets = useMemo(() => {
    if (dataTicket?.data)
      return dataTicket.data.map((item) => ({ ...item, id: item._id }));
    return [];
  }, [dataTicket]);
  const meta = useMemo(() => {
    if (dataTicket?.metadata) return dataTicket.metadata;
    return undefined;
  }, [dataTicket]);

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(tickets);

  const { data: dataStatistic } = useQuery({
    queryKey: ["getStatisticTicket"],
    queryFn: () => getStatisticTicket(),
    retry: 3,

    onError: () => {
      show(t("messages:error.get_ticket"), { isError: true });
    },
  });
  const statistic = useMemo(() => {
    if (dataStatistic) {
      return dataStatistic;
    }
    return {
      statusCode: 200,
      data: {
        OPEN: 0,
        PENDING: 0,
        RESOLVED: 0,
        TRASH: 0,
        NEW: 0,
      },
    };
  }, [dataStatistic]);
  const queryClient = useQueryClient();

  const restore = useMutation({
    mutationFn: (payload: BaseDeleteList) => restoreTicketApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getListTrash"],
      });
      queryClient.invalidateQueries({ queryKey: ["getStatisticTicket"] });
      clearSelection();
      show(t("messages:success.restore_ticket"));
    },
    onError: () => {
      show(t("messages:error.restore_ticket"), { isError: true });
    },
  });

  const forceDelete = useMutation({
    mutationFn: (payload: BaseDeleteList) => forceDeleteApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getListTrash"],
      });
      queryClient.invalidateQueries({ queryKey: ["getStatisticTicket"] });
      clearSelection();
      show(t("messages:success.delete_ticket"));
    },
    onError: () => {
      show(t("messages:error.delete_ticket"), { isError: true });
    },
  });

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

  const deleteAll = useMutation({
    mutationFn: () => deleteAllTicket(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getListTrash"],
      });
      queryClient.invalidateQueries({ queryKey: ["getStatisticTicket"] });

      clearSelection();

      show(t("messages:success.delete_ticket"));
    },
    onError: () => {
      show(t("messages:error.delete_ticket"), { isError: true });
    },
  });

  const handleRestore = (ids: string[]): void => {
    restore.mutate({
      ids,
    });
  };
  const handleDelete = (ids: string[]) => {
    forceDelete.mutate({
      ids,
    });
  };
  const handleDeleteAll = () => {
    deleteAll.mutate();
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
                destructive
                icon={<CancelIcon fontSize={16} />}
              />
            </div>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

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
              <span>Tickets</span>
            </div>
          ) as any
        }
        fullWidth
        primaryAction={
          selectedResources.length === 0 ? (
            <div className="flex gap-2">
              <div className="w-full">
                <div className="flex gap-2 items-center justify-end">
                  <HeaderListTicket
                    setShowTitle={setShowTitle}
                    handleSearch={handleFiltersQueryChange}
                    handleAddNew={() => {
                      navigate(generatePath(TicketRoutePaths.Create));
                    }}
                  ></HeaderListTicket>
                </div>
              </div>
            </div>
          ) : screenWidth <= MediaScreen.LG ? (
            <div className="flex justify-end items-center h-[36px]">
              <ButtonTrashTicket
                title={`Are you sure that you want to permanently remove ${
                  statistic.data.TRASH
                } ticket${statistic.data.TRASH > 1 ? "s" : ""}?`}
                content="These tickets will be remove permanently. This action cannot be undone."
                action={handleDeleteAll}
                primaryContent="Remove"
                text={`Delete all ${statistic.data.TRASH} tickets`}
                // destructive
                plain
              />
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <ButtonTrashTicket
                title={`Are you sure that you want to permanently remove ${
                  statistic.data.TRASH
                } ticket${statistic.data.TRASH > 1 ? "s" : ""}?`}
                content="These tickets will be remove permanently. This action cannot be undone."
                action={handleDeleteAll}
                primaryContent="Remove"
                text={`Delete all ${statistic.data.TRASH} tickets`}
                // destructive
                plain
              />
              <ButtonTrashTicket
                title="Are you sure that you want to permanently remove these tickets?"
                content="These tickets will be remove permanently. This action cannot be undone."
                action={() => {
                  handleDelete(selectedResources);
                }}
                primaryContent="Remove"
                text={
                  screenType === ScreenType.SM ? "Delete" : "Delete Selected"
                }
                destructive
                icon={<CancelIcon fontSize={16} />}
              />
              <ButtonTrashTicket
                title="Are you sure that you want to restore these tickets"
                content="These tickets will be moved back to the Ticket list. You can continue working with them."
                action={() => {
                  handleRestore(selectedResources);
                }}
                primaryContent="Restore"
                text={
                  screenType === ScreenType.SM ? "Restore" : "Restore Selected"
                }
                icon={<RestoreIcon fontSize={16} />}
              />
            </div>
          )
        }
      >
        <LegacyCard sectioned>
          <div className="grid grid-cols-5 gap-6 ">
            <div className="flex justify-end"></div>
          </div>
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-5">
              {loadingList && <Loading />}
              <>
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
                  headings={
                    selectedResources?.length === 0
                      ? [
                          { title: "Ticket ID" },
                          { title: "Ticket Title" },
                          { title: "Customer" },
                          { title: "Tags" },
                          { title: "Priority" },
                          { title: "Last Update" },
                          { title: "Action" },
                        ]
                      : [{ title: `${selectedResources?.length} Selected` }]
                  }
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
            </div>
          </div>
          {screenWidth <= MediaScreen.LG && selectedResources.length > 0 && (
            <div
              className={`sticky z-50 bottom-0 bg-white right-0 px-3 h-[56px] flex justify-between items-center w-full `}
            >
              <ButtonTrashTicket
                title="Are you sure that you want to permanently remove these tickets?"
                content="These tickets will be remove permanently. This action cannot be undone."
                action={() => {
                  handleDelete(selectedResources);
                }}
                primaryContent="Remove"
                text={
                  screenType === ScreenType.SM ? "Delete" : "Delete Selected"
                }
                destructive
                icon={<CancelIcon fontSize={16} />}
              />
              <ButtonTrashTicket
                title="Are you sure that you want to restore these tickets"
                content="These tickets will be moved back to the Ticket list. You can continue working with them."
                action={() => {
                  handleRestore(selectedResources);
                }}
                primaryContent="Restore"
                text={
                  screenType === ScreenType.SM ? "Restore" : "Restore Selected"
                }
                icon={<RestoreIcon fontSize={16} />}
              />
            </div>
          )}
        </LegacyCard>
      </Page>
    </>
  );
};
export default TrashTicket;
