import {
  MediaScreen,
  createdDatetimeFormat,
  generatePath,
  priorityToTag,
  upperCaseFirst,
  useNavigate,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  BaseDeleteList,
  BaseListTicketRequest,
  StatusTicket,
  Ticket,
} from "@moose-desk/repo";
import { Button, Card, TableProps, Tag as TagAntd } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { HeaderList } from "src/components/HeaderList";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useScreenType from "src/hooks/useScreenType";
import { useSubdomain } from "src/hooks/useSubdomain";
import { ButtonTicket } from "src/modules/ticket/components/ButtonTicket";
import {
  forceDeleteApi,
  getListTrashApi,
  getStatisticTicket,
  restoreTicketApi,
} from "src/modules/ticket/helper/api";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import { defaultFilter } from "src/utils/localValue";
import CancelIcon from "~icons/mdi/cancel";
import RestoreIcon from "~icons/mdi/restore";
import "./ListTicket.scss";

const TrashTicket = () => {
  const [filterData, setFilterData] =
    useState<BaseListTicketRequest>(defaultFilter);
  const { data: dataTicket, isLoading: loadingList } = useQuery({
    queryKey: ["getListTrash", filterData],
    queryFn: () => getListTrashApi(filterData),
    retry: 1,

    onError: () => {
      message.error(t("messages:error.get_ticket"));
    },
    initialData: [],
  });
  const [showTitle, setShowTitle] = useState(true);

  const tickets = useMemo(() => {
    if (dataTicket?.data) return dataTicket.data;
    return [];
  }, [dataTicket]);
  const meta = useMemo(() => {
    if (dataTicket?.metadata) return dataTicket.metadata;
    return undefined;
  }, [dataTicket]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const message = useMessage();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [screenType, screenWidth] = useScreenType();

  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const { t } = useTranslation();
  const [activeButtonIndex, setActiveButtonIndex] = useState("TRASH");
  const handleButtonClick = useCallback(
    (index: string) => {
      if (activeButtonIndex === index) return;
      setActiveButtonIndex(index);
    },
    [activeButtonIndex]
  );

  const { data: dataStatistic } = useQuery({
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
  };

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

  const restore = useMutation({
    mutationFn: (payload: BaseDeleteList) => restoreTicketApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getListTrash"],
      });
      queryClient.invalidateQueries({ queryKey: ["getStatisticTicket"] });
    },
  });
  const forceDelete = useMutation({
    mutationFn: (payload: BaseDeleteList) => forceDeleteApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getListTrash"],
      });
      queryClient.invalidateQueries({ queryKey: ["getStatisticTicket"] });
    },
  });

  const onPagination = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      setFilterData((value: any) => {
        return {
          ...value,
          page,
          limit,
        };
      });
    },
    []
  );

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

  return (
    <>
      <Header title={showTitle ? "Tickets" : ""}>
        {selectedRowKeys.length === 0 || screenWidth <= MediaScreen.LG ? (
          <div className="flex items-center justify-end flex-1 gap-4">
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
              <ButtonAdd onClick={() => navigate(TicketRoutePaths.Create)}>
                Add new
              </ButtonAdd>
            </HeaderList>
          </div>
        ) : (
          <>
            <div className="flex justify-end w-full gap-2">
              <ButtonTicket
                title="Are you sure that you want to permanently remove these tickets?"
                content="These tickets will be remove permanently. This action cannot be undone."
                action={() => {
                  handleDelete(selectedRowKeys as string[]);
                }}
                icon={
                  <div className="flex items-center gap-2">
                    <CancelIcon fontSize={20} />
                    <span>Deleted Selected</span>
                  </div>
                }
                textAction="Remove"
                danger
                type="primary"
              />
              <ButtonTicket
                title="Are you sure that you want to restore these tickets"
                content="These tickets will be moved back to the Ticket list. You can continue working with them."
                action={() => {
                  handleRestore(selectedRowKeys as string[]);
                }}
                icon={
                  <div className="flex items-center gap-2">
                    <RestoreIcon fontSize={20} />
                    <span>Restore Selected</span>
                  </div>
                }
                textAction="Restore"
              />
            </div>
          </>
        )}
      </Header>
      <div className="mt-5">
        <div className="grid grid-cols-7 gap-4">
          <div className="col-span-7 ">
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
                        loadingList && "pointer-events-none"
                      }`}
                      type={activeButtonIndex === "ALL" ? "primary" : "text"}
                      onClick={() => {
                        handleButtonClick("ALL");
                        navigate(generatePath(TicketRoutePaths.Index));
                      }}
                    >
                      <span className="!text-xs">
                        {" "}
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
                        loadingList && "pointer-events-none"
                      }`}
                      type={
                        activeButtonIndex === StatusTicket.NEW
                          ? "primary"
                          : "text"
                      }
                      onClick={() => {
                        handleButtonClick(StatusTicket.NEW);
                        navigate(TicketRoutePaths.Index, {
                          state: StatusTicket.NEW,
                        });
                      }}
                    >
                      <span className="!text-xs">
                        {" "}
                        New ({`${statistic?.data.NEW}`})
                      </span>
                    </Button>
                    <Button
                      className={`text-xs ${
                        loadingList && "pointer-events-none"
                      }`}
                      type={
                        activeButtonIndex === StatusTicket.OPEN
                          ? "primary"
                          : "text"
                      }
                      onClick={() => {
                        handleButtonClick(StatusTicket.OPEN);
                        navigate(TicketRoutePaths.Index, {
                          state: StatusTicket.OPEN,
                        });
                      }}
                    >
                      <span className="!text-xs">
                        {" "}
                        Open ({`${statistic?.data.OPEN}`})
                      </span>
                    </Button>
                    <Button
                      className={`text-xs ${
                        loadingList && "pointer-events-none"
                      }`}
                      type={
                        activeButtonIndex === StatusTicket.PENDING
                          ? "primary"
                          : "text"
                      }
                      onClick={() => {
                        handleButtonClick(StatusTicket.PENDING);
                        navigate(TicketRoutePaths.Index, {
                          state: StatusTicket.PENDING,
                        });
                      }}
                    >
                      <span className="!text-xs">
                        Pending ({`${statistic?.data.PENDING}`})
                      </span>
                    </Button>
                    <Button
                      className={`text-xs ${
                        loadingList && "pointer-events-none"
                      }`}
                      type={
                        activeButtonIndex === StatusTicket.RESOLVED
                          ? "primary"
                          : "text"
                      }
                      onClick={() => {
                        handleButtonClick(StatusTicket.RESOLVED);
                        navigate(TicketRoutePaths.Index, {
                          state: StatusTicket.RESOLVED,
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
                        loadingList && "pointer-events-none"
                      }`}
                      type={activeButtonIndex === "TRASH" ? "primary" : "text"}
                      onClick={() => {
                        handleButtonClick("TRASH");
                      }}
                    >
                      <span className="!text-xs">
                        {" "}
                        Trash ({`${statistic?.data.TRASH}`})
                      </span>
                    </Button>
                  </div>
                </Card>
                <Table
                  rowSelection={rowSelection}
                  dataSource={tickets}
                  onChange={onChangeTable}
                  scroll={{ x: 1024 }}
                  loading={loadingList}
                >
                  <Table.Column
                    key="ticketId"
                    title="#"
                    render={(_, record: Ticket) => (
                      <span className="">{`${record.ticketId}`}</span>
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
                      <span className="subject">{`${record.subject}`}</span>
                    )}
                    sorter={{
                      compare: (a: any, b: any) => a.subject - b.subject,
                    }}
                  ></Table.Column>
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
                      <div className="flex gap-2">
                        <ButtonTicket
                          title="Are you sure that you want to restore this ticket"
                          content="This ticket will be moved back to the Ticket list. You can continue working with it."
                          action={() => {
                            handleRestore([record._id]);
                          }}
                          icon={<RestoreIcon fontSize={16} />}
                          textAction="Restore"
                        />
                        <ButtonTicket
                          title="Are you sure that you want to permanently remove this ticket?"
                          content="This ticket will be remove permanently. This action cannot be undone."
                          action={() => {
                            handleDelete([record._id]);
                          }}
                          icon={<CancelIcon fontSize={16} />}
                          textAction="Remove"
                          danger
                          type="primary"
                        />
                      </div>
                    )}
                  />
                </Table>
                {meta?.totalCount
                  ? meta && (
                      <div className="flex justify-end items-end bg-white rounded-br-md rounded-bl-md pb-4 pr-4">
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
      {screenWidth <= MediaScreen.LG && selectedRowKeys.length > 0 && (
        <div
          className={`fixed z-50 bottom-0 bg-white right-0 px-3   flex justify-between items-center w-full h-[56px] mt-2`}
        >
          <div className="flex justify-between w-full gap-2">
            <ButtonTicket
              title="Are you sure that you want to permanently remove these tickets?"
              content="These tickets will be remove permanently. This action cannot be undone."
              action={() => {
                handleDelete(selectedRowKeys as string[]);
              }}
              icon={
                <div className="flex items-center gap-2">
                  <CancelIcon fontSize={20} />
                  <span>Deleted Selected</span>
                </div>
              }
              textAction="Remove"
              danger
              type="primary"
            />
            <ButtonTicket
              title="Are you sure that you want to restore these tickets"
              content="These tickets will be moved back to the Ticket list. You can continue working with them."
              action={() => {
                handleRestore(selectedRowKeys as string[]);
              }}
              icon={
                <div className="flex items-center gap-2">
                  <RestoreIcon fontSize={20} />
                  <span>Restore Selected</span>
                </div>
              }
              textAction="Restore"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TrashTicket;
