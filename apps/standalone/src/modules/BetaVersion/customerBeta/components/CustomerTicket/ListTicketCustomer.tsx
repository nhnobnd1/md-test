import { getTableHeigh } from "@moose-beta/helper/function";
import {
  Link,
  priorityToTag,
  upperCaseFirst,
  useSearchParams,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Customer, StatusTicket, Ticket } from "@moose-desk/repo";
import { message, Tag } from "antd";
import { SorterResult } from "antd/es/table/interface";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import Pagination from "src/components/UI/Pagination/Pagination";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { Table } from "src/components/UI/Table";
import env from "src/core/env";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTicketCustomer } from "src/modules/customer/api/api";
import { QUERY_KEY } from "src/modules/customer/helper/constant";
import {
  ListTicketCustomerFilter,
  TicketCustomerResponse,
} from "src/modules/customer/helper/interface";
import styles from "./styles.module.scss";
dayjs.extend(timezone);
dayjs.extend(utc);

const limit = 10;
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
export const ListTicketCustomer = React.memo(() => {
  const [searchParams] = useSearchParams();
  const customerId: string = searchParams.get("customer") || "";
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ListTicketCustomerFilter>({
    limit,
    page: 1,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });
  const {
    data: dataSource,
    isFetching: isFetchingListTicket,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.LIST_TICKET_CUSTOMER, filter],
    queryFn: () => getListTicketCustomer(customerId, filter),
    onError: () => {
      message.error(t("messages:error.get_ticket_customer"));
    },
    keepPreviousData: true,
    enabled: !!customerId,
  });
  const memoDataSource = useMemo(() => {
    return (dataSource as any)?.data.data;
  }, [dataSource]);
  const columns = [
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
      title: t("common:customers.ticket_title"),
      dataIndex: "subject",
      width: "25%",
      sorter: {
        compare: (a: any, b: any) => {
          return a.subject - b.subject;
        },
      },
      render: (_: any, record: any) => (
        <Link
          className={`cursor-pointer hover:underline hover:text-blue-500 subject text-black ${
            record.status === StatusTicket.NEW && "text-bold"
          }`}
          to={`/ticket/${record?._id}`}
        >{`${record.subject}`}</Link>
      ),
    },
    {
      title: t("common:customers.date_request"),
      dataIndex: "createdDatetime",
      sorter: {
        compare: (a: any, b: any) => {
          return a.createdDatetime - b.createdDatetime;
        },
      },
      render: (data: string) => (
        <div>
          {!!timezone &&
            dayjs
              .utc(data)
              .tz(timezone ?? "America/New_York")
              .format("MM/DD/YYYY")}
        </div>
      ),
      width: "15%",
    },
    {
      title: t("common:customers.last_update"),
      dataIndex: "updatedDatetime",
      sorter: {
        compare: (a: any, b: any) => a?.updatedDatetime - b?.updatedDatetime,
      },
      render: (data: string, record: TicketCustomerResponse) => (
        <div>
          {!!timezone && data
            ? dayjs
                .utc(record?.updatedDatetime)
                .tz(timezone ?? "America/New_York")
                .format("MM/DD/YYYY")
            : dayjs
                .utc(record?.createdDatetime)
                .tz(timezone ?? "America/New_York")
                .format("MM/DD/YYYY")}
        </div>
      ),
      width: "15%",
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
    {
      title: t("common:customers.assignee"),
      dataIndex: "agentEmail",
      width: "25%",
    },
  ];
  const handleSearchInput = (query: string) => {
    setFilter((pre) => ({ ...pre, query }));
  };
  const handleChangePage = ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    setFilter({ ...filter, page, limit });
  };
  const handleChangeTable = useCallback(
    (_: any, __: any, sorter: SorterResult<Customer> | any) => {
      if (sorter.order && sorter.field) {
        setFilter((pre) => ({
          ...pre,
          sortBy: sorter?.field as string,
          sortOrder: sorter?.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilter((value) => ({
          ...value,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    []
  );
  const headerSettingEl = document.getElementById("md_my_profile");
  const tabHeaderEl = document.querySelector(".ant-tabs-nav-wrap");
  const screenHeight = window.innerHeight;
  return (
    <div className={styles.wrapTableTicketCustomer}>
      <div className={styles.searchBlock}>
        <div className={classNames(styles.searchWrap)}>
          <MDSearchInput onTypeSearch={handleSearchInput} />
        </div>
      </div>
      <section className={styles.wrapTable}>
        {isLoading ? (
          <div className="p-3">
            <MDSkeleton lines={5} />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={memoDataSource}
            rowKey={(record) => record._id}
            scroll={{
              x: 1024,
              y:
                getTableHeigh(
                  screenHeight,
                  headerSettingEl?.clientHeight,
                  tabHeaderEl?.clientHeight
                ) - 56, // Search input height,
            }}
            pagination={false}
            loading={isFetchingListTicket}
            onChange={handleChangeTable}
          />
        )}
        {/* <section className={styles.wrapPagination}> */}
        <div className={styles.pagination}>
          {isLoading ? (
            <MDSkeleton lines={1} width={200} />
          ) : (
            <Pagination
              currentPage={filter.page ?? 1}
              total={(dataSource as any)?.data.metadata.totalCount}
              pageSize={filter.limit ?? env.DEFAULT_PAGE_SIZE}
              onChange={handleChangePage}
            />
          )}
        </div>
      </section>
      {/* </section> */}
    </div>
  );
});
