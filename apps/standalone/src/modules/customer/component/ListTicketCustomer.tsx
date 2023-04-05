import { useJob, useNavigate } from "@moose-desk/core";
import { formatTimeDDMMYY } from "@moose-desk/core/helper/format";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { Customer, CustomerRepository } from "@moose-desk/repo";
import { message, Table } from "antd";
import { SorterResult } from "antd/es/table/interface";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import Pagination from "src/components/UI/Pagination/Pagination";
import env from "src/core/env";
import {
  ListTicketCustomerFilter,
  TicketCustomerResponse,
} from "src/modules/customer/helper/interface";
import styles from "./styles.module.scss";
const limit = 10;

interface IProps {
  customerId: string;
}
export const ListTicketCustomer = ({ customerId }: IProps) => {
  const navigate = useNavigate();
  const [querySearch, setQuerySearch] = useState<string>("");
  const debounceValue: string = useDebounce(querySearch, 500);
  const [filter, setFilter] = useState<ListTicketCustomerFilter>({
    limit,
    page: 1,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });
  const [dataSource, setDataSource]: any = useState();
  const {
    run: fetListTicketCustomer,
    processing,
    cancel,
  } = useJob((customerId: string, filter: ListTicketCustomerFilter) => {
    return CustomerRepository()
      .getListTicket(customerId, filter)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setDataSource(data);
          } else {
            message.error("Get data ticket customer failed");
          }
        })
      );
  });
  useEffect(() => {
    fetListTicketCustomer(customerId, { ...filter, query: debounceValue });
    return () => {
      cancel();
    };
  }, [customerId, filter, debounceValue]);
  const memoDataSource = useMemo(() => {
    const data = dataSource?.data;
    return data;
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
      render: (data: string) => <div>{formatTimeDDMMYY(data)}</div>,
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
          {data
            ? formatTimeDDMMYY(data)
            : formatTimeDDMMYY(record?.createdDatetime)}
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
    [setFilter]
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
          loading={processing}
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
          total={dataSource?.metadata.totalCount}
          pageSize={filter.limit ?? env.DEFAULT_PAGE_SIZE}
          onChange={handleChangePage}
        />
      </section>
      {/* </section> */}
    </div>
  );
};
