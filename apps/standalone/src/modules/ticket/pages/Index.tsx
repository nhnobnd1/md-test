import {
  PageComponent,
  generatePath,
  useJob,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  Agent,
  AgentRepository,
  BaseListTicketRequest,
  BaseMetaDataListResponse,
  GetListAgentRequest,
  GetListTagRequest,
  GetListTicketRequest,
  Tag,
  TagRepository,
  Ticket,
  TicketRepository,
  UpdateTicket,
  statusOptions,
} from "@moose-desk/repo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Input, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
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
import { CardStatistic } from "src/modules/ticket/components/CardStatistic";
import { ExportTicketPdf } from "src/modules/ticket/components/ExportTicketPdf/ExportTicketPdf";
import ModalFilter from "src/modules/ticket/components/ModalFilter/ModalFilter";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import IcRoundFilterAlt from "~icons/ic/round-filter-alt";
import RemoveIcon from "~icons/material-symbols/delete-outline";
import UilImport from "~icons/uil/import";
interface TicketIndexPageProps {}

const TicketIndexPage: PageComponent<TicketIndexPageProps> = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
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
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();

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
              message.error("Get data ticket failed");
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
            message.error("Get data ticket failed");
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
              message.error("Get data ticket failed");
            }
          })
        );
    }
  );

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
    message.loading.show("Removing Ticket...");
    return TicketRepository()
      .delete({
        ids: id,
      })
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(
              "The selected Ticket has been removed from the system."
            );
            getListTicketApi({
              page: 1,
              limit: env.DEFAULT_PAGE_SIZE,
            });
          } else {
            notification.error("There is an error with remove Ticket.", {
              description: "Remove Ticket failed",
              style: {
                width: 450,
              },
            });
          }
        }),
        catchError((err) => {
          notification.error("There is an error with remove Ticket.", {
            description: "Remove Ticket failed",
            style: {
              width: 450,
            },
          });
          return of(err);
        })
      );
  });
  const { run: updateTicketApi } = useJob(
    (data: UpdateTicket) => {
      return TicketRepository()
        .update(data)
        .pipe(
          map(({ data }) => {
            // console.log("update ticket success", data);
            if (data.statusCode === 200) {
              message.success("Updated tickets successfully");
            }
          }),
          catchError((err) => {
            message.error("Updated tickets fail");

            return of(err);
          })
        );
    },
    { showLoading: false }
  );

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
      limit: 50,
    });
    getListAgentApi({
      page: 1,
      limit: 50,
    });
  }, []);
  useEffect(() => {
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
  };
  const handleChangeForm = useCallback(
    (changedValue) => {
      console.log("asdasd", changedValue);
      console.log({ selectedRowKeys });
      updateTicketApi({
        ids: selectedRowKeys as string[],
        ...changedValue,
      });
    },
    [selectedRowKeys]
  );
  return (
    <>
      <ModalFilter open={filterModal} onCancel={closeFilterModal} />
      <Header title="Ticket">
        <div className="flex items-center justify-end flex-1 gap-4">
          <Input.Search
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
        <div className="grid grid-cols-5 gap-6 mb-2">
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
                    <Form.Item label="" name="status">
                      <Select className="w-[150px]" options={statusOptions} />
                    </Form.Item>
                    <Form.Item label="" name="agentObjectId">
                      <Select
                        placeholder="Search agents"
                        options={agentsOptions}
                        className="w-[300px]"
                        // onChange={onChangeAssignee}
                      />
                    </Form.Item>
                  </Form>

                  <PDFDownloadLink
                    document={
                      <ExportTicketPdf
                        tickets={tickets}
                        selectedRowKeys={selectedRowKeys}
                        tags={tags}
                      />
                    }
                    fileName="Tickets.pdf"
                    style={{ textDecoration: "none" }}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        "Loading document..."
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
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-1">
            <CardStatistic
              className="mb-4"
              keyPanel="publicViews"
              panelProps={{
                header: "Public Views",
              }}
              options={[
                { label: "New", value: "0" },
                { label: "Open", value: "0" },
                { label: "Pending", value: "0" },
                { label: "Resolved", value: "0" },
                { label: "Trash", value: "0" },
              ]}
            />
            {/* <CardStatistic
              className="mb-4"
              keyPanel="privateViews"
              panelProps={{
                header: "Private Views",
              }}
              options={[
                { label: "Custom A", value: "0" },
                { label: "Custom B", value: "0" },
                { label: "Custom C", value: "0" },
              ]}
            />
            <CardStatistic
              className="mb-4"
              keyPanel="sharedWithMe"
              panelProps={{
                header: "Shared with me",
              }}
              options={[
                { label: "Custom A", value: "0" },
                { label: "Custom B", value: "0" },
                { label: "Custom C", value: "0" },
              ]}
            /> */}
          </div>
          <div className="col-span-4">
            {tickets && (
              <>
                <Table
                  rowSelection={rowSelection}
                  dataSource={tickets}
                  loading={loadingList}
                  onChange={onChangeTable}
                >
                  <Table.Column
                    key="ticketId"
                    title="Ticket Number"
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
                    key="subject"
                    title="Ticket Title"
                    render={(_, record: Ticket) => (
                      <span

                      // onClick={() => handleEdit(record)}
                      >
                        {`${record.subject}`}
                      </span>
                    )}
                    sorter={{
                      compare: (a: any, b: any) => a.subject - b.subject,
                    }}
                  ></Table.Column>
                  <Table.Column
                    key="customer"
                    title="Customer"
                    render={(_, record: Ticket) => {
                      // console.log(
                      //   `${record.ticketId} is ${record.fromEmail.name}`
                      // );
                      if (record.createdViaWidget || record.incoming) {
                        return <span>{`${record?.fromEmail.email}`}</span>;
                      }
                      return <span>{`${record?.toEmails[0]?.email}`}</span>;
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
                      // if (!record) return <></>;
                      const filterItemTag = tags.filter((item) =>
                        record.tags?.slice(-2).includes(item.id)
                      );

                      return (
                        <div className="flex flex-col wrap gap-2">
                          {filterItemTag.map((item) => (
                            <span key={item._id}>#{item.name}</span>
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
                      <span>{`${record.priority}`}</span>
                    )}
                    sorter={{
                      compare: (a: any, b: any) => a.priority - b.priority,
                    }}
                  ></Table.Column>
                  <Table.Column
                    key="lastUpdate"
                    title="Last Update"
                    render={(_, record: Ticket) => (
                      <span>
                        {`${
                          record.updatedDatetime
                            ? moment(record.updatedDatetime).format(
                                "HH:mm DD/MM/YYYY"
                              )
                            : ""
                        }`}
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
                    render={(_, record: Tag) => (
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
                        <Button
                          onClick={() => {
                            setSelectedRowKeys([]);
                          }}
                          type="text"
                          className="flex items-center"
                        >
                          <RemoveIcon fontSize={20} />
                          <span>Remove Selected</span>
                        </Button>
                        <Pagination
                          className="mt-4 flex justify-end"
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
