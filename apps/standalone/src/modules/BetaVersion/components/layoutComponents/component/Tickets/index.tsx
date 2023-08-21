import {
  createdDatetimeFormat,
  priorityToTag,
  upperCaseFirst,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Ticket } from "@moose-desk/repo";
import { message, Tag } from "antd";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Pagination from "src/components/UI/Pagination/Pagination";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { Table } from "src/components/UI/Table";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTicketApi } from "src/modules/ticket/helper/api";
import styles from "./style.module.scss";
export const Tickets = () => {
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    customer: "minhvuongdev37@gmail.com",
  });
  const { t } = useTranslation();
  const {
    data: dataTicket,
    isLoading: loadingFilter,
    isFetching: fetchingFilter,
    refetch: refetchTicket,
  } = useQuery({
    queryKey: ["getListTickets", filter],
    queryFn: () => getListTicketApi(filter),

    onError: () => {
      message.error(t("messages:error.get_ticket"));
    },
  });
  const columns: any = [
    {
      title: "Status",
      dataIndex: "status",
      render: (_: any, record: Ticket) => (
        <Tag color={priorityToTag(record.status)}>{`${upperCaseFirst(
          record.status
        )}`}</Tag>
      ),
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
      },
    },
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      sorter: {
        compare: (a: Ticket, b: Ticket) => a.ticketId - b.ticketId,
      },
    },
    {
      title: "Ticket Title",
      dataIndex: "subject",
      sorter: {
        compare: (a: any, b: any) => a.subject - b.subject,
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedTimestamp",
      sorter: {
        compare: (a: any, b: any) => a.numberOfTicket - b.numberOfTicket,
      },

      render: (_: any, record: Ticket) => (
        <span>{createdDatetimeFormat(record.updatedDatetime, timezone)}</span>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (_: any, record: Ticket) => (
        <Tag color={priorityToTag(record.priority)}>{`${upperCaseFirst(
          record.priority
        )}`}</Tag>
      ),
      sorter: {
        compare: (a: any, b: any) => a.priority - b.priority,
      },
    },
  ];
  const handleChangePage = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      setFilter((value) => {
        return {
          ...value,
          page,
          limit,
        };
      });
    },
    []
  );
  return (
    <div>
      <Table
        dataSource={(dataTicket as any)?.data}
        loading={fetchingFilter}
        columns={columns}
        scroll={{ x: 1024 }}
      />
      <div className={styles.pagination}>
        {loadingFilter ? (
          <MDSkeleton lines={1} width={300} />
        ) : (
          <Pagination
            currentPage={filter.page ?? 1}
            total={(dataTicket as any)?.metadata?.totalCount || 0}
            pageSize={filter.limit}
            onChange={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};
