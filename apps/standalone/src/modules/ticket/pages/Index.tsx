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
  useSearchParams,
  useToggle,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  statusOptions,
  StatusTicket,
  Tag,
  Ticket,
  TicketRepository,
  UpdateTicket,
} from "@moose-desk/repo";
import { Button, Card, TableProps, Tag as TagAntd, Tooltip } from "antd";
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
import { useSubdomain } from "src/hooks/useSubdomain";
import { DeleteSelectedModal } from "src/modules/ticket/components/DeleteSelectedModal";
import ModalFilter from "src/modules/ticket/components/ModalFilter/ModalFilter";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

import { ExportTicket } from "src/modules/ticket/components/ExportTicketPdf/ExportTicket";
import UilImport from "~icons/uil/import";

import { identity, pickBy } from "lodash-es";
import { useQuery } from "react-query";
import { HeaderList } from "src/components/HeaderList";
import { MDModalUI } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import useDeepEffect from "src/hooks/useDeepEffect";
import useScreenType from "src/hooks/useScreenType";
import { AgentSelect } from "src/modules/ticket/components/TicketForm/AgentSelect";
import {
  getListAgentApi,
  getListCustomerApi,
  getListTicketApi,
  getStatisticTicket,
  useExportTicket,
} from "src/modules/ticket/helper/api";
import useTicketSelected from "src/modules/ticket/store/useTicketSelected";
import "./ListTicket.scss";
interface TicketIndexPageProps {}
interface FilterObject {
  customer: string;
  tags: string;
  status: string;
  priority: string;
  agentObjectId: string;
}

const TicketIndexPage: PageComponent<TicketIndexPageProps> = () => {
  const [searchParams] = useSearchParams();
  const [filterData, setFilterData] = useState<any>({
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    query: searchParams.get("query") ?? "",
    customer: searchParams.get("customer") || "",
    tags: searchParams.get("tags") ?? "",
    status: searchParams.get("status") ?? "",
    priority: searchParams.get("priority") ?? "",
    agentObjectId: searchParams.get("agentObjectId") ?? "",
  });

  const [filterObject, setFilterObject] = useState<FilterObject | null>(null);

  const {
    data: dataTicket,
    isLoading: loadingFilter,
    isFetching: fetchingFilter,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: ["getListTickets", filterData],
    queryFn: () => getListTicketApi(filterData),
    onSuccess: () => {
      const searchParams = new URLSearchParams(pickBy(filterData, identity));
      const queryString = searchParams.toString();

      navigate({
        pathname: "/ticket",
        search: `?${queryString}`,
      });
    },
    onError: () => {
      message.error(t("messages:error.get_ticket"));
    },
  });
  const tickets = useMemo(() => {
    if (dataTicket?.data) return dataTicket.data;
    return [];
  }, [dataTicket]);
  const meta = useMemo(() => {
    if (dataTicket?.metadata) return dataTicket.metadata;
    return undefined;
  }, [dataTicket]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
        isLive: 0,
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
    onError: () => {
      message.error(t("messages:error.get_ticket"));
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

  const [conversations, loadingExport] = useExportTicket(
    selectedRowKeys as string[]
  );

  const {
    state: filterModal,
    on: openFilterModal,
    off: closeFilterModal,
  } = useToggle();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const message = useMessage();
  const location = useLocation();
  const [statusFromTrash, setStatusFromTrash] = useState(location.state);
  const exportPdfRef = useRef<any>(null);
  const [showTitle, setShowTitle] = useState(true);

  const [activeButtonIndex, setActiveButtonIndex] = useState(
    statusFromTrash || searchParams.get("status") || "ALL"
  );

  const handleButtonClick = useCallback(
    (index: string) => {
      if (activeButtonIndex === index) return;
      setActiveButtonIndex(index);
    },
    [activeButtonIndex]
  );
  const [screenType, screenWidth] = useScreenType();

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
            message.success(t("messages:success.delete_ticket"));
            refetchStatistic();

            refetchTicket();
            setSelectedRowKeys([]);
          } else {
            message.error(t("messages:error.delete_ticket"));
          }
        }),
        catchError((err) => {
          message.error(t("messages:error.delete_ticket"));
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
            refetchTicket();
            setSelectedRowKeys([]);
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
      // getListTicketFilter({ ...filterData, status: statusFromTrash });

      setFilterData({ ...filterData, status: statusFromTrash });

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
      setFilterData({ ...filterData, ...filterObject });
    }
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
      if (changedValue?.agentObjectId) {
        updateTicketApi({
          ids: selectedRowKeys as string[],
          ...changedValue,
          agentObjectId: changedValue.agentObjectId?.split(",")[0],
          agentEmail: changedValue.agentObjectId?.split(",")[1],
        });
        return;
      }
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
    setFilterData({
      ...filterData,
      page: 1,
      priority: values.priority || undefined,
      status: values.status || undefined,
      customer: values.customer || undefined,
      tags: values.tags?.toString() || undefined,
      agentObjectId: values?.agentObjectId?.split(",")[0] || undefined,
    });

    setFilterObject({
      priority: values.priority,
      status: values.status,
      customer: values.customer,
      tags: values.tags?.toString(),
      agentObjectId: values?.agentObjectId?.split(",")[0],
    });
    setActiveButtonIndex(values.status || "ALL");

    closeFilterModal();
  };
  return (
    <>
      <ModalFilter
        customers={customers}
        open={filterModal}
        handleResetModal={handleResetModal}
        cancelText="Reset"
        okText="Apply"
        closeFilterModal={closeFilterModal}
        handleApply={handleApply}
        centered
      />
      <Header title={showTitle ? "Tickets" : ""}>
        {selectedRowKeys.length === 0 || screenWidth <= MediaScreen.LG ? (
          <div className="flex items-center justify-end flex-1 gap-2  ">
            <HeaderList
              value={filterData.query}
              setShowTitle={setShowTitle}
              handleSearch={(searchText: string) => {
                setFilterData((value: any) => {
                  return {
                    ...value,
                    query: searchText,
                  };
                });
              }}
            >
              <Tooltip title="Filter">
                <MDButton
                  className=" flex justify-center items-center"
                  onClick={openFilterModal}
                  icon={<Icon name="filter" />}
                ></MDButton>
              </Tooltip>

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
                <AgentSelect placeholder="Assign to" className="w-[250px]" />
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
                    overflow: "auto",
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
                  loading={fetchingFilter}
                  onChange={onChangeTable}
                >
                  <Table.Column
                    key="ticketId"
                    title="Ticket ID"
                    render={(_, record: Ticket) => (
                      <span
                        className={`cursor-pointer hover:underline hover:text-blue-500 ${
                          record.status === StatusTicket.NEW && "text-bold"
                        }`}
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
                        className={`cursor-pointer hover:underline hover:text-blue-500 subject  ${
                          record.status === StatusTicket.NEW && "text-bold"
                        }`}
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
                      <div className="flex justify-end items-end bg-white rounded-br-md rounded-bl-md pb-2 pr-4">
                        <Pagination
                          className="mt-2 flex justify-end flex-wrap"
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
                <AgentSelect placeholder="Assign to" className="w-[250px]" />
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
