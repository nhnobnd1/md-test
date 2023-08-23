import {
  createdDatetimeFormat,
  priorityToTag,
  upperCaseFirst,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Ticket } from "@moose-desk/repo";
import { message, Tag } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Pagination from "src/components/UI/Pagination/Pagination";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { Table } from "src/components/UI/Table";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTicketApi } from "src/modules/ticket/helper/api";
import styles from "./style.module.scss";
const getStatusTag = (status: string) => {
  switch (status) {
    case "NEW":
      return "#2db7f5";
    case "OPEN":
      return "rgb(255, 153, 0)";
    case "PENDING":
      return "#f50";
    case "RESOLVED":
      return "#87d068";
    default:
      return "#2db7f5";
  }
};
interface IProps {
  email?: string;
}
export const Tickets = React.memo(({ email }: IProps) => {
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    customer: "",
  });
  useEffect(() => {
    if (!email) return;
    setFilter((pre) => ({ ...pre, customer: email }));
  }, [email]);
  const { t } = useTranslation();
  const {
    data: dataTicket,
    isLoading: loadingFilter,
    isFetching: fetchingFilter,
  } = useQuery({
    queryKey: ["getListTickets", filter],
    queryFn: () => getListTicketApi(filter),

    onError: () => {
      message.error(t("messages:error.get_ticket"));
    },
    enabled: !!filter?.customer,
  });
  const columns: any = [
    {
      title: "Status",
      dataIndex: "status",
      render: (_: any, record: Ticket) => (
        <Tag color={getStatusTag(record.status)}>{`${upperCaseFirst(
          record.status
        )}`}</Tag>
      ),
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
      },
      width: "10%",
    },
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      sorter: {
        compare: (a: Ticket, b: Ticket) => a.ticketId - b.ticketId,
      },
      width: "10%",
    },
    {
      title: "Ticket Title",
      dataIndex: "subject",
      sorter: {
        compare: (a: any, b: any) => a.subject - b.subject,
      },
      width: "50%",
    },
    {
      title: "Last Update",
      dataIndex: "updatedTimestamp",
      sorter: {
        compare: (a: any, b: any) => a.updatedTimestamp - b.updatedTimestamp,
      },

      render: (_: any, record: Ticket) => (
        <span>{createdDatetimeFormat(record.updatedDatetime, timezone)}</span>
      ),
      width: "20%",
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
      width: "10%",
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
        scroll={{ x: 1024, y: 400 }}
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
});
