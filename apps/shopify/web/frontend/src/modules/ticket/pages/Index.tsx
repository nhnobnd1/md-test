import {
  createdDatetimeFormat,
  generatePath,
  PageComponent,
  upperCaseFirst,
  useDidUpdate,
  useJob,
  useLocation,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  BaseListTicketFilterRequest,
  Conversation,
  Customer,
  CustomerRepository,
  GetListAgentRequest,
  GetListCustomerRequest,
  GetListTagRequest,
  GetListTicketRequest,
  statusOptions,
  StatusTicket,
  Tag,
  TagRepository,
  Ticket,
  TicketRepository,
  TicketStatistic,
  UpdateTicket,
} from "@moose-desk/repo";
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
import { forkJoin, map } from "rxjs";

import { useToast } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { ModalDeleteTicket } from "src/components/Modal/ModalDeleteTicket";
import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import { ModalFilter } from "src/components/Modal/ModalFilter";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { ExportTicketPdf } from "src/modules/ticket/components/ExportTicketPdf";
import UilImport from "~icons/uil/import";
import "./ListTicket.scss";

interface TicketIndexPageProps {}
export interface FilterObject {
  customer: string;
  tags: string;
  status: string;
  priority: string;
}
interface ItemConversation {
  id: string;
  conversations: Conversation[];
}

const TicketIndexPage: PageComponent<TicketIndexPageProps> = () => {
  const navigate = useNavigate();
  const { show } = useToast();
  const { t, i18n } = useTranslation();

  const {
    state: modalDelete,
    on: openModalDelete,
    off: closeModalDelete,
  } = useToggle(false);
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);

  const [conversations, setConversations] = useState<ItemConversation[]>([]);
  const location = useLocation();
  const [statusFromTrash, setStatusFromTrash] = useState(location.state);
  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });
  const [activeButtonIndex, setActiveButtonIndex] = useState(
    statusFromTrash || "ALL"
  );

  const handleButtonClick = useCallback(
    (index: string) => {
      if (activeButtonIndex === index) return;
      setActiveButtonIndex(index);
    },
    [activeButtonIndex]
  );
  const [sortValue, setSortValue] = useState<string[]>([]);

  const {
    state: btnSort,
    toggle: toggleBtnSort,
    off: closeBtnSort,
  } = useToggle();

  const [filterData, setFilterData] = useState<GetListTicketRequest>(
    defaultFilter()
  );
  const [agents, setAgents] = useState<Agent[]>([]);

  const prevFilter = usePrevious<any>(filterData);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    removeSelectedResources,
  } = useIndexResourceState(tickets);
  const [filterObject, setFilterObject] = useState<FilterObject | null>(null);
  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");
  const [meta, setMeta] = useState<any>();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
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

  const [idDelete, setIdDelete] = useState<string | null>(null);
  const agentsOptions = useMemo(() => {
    const mapping = agents.map((item: Agent) => {
      return {
        value: item._id,
        label: item.lastName.includes("admin")
          ? `${item.firstName} - ${item.email}`
          : `${item.firstName} ${item.lastName} - ${item.email}`,
      };
    });
    return mapping;
  }, [agents]);
  const prevIdDelete = usePrevious(idDelete);
  const { run: fetchConversation } = useJob((id: string) => {
    return TicketRepository()
      .getConversations(id)
      .pipe(
        map(({ data }) => {
          setConversations((previous) => [
            ...previous,
            { id, conversations: data.data },
          ]);
        })
      );
  });
  const { run: getListCustomerApi } = useJob(
    (payload: GetListCustomerRequest) => {
      return CustomerRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const tags = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setCustomers((prevTags) => {
                return [...prevTags, ...tags];
              });

              if (data.metadata.totalPage > (payload.page as number)) {
                getListCustomerApi({
                  page: (payload.page as number) + 1,
                  limit: payload.limit,
                });
              }
            } else {
              // message.error("Get data ticket failed");
            }
          })
        );
    }
  );
  const { run: getListAgentApi } = useJob((payload: GetListAgentRequest) => {
    return AgentRepository()
      .getList(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            const tags = data.data.map((item) => ({
              ...item,
              id: item._id,
            }));
            setAgents((prevTags) => {
              return [...prevTags, ...tags];
            });

            if (data.metadata.totalPage > (payload.page as number)) {
              getListAgentApi({
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
  const { run: getListTicketApi, processing: loadingList } = useJob(
    (payload: GetListTicketRequest) => {
      return TicketRepository()
        .getList(payload)
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
              show(t("messages:error.get_ticket"), { isError: true });
            }
          })
        );
    }
  );
  const { run: getListTagApi } = useJob((payload: GetListTagRequest) => {
    return TagRepository()
      .getList(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            const tags = data.data.map((item) => ({
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
  const { run: getListTicketFilter, processing: loadingFilter } = useJob(
    (payload: BaseListTicketFilterRequest) => {
      return TicketRepository()
        .getListFilter(payload)
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
              show(t("messages:error.get_ticket"), { isError: true });
            }
          })
        );
    }
  );
  const { run: updateTicketApi } = useJob((data: UpdateTicket) => {
    return TicketRepository()
      .update(data)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show(t("messages:success.update_ticket"));
            getStatisticTicket();
          }
        })
      );
  });
  const { run: deleteTicketApi } = useJob((id: string[]) => {
    return TicketRepository()
      .delete({
        ids: id,
      })
      .pipe(
        map(({ data }) => {
          // message.loading.hide();
          if (data.statusCode === 200) {
            show(t("messages:success.delete_ticket"));
            getStatisticTicket();
            if (filterObject) {
              getListTicketFilter({ ...filterData, ...filterObject });
              return;
            }
            getListTicketApi(filterData);
            setFilterData((old: any) => {
              return {
                ...old,
                page: 1,
              };
            });
          } else {
            show(t("messages:error.delete_ticket"), { isError: true });
          }
        })
      );
  });

  useEffect(() => {
    if (statusFromTrash) {
      getListTicketFilter({ ...filterData, status: statusFromTrash });
      setStatusFromTrash("");
      setFilterObject({
        status: statusFromTrash,
        tags: "",
        customer: "",
        priority: "",
      });
      history.replaceState(null, "", window.location.href);
      return;
    }
    if (filterObject) {
      getListTicketFilter({ ...filterData, ...filterObject });
      return;
    }
    getListTicketApi(filterData);
  }, [filterData]);
  const handleResetModal = useCallback(() => {
    setFilterObject(null);
  }, [filterData]);

  const handleOpenModalDelete = useCallback((id: string) => {
    setIdDelete(id);
  }, []);
  const handleApply = (values: any) => {
    getListTicketFilter({
      page: 1,
      limit: 10,
      priority: values.priority,
      status: values.status,
      customer: values.customer,
      tags: values.tags?.toString(),
    });
    setFilterObject({
      priority: values.priority,
      status: values.status,
      customer: values.customer,
      tags: values.tags?.toString(),
    });
  };

  useDidUpdate(() => {
    if (prevIdDelete !== idDelete && idDelete) {
      openModalDelete();
    }
  }, [idDelete]);
  useEffect(() => {
    getListCustomerApi({
      page: 1,
      limit: 500,
    });
    getListTagApi({
      page: 1,
      limit: 500,
    });
    getListAgentApi({
      page: 1,
      limit: 500,
    });
    getStatisticTicket();
  }, []);

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      // get list debounce
    } else {
      // get list
    }
  }, [filterData]);

  useEffect(() => {
    const needRequest = selectedResources.filter(
      (item) => !conversations.some((obj) => obj.id === item)
    );
    if (needRequest.length === 0) {
      const filterConversations = conversations.filter((item) =>
        selectedResources.includes(item.id)
      );
      setConversations(filterConversations);
      return;
    }
    const listRequest = needRequest.map((item) =>
      fetchConversation(item as string)
    );
    forkJoin(listRequest).pipe(map(() => {}));
  }, [selectedResources]);

  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old: any) => {
      return {
        ...old,
        query: queryValue,
      };
    });
  }, []);
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

  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old: any) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);

  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const handleDeleteSelected = useCallback(() => {
    removeSelectedResources(selectedResources);
    deleteTicketApi(selectedResources);
  }, [selectedResources]);

  const onChangeAssignTo = useCallback(
    (value: string) => {
      if (value) {
        updateTicketApi({
          ids: selectedResources,
          agentObjectId: value,
        });
      }
    },
    [selectedResources]
  );
  const onChangeStatus = useCallback(
    (value: string) => {
      if (value) {
        updateTicketApi({
          ids: selectedResources,
          status: value,
        });
      }
    },
    [selectedResources]
  );
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
          <div
            className="hover:underline"
            onClick={() => {
              navigate(generatePath(TicketRoutePaths.Detail, { id: _id }));
            }}
          >
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {ticketId}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {
            <div
              className="hover:underline max-w-lg truncate"
              onClick={() => {
                navigate(generatePath(TicketRoutePaths.Detail, { id: _id }));
              }}
            >
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {subject}
              </Text>
            </div>
          }
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
            <div className="flex gap-2">
              <ButtonEdit
                onClick={() => {
                  navigate(generatePath(TicketRoutePaths.Detail, { id: _id }));
                }}
              ></ButtonEdit>
              <ButtonDelete
                onClick={() => handleOpenModalDelete(_id)}
                destructive
              >
                Remove
              </ButtonDelete>
            </div>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  return (
    <Page
      title="Tickets"
      primaryAction={
        selectedResources.length === 0 ? (
          <div className="flex gap-2">
            <div className="flex-1">
              <Filters
                queryValue={filterData.query}
                onQueryChange={handleFiltersQueryChange}
                onQueryClear={handleQueryValueRemove}
                queryPlaceholder="Search"
                filters={[]}
                onClearAll={resetFilterData}
              >
                <div className="pl-2">
                  <ModalFilter
                    handleResetModal={handleResetModal}
                    customers={customers}
                    tags={tags}
                    handleApply={handleApply}
                    filterObject={filterObject}
                  />
                </div>
              </Filters>
            </div>

            <Button
              primary
              onClick={() => {
                navigate(generatePath(TicketRoutePaths.Create));
              }}
            >
              Add new
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 flex-wrap items-center ">
            <span>{selectedResources?.length} Selected</span>
            <div
              className={`${
                selectedResources?.length ? "block" : "hidden"
              }  w-[250px]`}
            >
              <BoxSelectFilter
                onChange={onChangeAssignTo}
                data={agentsOptions}
                placeholder="Assign to"
              />
            </div>
            <div
              className={`${selectedResources?.length ? "block" : "hidden"}`}
            >
              <BoxSelectFilter
                onChange={onChangeStatus}
                data={statusOptions}
                placeholder="Set Status"
              />
            </div>
            <div
              className={`${selectedResources?.length ? "block" : "hidden"}`}
            >
              <PDFDownloadLink
                document={
                  <ExportTicketPdf
                    conversations={conversations}
                    agents={agents}
                    tickets={tickets}
                    selectedRowKeys={selectedResources}
                    timezone={timezone}
                  />
                }
                fileName="Tickets.pdf"
                style={{ textDecoration: "none" }}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <Button icon={<UilImport />}>Export</Button>
                  ) : (
                    <div className="flex justify-center items-center">
                      <Button icon={<UilImport />}>Export</Button>
                    </div>
                  )
                }
              </PDFDownloadLink>
            </div>
            <div
              className={`col-span-1 ${
                selectedResources.length
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ModalDeleteTicket handleDeleteSelected={handleDeleteSelected} />
            </div>
          </div>
        )
      }
      fullWidth
    >
      <ModalDelete
        open={modalDelete}
        onClose={() => {
          setIdDelete(null);
          closeModalDelete();
        }}
        closePopupAction={false}
        title="Are you sure that you want to remove this ticket?"
        content="This Ticket will be removed to Trash. You can no longer access to this ticket."
        // loadingConfirm={loadingDelete}
        deleteAction={() => {
          if (idDelete) {
            deleteTicketApi([idDelete]);
            closeModalDelete();
          }
        }}
      />

      <LegacyCard sectioned>
        <div className="grid grid-cols-5 gap-6 ">
          <div className="flex justify-end"></div>
          <div className="col-span-4 col-start-2 flex relative items-center "></div>
        </div>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-5">
            {(loadingList || loadingFilter) && <Loading />}
            {loadingList || loadingFilter ? (
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
                <div className="flex mb-2 ticket-statistic">
                  <ButtonGroup segmented spacing="loose">
                    <Button
                      pressed={activeButtonIndex === "ALL"}
                      onClick={() => {
                        handleButtonClick("ALL");
                        handleApply({
                          status: "",
                        });
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
                        handleApply({
                          status: StatusTicket.NEW,
                        });
                      }}
                    >
                      New ({`${statistic?.data.NEW}`})
                    </Button>
                    <Button
                      pressed={activeButtonIndex === StatusTicket.OPEN}
                      onClick={() => {
                        handleButtonClick(StatusTicket.OPEN);
                        handleApply({
                          status: StatusTicket.OPEN,
                        });
                      }}
                    >
                      Open ({`${statistic?.data.OPEN}`})
                    </Button>
                    <Button
                      pressed={activeButtonIndex === StatusTicket.PENDING}
                      onClick={() => {
                        handleButtonClick(StatusTicket.PENDING);
                        handleApply({
                          status: StatusTicket.PENDING,
                        });
                      }}
                    >
                      Pending ({`${statistic?.data.PENDING}`})
                    </Button>
                    <Button
                      pressed={activeButtonIndex === StatusTicket.RESOLVED}
                      onClick={() => {
                        handleButtonClick(StatusTicket.RESOLVED);
                        handleApply({
                          status: StatusTicket.RESOLVED,
                        });
                      }}
                    >
                      Resolve ({`${statistic?.data.RESOLVED}`})
                    </Button>
                    <Button
                      pressed={activeButtonIndex === "TRASH"}
                      onClick={() => {
                        handleButtonClick("TRASH");
                        navigate(generatePath(TicketRoutePaths.Trash));
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
                  // lastColumnSticky
                  onSelectionChange={handleSelectionChange}
                  loading={loadingList || loadingFilter}
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
              </>
            )}
            <div>
              {meta?.totalCount ? (
                <div className="grid grid-cols-3 py-8 relative">
                  {filterData.page && filterData.limit && meta?.totalCount && (
                    <>
                      <div className="col-span-3 flex justify-center">
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
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </LegacyCard>
    </Page>
  );
};

export default TicketIndexPage;
