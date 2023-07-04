import {
  createdDatetimeFormat,
  generatePath,
  MediaScreen,
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
  Customer,
  CustomerRepository,
  GetListAgentRequest,
  GetListCustomerRequest,
  GetListTagRequest,
  GetListTicketRequest,
  ScreenType,
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
  IndexTable,
  LegacyCard,
  Loading,
  Modal,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { map } from "rxjs";

import { useToast } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { ModalDeleteTicket } from "src/components/Modal/ModalDeleteTicket";
import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

// import { ScreenType } from "@moose-desk/repo/";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import { ModalFilter } from "src/components/Modal/ModalFilter";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import useGlobalData from "src/hooks/useGlobalData";
import useScreenType from "src/hooks/useScreenType";
import { useSubdomain } from "src/hooks/useSubdomain";
import { HeaderListTicket } from "src/modules/ticket/components/HeaderListTicket";
import { useExportTicket } from "src/modules/ticket/helper/api";
import UilImport from "~icons/uil/import";

import useDeepEffect from "src/hooks/useDeepEffect";
import { ExportTicket } from "src/modules/ticket/components/ExportTicket";
import useTicketSelected from "src/modules/ticket/store/useTicketSelected";
import "./ListTicket.scss";

interface TicketIndexPageProps {}
export interface FilterObject {
  customer: string;
  tags: string;
  status: string;
  priority: string;
  agentObjectId: string;
}
const defaultFilter = () => ({
  page: 1,
  limit: env.DEFAULT_PAGE_SIZE,
  query: "",
});

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

  const location = useLocation();
  const [statusFromTrash, setStatusFromTrash] = useState(location.state);

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

  const [filterData, setFilterData] = useState<GetListTicketRequest>(
    defaultFilter()
  );

  const [screenType, screenWidth] = useScreenType();

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
  const [showTitle, setShowTitle] = useState(true);

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
  const [active, setActive] = useState(false);

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
  const [conversations, loadingExport] = useExportTicket(
    selectedResources as string[]
  );
  const exportPdfRef = useRef<any>(null);

  const handlePrint = useReactToPrint({
    content: () => exportPdfRef.current,
    documentTitle: "Tickets",
    onAfterPrint: () => {},
  });
  const prevIdDelete = usePrevious(idDelete);
  const changeTicketSelected = useTicketSelected(
    (state) => state.changeTicketSelected
  );
  const getTicketSelected = useTicketSelected(
    (state) => state.getTicketSelected
  );
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
            const tags = data.data
              .filter((item) => item.isActive && item.emailConfirmed)

              .map((item) => ({
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
            getListTicketFilter(filterData);
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

  useDeepEffect(() => {
    if (statusFromTrash) {
      getListTicketFilter({ ...filterData, status: statusFromTrash });
      setStatusFromTrash("");
      setFilterObject({
        status: statusFromTrash,
        tags: "",
        customer: "",
        priority: "",
        agentObjectId: "",
      });
      history.replaceState(null, "", window.location.href);
      return;
    }
    if (filterObject) {
      getListTicketFilter({ ...filterData, ...filterObject });
      return;
    }
    getListTicketFilter(filterData);
  }, [filterData]);

  const handleResetModal = useCallback(() => {
    setFilterObject(null);
  }, [filterData]);

  const handleOpenModalDelete = useCallback((id: string) => {
    setIdDelete(id);
  }, []);
  const handleApply = (values: any) => {
    console.log({ values });
    getListTicketFilter({
      page: 1,
      limit: 10,
      priority: values.priority || undefined,
      status: values.status || undefined,
      customer: values.customer || undefined,
      tags: values.tags?.toString() || undefined,
      agentObjectId: values?.agentObjectId || undefined,
    });
    setFilterObject({
      priority: values.priority,
      status: values.status,
      customer: values.customer,
      tags: values.tags?.toString(),
      agentObjectId: values?.agentObjectId,
    });
    setActiveButtonIndex(values.status || "ALL");
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
    const findTicket = tickets.filter((item) =>
      selectedResources.includes(item._id)
    );
    changeTicketSelected(findTicket);
    getTicketSelected(selectedResources as string[]);
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
  const handleChange = useCallback(() => setActive(!active), [active]);

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
                isTable
                onClick={() => {
                  navigate(generatePath(TicketRoutePaths.Detail, { id: _id }));
                }}
              ></ButtonEdit>
              <ButtonDelete
                isTable
                onClick={() => handleOpenModalDelete(_id)}
                // destructive
              >
                Remove
              </ButtonDelete>
            </div>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  const activator = (
    <div className="flex gap-2 items-center ">
      <Button
        plain
        onClick={() => {
          setActive(true);
        }}
      >
        More actions
      </Button>
    </div>
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
        primaryAction={
          selectedResources.length === 0 || screenWidth <= MediaScreen.LG ? (
            <div className="flex gap-2 items-center justify-end">
              <HeaderListTicket
                setShowTitle={setShowTitle}
                handleSearch={handleFiltersQueryChange}
                handleAddNew={() => {
                  navigate(generatePath(TicketRoutePaths.Create));
                }}
              >
                <ModalFilter
                  agents={agents}
                  handleResetModal={handleResetModal}
                  customers={customers}
                  tags={tags}
                  handleApply={handleApply}
                  filterObject={filterObject}
                />
              </HeaderListTicket>
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap items-center justify-end ">
              <div className="flex gap-2 items-center">
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
              </div>
              <div className="flex gap-2">
                <div
                  className={`${
                    selectedResources?.length ? "block" : "hidden"
                  }`}
                >
                  <BoxSelectFilter
                    onChange={onChangeStatus}
                    data={statusOptions}
                    placeholder="Set Status"
                  />
                </div>
                <div
                  className={`${
                    selectedResources?.length ? "block" : "hidden"
                  }`}
                >
                  <Button
                    onClick={handlePrint}
                    disabled={loadingExport}
                    icon={<UilImport />}
                  >
                    Export
                  </Button>
                  <div className="hidden">
                    <div ref={exportPdfRef}>
                      <ExportTicket
                        conversations={conversations}
                        agents={agents}
                        selectedRowKeys={selectedResources}
                        timezone={timezone}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`col-span-1 ${
                    selectedResources.length
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <ModalDeleteTicket
                    handleDeleteSelected={handleDeleteSelected}
                  />
                </div>
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
          content="This Ticket will be removed to Trash. You can check removed tickets in the Trash"
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
              {loadingFilter && <Loading />}
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
                  loading={loadingFilter}
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
                          { title: "#" },
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
              </>
              <div>
                {meta?.totalCount ? (
                  <div className="grid grid-cols-3 py-8 relative">
                    {filterData.page &&
                      filterData.limit &&
                      meta?.totalCount && (
                        <>
                          <div className="col-span-3 flex justify-center">
                            <Pagination
                              total={meta.totalCount}
                              pageSize={filterData.limit ?? 0}
                              currentPage={meta.page}
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
          {screenWidth <= MediaScreen.LG && selectedResources.length > 0 && (
            <div
              className={`sticky z-50 bottom-0 bg-white right-0 px-3 h-[56px] flex justify-between items-center w-full `}
            >
              <ModalDeleteTicket handleDeleteSelected={handleDeleteSelected} />
              <div>
                <Modal
                  activator={activator}
                  open={active}
                  onClose={handleChange}
                  title="More actions"
                >
                  <div className="flex flex-col gap-2  items-center justify-center p-5">
                    <div
                      className={`${
                        selectedResources?.length ? "block" : "hidden"
                      }  w-[250px]`}
                    >
                      <BoxSelectFilter
                        label={"Assignee"}
                        onChange={onChangeAssignTo}
                        data={agentsOptions}
                        placeholder="Assign to"
                      />
                    </div>
                    <div
                      className={`${
                        selectedResources?.length ? "block" : "hidden"
                      } w-[250px] mb-3`}
                    >
                      <BoxSelectFilter
                        label={"Status"}
                        onChange={onChangeStatus}
                        data={statusOptions}
                        placeholder="Set Status"
                      />
                    </div>
                    <div className="w-[250px]">
                      <Button
                        onClick={handlePrint}
                        disabled={loadingExport}
                        icon={<UilImport />}
                        fullWidth
                      >
                        Export
                      </Button>
                      <div className="hidden">
                        <div ref={exportPdfRef}>
                          <ExportTicket
                            conversations={conversations}
                            agents={agents}
                            selectedRowKeys={selectedResources}
                            timezone={timezone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          )}
        </LegacyCard>
      </Page>
    </>
  );
};

export default TicketIndexPage;
