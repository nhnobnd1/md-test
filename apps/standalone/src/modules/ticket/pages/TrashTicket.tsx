import {
  createdDatetimeFormat,
  upperCaseFirst,
  useJob,
} from "@moose-desk/core";
import {
  BaseDeleteList,
  BaseListTicketRequest,
  BaseMetaDataListResponse,
  GetListTagRequest,
  GetListTicketRequest,
  Tag,
  TagRepository,
  Ticket,
  TicketRepository,
  TicketStatistic,
} from "@moose-desk/repo";
import { Input, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import { map } from "rxjs";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import { ButtonTicket } from "src/modules/ticket/components/ButtonTicket";
import { CardStatistic } from "src/modules/ticket/components/CardStatistic";
import CancelIcon from "~icons/mdi/cancel";
import RestoreIcon from "~icons/mdi/restore";
import "./ListTicket.scss";
interface TrashTicketProps {}

const TrashTicket = (props: TrashTicketProps) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const message = useMessage();
  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] =
    useState<BaseListTicketRequest>(defaultFilter);

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

  const { run: getListTrashApi, processing: loadingList } = useJob(
    (payload: GetListTicketRequest) => {
      return TicketRepository()
        .getListTrash(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const tickets = data.data.map((item: Ticket) => ({
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

  const { run: restoreTicketApi } = useJob((payload: BaseDeleteList) => {
    return TicketRepository()
      .restore(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            getListTrashApi(filterData);
            getStatisticTicket();
          } else {
            message.error("Get data ticket failed");
          }
        })
      );
  });
  const { run: forceDeleteApi } = useJob((payload: BaseDeleteList) => {
    return TicketRepository()
      .deletePermanently(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            getListTrashApi(filterData);
            getStatisticTicket();
          } else {
            message.error("Get data ticket failed");
          }
        })
      );
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
  const { run: getStatisticTicket } = useJob(() => {
    return TicketRepository()
      .getStatistic()
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setStatistic(data);
          } else {
            message.error("Get data ticket failed");
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
            const tags = data.data.map((item: Tag) => ({
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
            message.error("Get data ticket failed");
          }
        })
      );
  });
  const handleRestore = (ids: string[]): void => {
    restoreTicketApi({
      ids,
    });
  };
  const handleDelete = (ids: string[]) => {
    forceDeleteApi({
      ids,
    });
  };
  useEffect(() => {
    getListTagApi({
      page: 1,
      limit: 500,
    });
    getStatisticTicket();
  }, []);
  useEffect(() => {
    getListTrashApi(filterData);
  }, [filterData]);

  return (
    <>
      <Header title="" back>
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
        </div>
      </Header>
      <div className="mt-6">
        <div className="grid grid-cols-5 gap-6 mb-2">
          <div className="col-span-4 col-start-2">
            <div className="flex ">
              <div
                className={`filters flex gap-3 h-[56px] items-center ${
                  selectedRowKeys.length
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-6">
          <div className="col-span-1 min-w-[150px]">
            <CardStatistic
              className="mb-4"
              keyPanel="publicViews"
              panelProps={{
                header: "Public Views",
              }}
              screen="Trash"
              options={[
                { label: "New", value: `${statistic.data.NEW}` },
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
                  // loading={loadingList}
                  onChange={onChangeTable}
                  scroll={{ x: 1024 }}
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
                      // if (!record) return <></>;
                      const filterItemTag = tags.filter((item) =>
                        record.tags?.slice(-2).includes(item.id)
                      );

                      return (
                        <div className="flex flex-col wrap gap-2">
                          {filterItemTag.map((item) => (
                            <span className="tag-item" key={item._id}>
                              #{item.name}
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
                    key="lastUpdate"
                    title="Last Update"
                    render={(_, record: Ticket) => (
                      <span>
                        {createdDatetimeFormat(record.updatedDatetime)}
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
                      <div className="flex">
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
                        />
                      </div>
                    )}
                  />
                </Table>
                {meta?.totalCount
                  ? meta && (
                      <div className="flex justify-end items-end">
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

export default TrashTicket;
