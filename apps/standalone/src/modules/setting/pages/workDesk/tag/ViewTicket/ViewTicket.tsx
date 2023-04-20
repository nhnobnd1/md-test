import {
  createdDatetimeFormat,
  upperCaseFirst,
  useJob,
  useNavigate,
  useParams,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import {
  BaseListTagRequest,
  BaseMetaDataListResponse,
  TagRepository,
  Ticket,
} from "@moose-desk/repo";
import { TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { FC, useCallback, useEffect, useState } from "react";
import { map } from "rxjs";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import { ButtonRemoveTag } from "src/modules/setting/component/ButtonRemoveTag";
import "./ViewTicket.scss";
interface ViewTicketProps {}
const defaultFilter = () => ({
  page: 1,
  limit: env.DEFAULT_PAGE_SIZE,
  query: "",
  sortBy: undefined,
  sortOrder: undefined,
});
const ViewTicket: FC<ViewTicketProps> = () => {
  const { id } = useParams();
  const message = useMessage();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const navigate = useNavigate();
  const { isAgent } = usePermission();
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");

  const [filterData, setFilterData] =
    useState<BaseListTagRequest>(defaultFilter);
  const onPagination = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      console.log("change page", { page, limit });
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
  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<any>) => {
      if (sorter.order && sorter.columnKey) {
        setFilterData((value) => ({
          ...value,
          sortBy: sorter.columnKey as string,
          sortOrder: sorter.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((value) => ({
          ...value,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    [setFilterData]
  ) as TableProps<any>["onChange"];
  const { run: getTicketByTagApi, processing } = useJob(
    (id: string, params: BaseListTagRequest) => {
      return TagRepository()
        .getListTicket(id, params)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              //   console.log("data repsonse", data.data);
              setTickets(data.data);
              setMeta(data.metadata);
            } else {
              message.error("Get ticket failed");
            }
          })
        );
    },
    {
      showLoading: true,
    }
  );
  const { run: deleteForceApi } = useJob((id: string) => {
    return TagRepository()
      .deleteForce(id)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            getTicketByTagApi(id, filterData);
            message.success("Deleted Successfully !");
            // navigate(SettingRoutePaths.Workdesk.Tag.Index);
          } else {
            message.error("Get ticket failed");
          }
        })
      );
  });
  const handleDelete = useCallback(() => {
    if (id) {
      deleteForceApi(id);
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      getTicketByTagApi(id, filterData);
    }
  }, [filterData, id]);

  console.log({ tickets });

  return (
    <>
      <Header back title={`Tickets tagged with "${id}"`}>
        <div className="flex-1 flex justify-end"></div>
      </Header>
      <div className="flex justify-end">
        {!isAgent ? (
          <ButtonRemoveTag
            title="Are you sure that you want to permanently remove all?"
            content="All tickets will remove this tag permanently. This action cannot be undone."
            action={handleDelete}
            textAction="Remove"
          />
        ) : (
          <></>
        )}
      </div>
      <Table className="mt-10" dataSource={tickets} onChange={onChangeTable}>
        <Table.Column
          key="subject"
          title="Title"
          render={(_, record: Ticket) => (
            <span className="cursor-pointer hover:underline hover:text-blue-500 subject">
              {`${record.subject}`}
            </span>
          )}
          sorter={{
            compare: (a: any, b: any) => a.subject - b.subject,
          }}
        />
        <Table.Column
          key="createdTimestamp"
          title="Date Requested"
          render={(_, record: Ticket) => (
            <span>{`${createdDatetimeFormat(
              record.createdDatetime,
              timezone
            )}`}</span>
          )}
          sorter={{
            compare: (a: any, b: any) => a.createdDatetime - b.createdDatetime,
          }}
        />
        <Table.Column
          key="updatedTimestamp"
          title="Last Updated"
          render={(_, record: Ticket) => (
            <span>{`${createdDatetimeFormat(
              record.updatedDatetime,
              timezone
            )}`}</span>
          )}
          sorter={{
            compare: (a: any, b: any) =>
              a.updatedTimestamp - b.updatedTimestamp,
          }}
        />
        <Table.Column
          key="status"
          title="Status"
          render={(_, record: Ticket) => (
            <span>{`${upperCaseFirst(record.status)}`}</span>
          )}
          sorter={{
            compare: (a: any, b: any) => a.status - b.status,
          }}
        />
        <Table.Column
          key="priority"
          title="Priority"
          render={(_, record: Ticket) => (
            <span>{`${upperCaseFirst(record.priority)}`}</span>
          )}
          sorter={{
            compare: (a: any, b: any) => a.priority - b.priority,
          }}
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
  );
};

export default ViewTicket;
