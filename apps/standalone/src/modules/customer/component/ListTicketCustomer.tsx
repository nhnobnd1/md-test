import { useNavigate } from "@moose-desk/core";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Customer } from "@moose-desk/repo";
import { message } from "antd";
import { SorterResult } from "antd/es/table/interface";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import Pagination from "src/components/UI/Pagination/Pagination";
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

interface IProps {
  customerId: string;
}
export const ListTicketCustomer = ({ customerId }: IProps) => {
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [querySearch, setQuerySearch] = useState<string>("");
  const [filter, setFilter] = useState<ListTicketCustomerFilter>({
    limit,
    page: 1,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });
  const debounceValue: string = useDebounce(querySearch, 500);
  const { data: dataSource, isFetching: isFetchingListTicket } = useQuery({
    queryKey: [QUERY_KEY.LIST_TICKET_CUSTOMER, filter, debounceValue],
    queryFn: () =>
      getListTicketCustomer(customerId, { ...filter, query: debounceValue }),
    onError: () => {
      message.error(t("messages:error.get_ticket_customer"));
    },
    keepPreviousData: true,
  });
  const memoDataSource = useMemo(() => {
    return (dataSource as any)?.data.data;
  }, [dataSource]);
  const columns = [
    {
      title: "Ticket title",
      dataIndex: "subject",
      width: "45%",
    },
    {
      title: "Date request",
      dataIndex: "createdDatetime",
      sorter: {
        compare: (a: any, b: any) => {
          return a.createdDatetime - b.createdDatetime;
        },
      },
      render: (data: string, record: any) => (
        <div>
          {!!timezone &&
            dayjs
              .utc(data)
              .tz(timezone ?? "America/New_York")
              .format("MM/DD/YYYY")}
        </div>
      ),
      width: "11%",
    },
    {
      title: "Last updated",
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
      width: "11%",
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
      },
      width: "11%",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      sorter: {
        compare: (a: any, b: any) => a.priority - b.priority,
      },
      width: "11%",
    },
    {
      title: "Assignee",
      dataIndex: "agentEmail",
      width: "11%",
    },
  ];
  const handleSearchInput = (e: any) => {
    const newQuery = e.target.value;
    setQuerySearch(newQuery);
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
  const handleClickRow = (record: TicketCustomerResponse) => {
    navigate(`/ticket/${record?._id}`);
  };
  return (
    <div className={styles.wrapTableTicketCustomer}>
      <div className={classNames(styles.searchWrap, "mb-10")}>
        <MDSearchInput onChange={handleSearchInput} value={querySearch} />
      </div>
      <section className={styles.wrapTable}>
        <Table
          columns={columns}
          dataSource={memoDataSource}
          rowKey={(record) => record._id}
          scroll={{ x: 1024 }}
          pagination={false}
          loading={isFetchingListTicket}
          onChange={handleChangeTable}
          onRow={(record, _) => {
            return {
              onClick: () => handleClickRow(record),
            };
          }}
        />
        {/* <section className={styles.wrapPagination}> */}
        <Pagination
          className="mt-4 flex justify-end"
          currentPage={filter.page ?? 1}
          total={(dataSource as any)?.data.metadata.totalCount}
          pageSize={filter.limit ?? env.DEFAULT_PAGE_SIZE}
          onChange={handleChangePage}
        />
      </section>
      {/* </section> */}
    </div>
  );
};
