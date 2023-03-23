import {
  PageComponent,
  generatePath,
  useJob,
  useNavigate,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  BaseListTicketRequest,
  BaseMetaDataListResponse,
  GetListTagRequest,
  GetListTicketRequest,
  Tag,
  TagRepository,
  Ticket,
  TicketRepository,
} from "@moose-desk/repo";
import { Button, Input, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import IconButton from "src/components/UI/IconButton";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { CardStatistic } from "src/modules/ticket/components/CardStatistic";
import ModalFilter from "src/modules/ticket/components/ModalFilter/ModalFilter";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import IcRoundFilterAlt from "~icons/ic/round-filter-alt";
import UilImport from "~icons/uil/import";

interface TicketIndexPageProps {}

const TicketIndexPage: PageComponent<TicketIndexPageProps> = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
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

  const onPagination = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      console.log({ page, limit });
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
  }, []);
  useEffect(() => {
    getListTicketApi(filterData);
  }, [filterData]);
  console.log({ tickets, tags });
  const handleEdit = (record: Ticket) => {
    navigate(generatePath(TicketRoutePaths.Detail, { id: record._id }));
  };
  const handleDelete = useCallback((ticket: Tag) => {
    deleteTicketApi([ticket._id]);
  }, []);
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
            <div className="flex justify-between">
              <div className="filters">
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
              </div>
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
                { label: "New", value: "1" },
                { label: "Open", value: "15" },
                { label: "Pending", value: "3" },
                { label: "Resolved", value: "15" },
                { label: "Trash", value: "3" },
              ]}
            />
            <CardStatistic
              className="mb-4"
              keyPanel="privateViews"
              panelProps={{
                header: "Private Views",
              }}
              options={[
                { label: "Custom A", value: "3" },
                { label: "Custom B", value: "0" },
                { label: "Custom C", value: "2" },
              ]}
            />
            <CardStatistic
              className="mb-4"
              keyPanel="sharedWithMe"
              panelProps={{
                header: "Shared with me",
              }}
              options={[
                { label: "Custom A", value: "3" },
                { label: "Custom B", value: "0" },
                { label: "Custom C", value: "2" },
              ]}
            />
          </div>
          <div className="col-span-4">
            {tickets && (
              <>
                <Table
                  rowSelection={{
                    type: "checkbox",
                  }}
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
                    // sorter={{
                    //   compare: (a: any, b: any) =>
                    //     a.toEmail[0]?.email - b.toEmail[0]?.email,
                    // }}
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
                      <Pagination
                        className="mt-4 flex justify-end"
                        currentPage={filterData.page ?? 1}
                        total={meta?.totalCount}
                        pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
                        onChange={onPagination}
                      />
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
