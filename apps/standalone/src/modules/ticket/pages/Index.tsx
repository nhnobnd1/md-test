import {
  createdDatetimeFormat,
  generatePath,
  PageComponent,
  upperCaseFirst,
  useJob,
  useLocation,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  Agent,
  AgentRepository,
  BaseListTicketFilterRequest,
  BaseListTicketRequest,
  BaseMetaDataListResponse,
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
import { Button, Input, Spin, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, forkJoin, map, of } from "rxjs";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import IconButton from "src/components/UI/IconButton";
import Pagination from "src/components/UI/Pagination/Pagination";
import Select from "src/components/UI/Select/Select";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { useSubdomain } from "src/hooks/useSubdomain";
import { CardStatistic } from "src/modules/ticket/components/CardStatistic";
import { DeleteSelectedModal } from "src/modules/ticket/components/DeleteSelectedModal";
import { ExportTicketPdf } from "src/modules/ticket/components/ExportTicketPdf/ExportTicketPdf";
import ModalFilter from "src/modules/ticket/components/ModalFilter/ModalFilter";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import IcRoundFilterAlt from "~icons/ic/round-filter-alt";
import UilImport from "~icons/uil/import";
import "./ListTicket.scss";
interface TicketIndexPageProps {}
interface FilterObject {
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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [conversations, setConversations] = useState<ItemConversation[]>([]);
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
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
  const {
    state: filterModal,
    on: openFilterModal,
    off: closeFilterModal,
  } = useToggle();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const location = useLocation();
  const [statusFromTrash, setStatusFromTrash] = useState(location.state);
  const [filterObject, setFilterObject] = useState<FilterObject | null>(null);

  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] =
    useState<BaseListTicketRequest>(defaultFilter);

  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const prevFilter = usePrevious<GetListTicketRequest>(filterData);

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
              message.error(t("messages:error.get_ticket"));
            }
          })
        );
    }
  );
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
              message.error(t("messages:error.get_ticket"));
            }
          })
        );
    }
  );
  const { run: getStatisticTicket } = useJob(() => {
    return TicketRepository()
      .getStatistic()
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setStatistic(data);
          } else {
            message.error(t("messages:error.get_ticket"));
          }
        })
      );
  });

  const { run: fetchConversation } = useJob((id: string) => {
    return TicketRepository()
      .getConversations(id)
      .pipe(
        map(({ data }) => {
          setConversations((previous) => [
            ...previous,
            { id, conversations: data.data },
          ]);
        }),
        catchError((err) => {
          return of(err);
        })
      );
  });

  const { run: getListAgentApi } = useJob((payload: GetListAgentRequest) => {
    return AgentRepository()
      .getList(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            // let current: any = [];
            const tags = data.data.map((item) => ({
              ...item,
              id: item._id,
            }));
            setAgents((prevTags) => {
              // current = [...prevTags, ...tags];
              return [...prevTags, ...tags];
            });

            if (data.metadata.totalPage > (payload.page as number)) {
              getListAgentApi({
                page: (payload.page as number) + 1,
                limit: payload.limit,
              });
              // return;
            }
            // console.log("asdasd", current);
          } else {
            message.error(t("messages:error.get_agent"));
          }
        })
      );
  });

  const { run: getListTagApi, processing: loadingTags } = useJob(
    (payload: GetListTagRequest) => {
      return TagRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              // let current: any = [];
              const tags = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setTags((prevTags) => {
                // current = [...prevTags, ...tags];
                return [...prevTags, ...tags];
              });

              if (data.metadata.totalPage > (payload.page as number)) {
                getListTagApi({
                  page: (payload.page as number) + 1,
                  limit: payload.limit,
                });
                // return;
              }
              // console.log("asdasd", current);
            } else {
              message.error(t("messages:error.get_tag"));
            }
          })
        );
    }
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
              message.error(t("messages:error.get_customer"));
            }
          })
        );
    }
  );
  useEffect(() => {
    const needRequest = selectedRowKeys.filter(
      (item) => !conversations.some((obj) => obj.id === item)
    );
    if (needRequest.length === 0) {
      const filterConversations = conversations.filter((item) =>
        selectedRowKeys.includes(item.id)
      );
      setConversations(filterConversations);
      return;
    }
    const listRequest = needRequest.map((item) =>
      fetchConversation(item as string)
    );
    forkJoin(listRequest).pipe(map(() => {}));
  }, [selectedRowKeys]);

  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<any>) => {
      if (sorter.order && sorter.columnKey) {
        setFilterData((value: any) => ({
          ...value,
          sortBy: sorter.columnKey as string,
          sortOrder: sorter.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((value: any) => ({
          ...value,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    [setFilterData]
  ) as TableProps<any>["onChange"];

  const { run: deleteTicketApi } = useJob((id: string[]) => {
    message.loading.show(t("messages:loading.removing_ticket"));

    return TicketRepository()
      .delete({
        ids: id,
      })
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(t("messages:success.delete_ticket"));
            getStatisticTicket();
            if (filterObject) {
              getListTicketFilter({ ...filterData, ...filterObject });
              return;
            }
            getListTicketApi(filterData);

            // setFilterObject(null);
          } else {
            notification.error(t("messages:error.delete_ticket"), {
              description: "Remove Ticket failed",
              style: {
                width: 450,
              },
            });
          }
        }),
        catchError((err) => {
          notification.error(t("messages:error.delete_ticket"), {
            description: "Remove Ticket failed",
            style: {
              width: 450,
            },
          });
          return of(err);
        })
      );
  });
  const { run: updateTicketApi } = useJob((data: UpdateTicket) => {
    return TicketRepository()
      .update(data)
      .pipe(
        map(({ data }) => {
          // console.log("update ticket success", data);
          if (data.statusCode === 200) {
            getStatisticTicket();
            message.success(t("messages:success.update_ticket"));
          }
        }),
        catchError((err) => {
          message.error(t("messages:error.update_ticket"));

          return of(err);
        })
      );
  });

  const onPagination = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      setFilterData((value) => {
        return {
          ...value,
          page,
          limit,
        };
      });
    },
    []
  );
  useEffect(() => {
    getListTagApi({
      page: 1,
      limit: 500,
    });
    getListCustomerApi({
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
  const handleEdit = (record: Ticket) => {
    navigate(generatePath(TicketRoutePaths.Detail, { id: record._id }));
  };
  const handleDelete = useCallback((ticket: Tag) => {
    deleteTicketApi([ticket._id]);
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    // type: "checkbox",
    preserveSelectedRowKeys: true,
  };
  const handleChangeForm = useCallback(
    (changedValue) => {
      updateTicketApi({
        ids: selectedRowKeys as string[],
        ...changedValue,
      });
    },
    [selectedRowKeys]
  );
  const handleDeleteSelected = useCallback(() => {
    setSelectedRowKeys([]);
    deleteTicketApi(selectedRowKeys as string[]);
  }, [selectedRowKeys]);
  const handleResetModal = useCallback(() => {
    // getListTicketApi(filterData);
    // closeFilterModal();
    setFilterObject(null);
    // closeFilterModal();
  }, [filterData]);

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
    closeFilterModal();
  };

  return (
    <>
      <ModalFilter
        customers={customers}
        tags={tags}
        open={filterModal}
        handleResetModal={handleResetModal}
        cancelText="Reset"
        okText="Apply"
        setTickets={setTickets}
        closeFilterModal={closeFilterModal}
        handleApply={handleApply}
      />
      <Header title="Ticket">
        <div className="flex items-center justify-end flex-1 gap-4">
          <Input.Search
            allowClear
            className="max-w-[400px]"
            placeholder="Search ticket"
            onSearch={(searchText: string) => {
              setFilterData((value: any) => {
                return {
                  ...value,
                  query: searchText,
                  page: 1,
                };
              });
            }}
          ></Input.Search>
          <ButtonAdd onClick={() => navigate(TicketRoutePaths.Create)}>
            Create New Ticket
          </ButtonAdd>
        </div>
      </Header>
      <div className="mt-6">
        <div className="grid grid-cols-7 gap-6 mb-2">
          <div className="col-span-4 col-start-2">
            <div className="flex ">
              <div className="filters flex gap-3">
                <Button
                  onClick={openFilterModal}
                  type="primary"
                  icon={
                    <IconButton>
                      <IcRoundFilterAlt />
                    </IconButton>
                  }
                >
                  Filters
                </Button>
                <div
                  className={`flex gap-3 ${
                    selectedRowKeys.length
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <Form
                    onValuesChange={handleChangeForm}
                    className="flex gap-2"
                  >
                    <Form.Item label="" name="agentObjectId">
                      <Select
                        placeholder="Assign to"
                        options={agentsOptions}
                        className="w-[300px]"
                      />
                    </Form.Item>
                    <Form.Item label="" name="status">
                      <Select
                        placeholder="Set Status"
                        className="w-[150px]"
                        options={statusOptions}
                      />
                    </Form.Item>
                  </Form>

                  <PDFDownloadLink
                    document={
                      <ExportTicketPdf
                        conversations={conversations}
                        agents={agents}
                        tickets={tickets}
                        selectedRowKeys={selectedRowKeys}
                        timezone={timezone}
                      />
                    }
                    fileName="Tickets.pdf"
                    style={{ textDecoration: "none" }}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        <Spin />
                      ) : (
                        <div className="flex justify-center items-center">
                          <Button
                            icon={
                              <IconButton>
                                <UilImport />
                              </IconButton>
                            }
                          >
                            Export
                          </Button>
                        </div>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-1 ">
            <CardStatistic
              status={filterObject?.status || location.state}
              className="mb-4"
              keyPanel="publicViews"
              panelProps={{
                header: "Public Views",
              }}
              handleApply={handleApply}
              screen="ListTicket"
              options={[
                { label: "New", value: `${statistic?.data.NEW}` },
                { label: "Open", value: `${statistic?.data.OPEN}` },
                { label: "Pending", value: `${statistic?.data.PENDING}` },
                { label: "Resolved", value: `${statistic?.data.RESOLVED}` },
                { label: "Trash", value: `${statistic?.data.TRASH}` },
              ]}
            />
          </div>
          <div className="col-span-6">
            {tickets && (
              <>
                <Table
                  rowSelection={rowSelection}
                  dataSource={tickets}
                  scroll={{ x: 1024 }}
                  loading={loadingList}
                  onChange={onChangeTable}
                >
                  <Table.Column
                    key="ticketId"
                    title="#"
                    render={(_, record: Ticket) => (
                      <span
                        className="cursor-pointer hover:underline hover:text-blue-500"
                        onClick={() => handleEdit(record)}
                      >
                        {`${record.ticketId}`}
                      </span>
                    )}
                    sorter={{
                      compare: (a: Ticket, b: Ticket) =>
                        a.ticketId - b.ticketId,
                    }}
                  ></Table.Column>
                  <Table.Column
                    // ellipsis={true}
                    key="subject"
                    title="Ticket Title"
                    render={(_, record: Ticket) => (
                      <span
                        className="cursor-pointer hover:underline hover:text-blue-500 subject"
                        onClick={() => handleEdit(record)}
                      >{`${record.subject}`}</span>
                    )}
                    sorter={{
                      compare: (a: any, b: any) => a.subject - b.subject,
                    }}
                  ></Table.Column>
                  s
                  <Table.Column
                    key="customer"
                    title="Customer"
                    render={(_, record: Ticket) => {
                      if (record.createdViaWidget || record.incoming) {
                        return (
                          <span className="subject">{`${record?.fromEmail.email}`}</span>
                        );
                      }
                      return (
                        <span className="subject">{`${record?.toEmails[0]?.email}`}</span>
                      );
                    }}
                    sorter={{
                      compare: (a: any, b: any) => {
                        const condition1 = a.createdViaWidget || a.incoming;
                        const express1 = condition1
                          ? a.fromEmail?.email
                          : a.toEmails[0]?.email;
                        const condition2 = b.createdViaWidget || b.incoming;
                        const express2 = condition2
                          ? b.fromEmail?.email
                          : b.toEmails[0]?.email;
                        return express1 - express2;
                      },
                    }}
                  ></Table.Column>
                  <Table.Column
                    key="tags"
                    title="Tags"
                    render={(_, record: Ticket) => {
                      return (
                        <div className="flex flex-col wrap gap-2">
                          {record.tags?.slice(-2).map((item, index) => (
                            <span className="tag-item" key={item + index}>
                              #{item}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                    sorter={{
                      compare: (a: any, b: any) => a.tags - b.tags,
                    }}
                  ></Table.Column>
                  <Table.Column
                    key="priority"
                    title="Priority"
                    render={(_, record: Ticket) => (
                      <span>{`${upperCaseFirst(record.priority)}`}</span>
                    )}
                    sorter={{
                      compare: (a: any, b: any) => a.priority - b.priority,
                    }}
                  ></Table.Column>
                  <Table.Column
                    key="updatedTimestamp"
                    title="Last Update"
                    render={(_, record: Ticket) => (
                      <span>
                        {createdDatetimeFormat(
                          record.updatedDatetime,
                          timezone
                        )}
                      </span>
                    )}
                    sorter={{
                      compare: (a: any, b: any) =>
                        a.updatedDatetime - b.updatedDatetime,
                    }}
                  ></Table.Column>
                  <Table.Column
                    align="center"
                    title="Action"
                    render={(_, record: Ticket) => (
                      <TableAction
                        record={record}
                        edit
                        onEdit={handleEdit}
                        specialDelete={{
                          title:
                            "Are you sure that you want to remove this ticket?",
                          description:
                            "This Ticket will be removed to Trash. You can no longer access to this ticket.",
                          textDelete: "Remove",
                        }}
                        onSpecialDelete={handleDelete}
                        onlyIcon
                      />
                    )}
                  />
                </Table>
                {meta?.totalCount
                  ? meta && (
                      <div className="flex justify-between items-end">
                        {selectedRowKeys.length > 0 ? (
                          <DeleteSelectedModal
                            handleDeleteSelected={handleDeleteSelected}
                          />
                        ) : (
                          <div></div>
                        )}
                        <Pagination
                          className="mt-4 flex justify-end flex-wrap "
                          currentPage={filterData.page ?? 1}
                          total={meta?.totalCount}
                          pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
                          onChange={onPagination}
                        />
                      </div>
                    )
                  : null}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketIndexPage;
