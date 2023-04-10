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
  Tag,
  TagRepository,
  Ticket,
  TicketRepository,
  TicketStatistic,
  UpdateTicket,
} from "@moose-desk/repo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Button,
  ButtonGroup,
  EmptySearchResult,
  Filters,
  IndexTable,
  LegacyCard,
  Link,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { forkJoin, map } from "rxjs";

import { useToast } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ButtonSort } from "src/components/Button/ButtonSort";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { ModalDeleteTicket } from "src/components/Modal/ModalDeleteTicket";
import { ModalFilter } from "src/components/Modal/ModalFilter";
import BoxSelectFilter from "src/components/Modal/ModalFilter/BoxSelectFilter";
import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import { SortOrderOptions } from "src/models/Form";
import CardStatistic from "src/modules/ticket/components/CardStatistic/CardStatistic";
import { optionsSort } from "src/modules/ticket/constant";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import UilImport from "~icons/uil/import";

import { ExportTicketPdf } from "src/modules/ticket/components/ExportTicketPdf";
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

  const {
    state: modalDelete,
    on: openModalDelete,
    off: closeModalDelete,
  } = useToggle(false);
  const [conversations, setConversations] = useState<ItemConversation[]>([]);
  const location = useLocation();
  const [statusFromTrash, setStatusFromTrash] = useState(location.state);
  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

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
  const { run: getListTicketFilter } = useJob(
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
          // console.log("update ticket success", data);
          if (data.statusCode === 200) {
            show("Updated tickets successfully");
            getStatisticTicket();
            // message.success("Updated tickets successfully");
          }
        })
        // catchError((err) => {
        //   message.error("Updated tickets fail");

        //   return of(err);
        // })
      );
  });
  const { run: deleteTicketApi } = useJob((id: string[]) => {
    // message.loading.show("Removing Ticket...");
    return TicketRepository()
      .delete({
        ids: id,
      })
      .pipe(
        map(({ data }) => {
          // message.loading.hide();
          if (data.statusCode === 200) {
            show("The selected Ticket has been removed from the system.");
            getListTicketApi({
              page: 1,
              limit: env.DEFAULT_PAGE_SIZE,
            });
            setFilterData((old: any) => {
              return {
                ...old,
                page: 1,
              };
            });
            getStatisticTicket();
          } else {
            // notification.error("There is an error with remove Ticket.", {
            //   description: "Remove Ticket failed",
            //   style: {
            //     width: 450,
            //   },
            // });
          }
        })
      );
  });

  useEffect(() => {
    if (statusFromTrash) {
      getListTicketFilter({ ...filterData, status: statusFromTrash });
      setStatusFromTrash("");
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
  const handleSort = useCallback(
    (selected: string[]) => {
      const arraySort = selected[0].split(":");
      const sortBy = arraySort[0];
      const sortOrder = arraySort[1] === SortOrderOptions.ACS ? 1 : -1;
      setSortValue(selected);

      setFilterData((value: any) => {
        return { ...value, sortBy, sortOrder };
      });
    },
    [filterData]
  );
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
        // onClick={() => {}}
      >
        <IndexTable.Cell>
          <Link
            removeUnderline
            dataPrimaryLink
            onClick={() => {
              navigate(generatePath(TicketRoutePaths.Detail, { id: _id }));
            }}
          >
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {ticketId}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{subject}</IndexTable.Cell>
        <IndexTable.Cell>
          {createdViaWidget || incoming ? (
            <span className="subject">{`${fromEmail.email}`}</span>
          ) : (
            <span className="subject">{`${toEmails[0]?.email}`}</span>
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
          {createdDatetimeFormat(updatedDatetime)}
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
      title="Ticket"
      primaryAction={
        <div className="flex gap-2">
          <div className="flex-1">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search ticket"
              filters={[]}
              onClearAll={resetFilterData}
            ></Filters>
          </div>

          <Button
            primary
            onClick={() => {
              navigate(generatePath(TicketRoutePaths.Create));
            }}
          >
            Create New Ticket
          </Button>
        </div>
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
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="flex justify-end"></div>
          <div className="col-span-3 col-start-2 flex relative items-center ">
            <div className="flex gap-2 flex-wrap">
              <ModalFilter
                handleResetModal={handleResetModal}
                customers={customers}
                tags={tags}
                handleApply={handleApply}
                filterObject={filterObject}
              />

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
            </div>
          </div>
          <div className="pl-2 col-span-1 col-start-5 flex justify-end">
            <ButtonSort
              active={btnSort}
              sortValue={sortValue}
              onSort={handleSort}
              onShow={toggleBtnSort}
              onClose={closeBtnSort}
              options={optionsSort}
            />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-1">
            <CardStatistic
              status={filterObject?.status || location.state}
              className="mb-4"
              handleApply={handleApply}
              screen="ListTicket"
              title="Public Views"
              options={[
                { label: "New", value: `${statistic?.data.NEW}` },
                { label: "Open", value: `${statistic?.data.OPEN}` },
                { label: "Pending", value: `${statistic?.data.PENDING}` },
                { label: "Resolved", value: `${statistic?.data.RESOLVED}` },
                { label: "Trash", value: `${statistic?.data.TRASH}` },
              ]}
            />
          </div>
          <div className="col-span-4">
            <IndexTable
              resourceName={{ singular: "ticket", plural: "tickets" }}
              itemCount={tickets?.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources?.length
              }
              // lastColumnSticky
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
            >
              {rowMarkup}
            </IndexTable>
            <div>
              {meta?.totalCount ? (
                <div className="grid grid-cols-3 py-8 relative">
                  {filterData.page && filterData.limit && meta?.totalCount && (
                    <>
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
          </div>
        </div>
      </LegacyCard>
    </Page>
  );
};

export default TicketIndexPage;
