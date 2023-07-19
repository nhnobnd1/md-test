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
  GetListTicketRequest,
  ScreenType,
  statusOptions,
  StatusTicket,
  TicketRepository,
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
  Tooltip,
  useIndexResourceState,
} from "@shopify/polaris";
import { catchError, map, of } from "rxjs";

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
import {
  getListAgentApi,
  getListCustomerApi,
  getListTicketApi,
  getStatisticTicket,
  getTagsTicket,
  useExportTicket,
} from "src/modules/ticket/helper/api";
import UilImport from "~icons/uil/import";

import { useQuery } from "react-query";
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
  const { data: dataStatistic, refetch: refetchStatistic } = useQuery({
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

  const { data: dataCustomers } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: () => getListCustomerApi({ page: 1, limit: 500 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      // message.error(t("messages:error.get_customer"));
      show(t("messages:error.get_customer"), { isError: true });
    },
  });
  const customers = useMemo(() => {
    if (!dataCustomers) return [];
    return dataCustomers;
  }, [dataCustomers]);

  const [screenType, screenWidth] = useScreenType();
  const { data: dataAgents } = useQuery({
    queryKey: [
      "getAgents",
      {
        page: 1,
        limit: 500,
      },
    ],
    queryFn: () =>
      getListAgentApi({
        page: 1,
        limit: 500,
      }),
    staleTime: 10000,
    retry: 1,

    onError: () => {
      show(t("messages:error.get_agent"), { isError: true });
    },
  });

  const agents = useMemo(() => {
    if (!dataAgents) return [];
    return dataAgents.filter((item) => item.isActive && item.emailConfirmed);
  }, [dataAgents]);

  const { data: dataTags } = useQuery({
    queryKey: [
      "getTagsTicket",
      {
        page: 1,
        limit: 500,
      },
    ],
    queryFn: () =>
      getTagsTicket({
        page: 1,
        limit: 500,
      }),
    staleTime: 10000,
    retry: 1,

    onError: () => {
      show(t("messages:error.get_tag"), { isError: true });
    },
  });
  const tags = useMemo(() => {
    if (!dataTags) return [];
    return dataTags;
  }, [dataTags]);

  const [mappingFilter, setMappingFilter] = useState<any>(filterData);

  const {
    data: dataTicket,
    isLoading: loadingFilter,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: ["getListTickets", mappingFilter],
    queryFn: () => getListTicketApi(mappingFilter),
    onError: () => {
      show(t("messages:error.get_ticket"), { isError: true });
    },
  });
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
    removeSelectedResources,
    clearSelection,
  } = useIndexResourceState(tickets);
  const [filterObject, setFilterObject] = useState<FilterObject | null>(null);
  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");

  const [showTitle, setShowTitle] = useState(true);

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

  const { run: updateTicketApi } = useJob((data: UpdateTicket) => {
    return TicketRepository()
      .update(data)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show(t("messages:success.update_ticket"));
            // getStatisticTicket();
            refetchStatistic();
            refetchTicket();
            clearSelection();
          }
        }),
        catchError((err) => {
          show(t("messages:error.update_ticket"), { isError: true });
          return of(err);
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
          if (data.statusCode === 200) {
            show(t("messages:success.delete_ticket"));
            // getStatisticTicket();
            refetchStatistic();
            refetchTicket();
            clearSelection();
          }
        }),
        catchError((err) => {
          show(t("messages:error.delete_ticket"), { isError: true });
          return of(err);
        })
      );
  });

  useDeepEffect(() => {
    if (statusFromTrash) {
      setMappingFilter({ ...filterData, status: statusFromTrash });
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
      setMappingFilter({ ...filterData, ...filterObject });

      return;
    }
    setMappingFilter({ ...filterData });
  }, [filterData]);

  const handleResetModal = useCallback(() => {
    setFilterObject(null);
  }, [filterData]);

  const handleOpenModalDelete = useCallback((id: string) => {
    setIdDelete(id);
  }, []);
  const handleApply = (values: any) => {
    setMappingFilter({
      ...filterData,
      // page: 1,
      // limit: 10,
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
        status,
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
            <Text
              variant="bodyMd"
              fontWeight={status === StatusTicket.NEW ? "bold" : "medium"}
              as="span"
            >
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
              <Text
                variant="bodyMd"
                fontWeight={status === StatusTicket.NEW ? "bold" : "medium"}
                as="span"
              >
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
                <Tooltip content="Filter">
                  <ModalFilter
                    agents={agents}
                    handleResetModal={handleResetModal}
                    customers={customers}
                    tags={tags}
                    handleApply={handleApply}
                    filterObject={filterObject}
                  />
                </Tooltip>
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
