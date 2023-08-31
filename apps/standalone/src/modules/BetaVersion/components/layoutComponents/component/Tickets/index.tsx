import { getTableHeigh } from "@moose-beta/helper/function";
import {
  createdDatetimeFormat,
  Link,
  priorityToTag,
  upperCaseFirst,
  useSearchParams,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { StatusTicket, Ticket } from "@moose-desk/repo";
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
export const Tickets = React.memo(() => {
  const { subDomain } = useSubdomain();
  const { t } = useTranslation();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agent");
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    agentObjectId: "",
  });
  useEffect(() => {
    if (!agentId) return;
    setFilter((pre) => ({ ...pre, agentObjectId: agentId }));
  }, [agentId]);
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
    enabled: !!filter?.agentObjectId,
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
      render: (_: any, record: any) => (
        <Link
          className={`cursor-pointer hover:underline hover:text-blue-500 subject text-black ${
            record.status === StatusTicket.NEW && "text-bold"
          }`}
          to={`/ticket/${record?._id}`}
        >{`${record.subject}`}</Link>
      ),
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
  const headerSettingEl = document.getElementById("md_my_profile");
  const tabHeaderEl = document.querySelector(".ant-tabs-nav-wrap");
  const screenHeight = window.innerHeight;
  return (
    <div>
      <Table
        dataSource={(dataTicket as any)?.data}
        loading={fetchingFilter}
        columns={columns}
        scroll={{
          x: 1024,
          y: getTableHeigh(
            screenHeight,
            headerSettingEl?.clientHeight,
            tabHeaderEl?.clientHeight
          ),
        }}
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
