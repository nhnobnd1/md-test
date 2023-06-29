import {
  createdDatetimeFormat,
  generatePath,
  MediaScreen,
  PageComponent,
  priorityToTag,
  upperCaseFirst,
  useJob,
  useLoading,
  useLocation,
  useNavigate,
  useToggle,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  Agent,
  BaseListTicketFilterRequest,
  BaseListTicketRequest,
  BaseMetaDataListResponse,
  statusOptions,
  StatusTicket,
  Tag,
  Ticket,
  TicketRepository,
  TicketStatistic,
  UpdateTicket,
} from "@moose-desk/repo";
import { Button, Card, TableProps, Tag as TagAntd } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
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
import { useSubdomain } from "src/hooks/useSubdomain";
import { DeleteSelectedModal } from "src/modules/ticket/components/DeleteSelectedModal";
import ModalFilter from "src/modules/ticket/components/ModalFilter/ModalFilter";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

import { ExportTicket } from "src/modules/ticket/components/ExportTicketPdf/ExportTicket";
import UilImport from "~icons/uil/import";

import { useQuery } from "react-query";
import { HeaderList } from "src/components/HeaderList";
import { MDModalUI } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import useDeepEffect from "src/hooks/useDeepEffect";
import useScreenType from "src/hooks/useScreenType";
import {
  getListAgentApi,
  getListCustomerApi,
  getStatisticTicket,
  getTagsTicket,
  useExportTicket,
} from "src/modules/ticket/helper/api";
import useTicketSelected from "src/modules/ticket/store/useTicketSelected";
import { defaultFilter } from "src/utils/localValue";
import "./ListTicket.scss";
interface TicketIndexPageProps {}
interface FilterObject {
  customer: string;
  tags: string;
  status: string;
  priority: string;
}

const TicketIndexPage: PageComponent<TicketIndexPageProps> = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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
      message.error(t("messages:error.get_tag"));
    },
  });

  const tags = useMemo(() => {
    if (!dataTags) return [];
    return dataTags;
  }, [dataTags]);

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
      message.error(t("messages:error.get_agent"));
    },
  });

  const agents = useMemo(() => {
    if (!dataAgents) return [];
    return dataAgents.filter((item) => item.isActive && item.emailConfirmed);
  }, [dataAgents]);

  const { data: dataCustomers } = useQuery({
    queryKey: ["getCustomers"],
    queryFn: () => getListCustomerApi({ page: 1, limit: 500 }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      message.error(t("messages:error.get_customer"));
    },
  });

  const customers = useMemo(() => {
    if (!dataCustomers) return [];
    return dataCustomers;
  }, [dataCustomers]);

  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const changeTicketSelected = useTicketSelected(
    (state) => state.changeTicketSelected
  );
  const getTicketSelected = useTicketSelected(
    (state) => state.getTicketSelected
  );
  const { startLoading, stopLoading } = useLoading();
  const [isModalActionsOpen, setIsModalActionsOpen] = useState(false);

  const { data: dataStatistic, refetch: refetchStatistic } = useQuery({
    queryKey: ["getStatisticTicket"],
    queryFn: () => getStatisticTicket(),
    retry: 3,
    onSuccess: (data: TicketStatistic) => {
      setStatistic(data);
    },
    onError: () => {
      message.error(t("messages:error.get_ticket"));
    },
  });

  const [statistic, setStatistic] = useState<TicketStatistic>(
    dataStatistic ?? {
      statusCode: 200,
      data: {
        OPEN: 0,
        PENDING: 0,
        RESOLVED: 0,
        TRASH: 0,
        NEW: 0,
      },
    }
  );
  const [conversations, loadingExport] = useExportTicket(
    selectedRowKeys as string[]
  );

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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const location = useLocation();
  const [statusFromTrash, setStatusFromTrash] = useState(location.state);
  const [filterObject, setFilterObject] = useState<FilterObject | null>(null);
  const exportPdfRef = useRef<any>(null);
  const [showTitle, setShowTitle] = useState(true);

  const [activeButtonIndex, setActiveButtonIndex] = useState(
    statusFromTrash || "ALL"
  );
  const [filterData, setFilterData] =
    useState<BaseListTicketRequest>(defaultFilter);

  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const handleButtonClick = useCallback(
    (index: string) => {
      if (activeButtonIndex === index) return;
      setActiveButtonIndex(index);
    },
    [activeButtonIndex]
  );
  const [screenType, screenWidth] = useScreenType();

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
              message.error(t("messages:error.get_ticket"));
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
  const handlePrint = useReactToPrint({
    content: () => exportPdfRef.current,
    documentTitle: "Tickets",
    onBeforeGetContent: () => startLoading(),
    onAfterPrint: () => {
      stopLoading();
    },
  });
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
            refetchStatistic();
            if (filterObject) {
              getListTicketFilter({ ...filterData, ...filterObject });
              return;
            }
            getListTicketFilter(filterData);
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
          if (data.statusCode === 200) {
            refetchStatistic();
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
    const findTicket = tickets.filter((item) =>
      selectedRowKeys.includes(item._id)
    );
    changeTicketSelected(findTicket);
    getTicketSelected(selectedRowKeys as string[]);
  }, [selectedRowKeys]);

  useDeepEffect(() => {
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
    getListTicketFilter(filterData);
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
    setFilterObject(null);
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
        centered
      />
      <Header title={showTitle ? "Tickets" : ""}>
        {selectedRowKeys.length === 0 || screenWidth <= MediaScreen.LG ? (
          <div className="flex items-center justify-end flex-1 gap-2  ">
            <HeaderList
              setShowTitle={setShowTitle}
              handleSearch={(searchText: string) => {
                setFilterData((value: any) => {
                  return {
                    ...value,
                    query: searchText,
                    page: 1,
                  };
                });
              }}
            >
              <MDButton
                className=" flex justify-center items-center"
                onClick={openFilterModal}
                icon={<Icon name="filter" />}
              ></MDButton>

              <ButtonAdd onClick={() => navigate(TicketRoutePaths.Create)}>
                Add new
              </ButtonAdd>
            </HeaderList>
          </div>
        ) : (
          <div className={`flex items-center justify-end flex-1 gap-2  `}>
            <Form
              onValuesChange={handleChangeForm}
              className="flex gap-2 items-center"
              layout="horizontal"
            >
              <Form.Item label="" name="agentObjectId" className="mb-0">
                <Select
                  placeholder="Assign to"
                  options={agentsOptions}
                  className="w-[250px]"
                />
              </Form.Item>
              <Form.Item label="" name="status" className="mb-0">
                <Select
                  placeholder="Set Status"
                  className="w-[150px]"
                  options={statusOptions}
                />
              </Form.Item>
              <MDButton
                disabled={loadingExport}
                onClick={handlePrint}
                // className="w-[100px]"
                icon={
                  <IconButton>
                    <UilImport />
                  </IconButton>
                }
              >
                Export
              </MDButton>
              <DeleteSelectedModal
                handleDeleteSelected={handleDeleteSelected}
              />
            </Form>

            <div className="hidden">
              <div ref={exportPdfRef}>
                <ExportTicket
                  conversations={conversations}
                  agents={agents}
                  selectedRowKeys={selectedRowKeys}
                  timezone={timezone}
                />
              </div>
            </div>
          </div>
        )}
      </Header>
      <div className="mt-5">
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-7">
            {tickets && (
              <>
                <Card
                  bodyStyle={{
                    padding: 8,
                    paddingTop: 8,
                    paddingBottom: 8,
                    overflow: "scroll",
                  }}
                >
                  <div className="flex gap-2">
                    <Button
                      className={`text-xs ${
                        loadingFilter && "pointer-events-none"
                      }`}
                      type={activeButtonIndex === "ALL" ? "primary" : "text"}
                      onClick={() => {
                        handleButtonClick("ALL");
                        handleApply({
                          status: "",
                        });
                      }}
                    >
                      <span className="!text-xs">
                        All (
                        {`${
                          statistic?.data.OPEN +
                          statistic?.data.PENDING +
                          statistic?.data.RESOLVED
                        }`}
                        )
                      </span>
                    </Button>
                    <Button
                      className={`text-xs ${
                        loadingFilter && "pointer-events-none"
                      }`}
                      type={
                        activeButtonIndex === StatusTicket.NEW
                          ? "primary"
                          : "text"
                      }
                      onClick={() => {
                        handleButtonClick(StatusTicket.NEW);
                        handleApply({
                          status: StatusTicket.NEW,
                        });
                      }}
                    >
                      <span className="!text-xs">
                        New ({`${statistic?.data.NEW}`})
                      </span>
                    </Button>
                    <Button
                      className={`text-xs ${
                        loadingFilter && "pointer-events-none"
                      }`}
                      type={
                        activeButtonIndex === StatusTicket.OPEN
                          ? "primary"
                          : "text"
                      }
                      onClick={() => {
                        handleButtonClick(StatusTicket.OPEN);
                        handleApply({
                          status: StatusTicket.OPEN,
                        });
                      }}
                    >
                      <span className="!text-xs">
                        Open ({`${statistic?.data.OPEN}`})
                      </span>
                    </Button>
                    <Button
                      className={`text-xs ${
                        loadingFilter && "pointer-events-none"
                      }`}
                      type={
                        activeButtonIndex === StatusTicket.PENDING
                          ? "primary"
                          : "text"
                      }
                      onClick={() => {
                        handleButtonClick(StatusTicket.PENDING);
                        handleApply({
                          status: StatusTicket.PENDING,
                        });
                      }}
                    >
                      <span className="!text-xs">
                        {" "}
                        Pending ({`${statistic?.data.PENDING}`})
                      </span>
                    </Button>
                    <Button
                      className={`text-xs ${
                        loadingFilter && "pointer-events-none"
                      }`}
                      type={
                        activeButtonIndex === StatusTicket.RESOLVED
                          ? "primary"
                          : "text"
                      }
                      onClick={() => {
                        handleButtonClick(StatusTicket.RESOLVED);
                        handleApply({
                          status: StatusTicket.RESOLVED,
                        });
                      }}
                    >
                      <span className="!text-xs">
                        {" "}
                        Resolve ({`${statistic?.data.RESOLVED}`})
                      </span>
                    </Button>
                    <Button
                      className={`text-xs ${
                        loadingFilter && "pointer-events-none"
                      }`}
                      type={activeButtonIndex === "TRASH" ? "primary" : "text"}
                      onClick={() => {
                        handleButtonClick("TRASH");
                        navigate(generatePath(TicketRoutePaths.Trash));
                      }}
                    >
                      <span className="!text-xs">
                        Trash ({`${statistic?.data.TRASH}`})
                      </span>
                    </Button>
                  </div>
                </Card>
                <Table
                  rowSelection={rowSelection}
                  dataSource={tickets}
                  scroll={{ x: 1024 }}
                  loading={loadingFilter}
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
                      <TagAntd
                        color={priorityToTag(record.priority)}
                      >{`${upperCaseFirst(record.priority)}`}</TagAntd>
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
                            "This Ticket will be removed to Trash. You can check removed tickets in the Trash",
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
                      <div className="flex justify-end items-end">
                        <Pagination
                          className="mt-4 flex justify-end flex-wrap"
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
      {screenWidth <= MediaScreen.LG && selectedRowKeys.length > 0 && (
        <div
          className={`fixed z-50 bottom-0 bg-white right-0 px-3   flex justify-between items-center w-full h-[56px] mt-2`}
        >
          <DeleteSelectedModal handleDeleteSelected={handleDeleteSelected} />
          <Button
            type="link"
            onClick={() => {
              setIsModalActionsOpen(true);
            }}
          >
            <span>More actions </span>
          </Button>
          <MDModalUI
            title="More actions"
            open={isModalActionsOpen}
            centered
            onCancel={() => {
              setIsModalActionsOpen(false);
            }}
            footer={null}
            width={500}
          >
            <Form
              onValuesChange={handleChangeForm}
              className="flex gap-2 items-center flex-col"
              layout="vertical"
            >
              <Form.Item
                label="Assign to"
                name="agentObjectId"
                className="mb-0"
              >
                <Select
                  placeholder="Assign to"
                  options={agentsOptions}
                  className="w-[250px]"
                />
              </Form.Item>
              <Form.Item label="Set status" name="status" className="mb-0">
                <Select
                  placeholder="Set Status"
                  className="w-[250px]"
                  options={statusOptions}
                />
              </Form.Item>
              <Form.Item name="" label="Export pdf">
                <MDButton
                  disabled={loadingExport}
                  onClick={handlePrint}
                  className="w-[250px]"
                  icon={
                    <IconButton>
                      <UilImport />
                    </IconButton>
                  }
                >
                  Export
                </MDButton>
              </Form.Item>
            </Form>
          </MDModalUI>
        </div>
      )}
    </>
  );
};

export default TicketIndexPage;
