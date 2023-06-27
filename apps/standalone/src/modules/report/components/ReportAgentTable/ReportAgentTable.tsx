import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { memo, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import env from "src/core/env";
import { usePermission } from "src/hooks/usePerrmisson";
import { getListAgent } from "src/modules/report/api/api";
import ListAgentTableRes from "src/modules/report/helper/interface";
import styles from "../../pages/styles.module.scss";
interface ReportAgentTableProps {
  rangeTime: {
    startTime: string;
    endTime: string;
  };
}
interface ITableFilter {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: number;
  startTime: string;
  endTime: string;
  query: string;
}
export const ReportAgentTable = ({ rangeTime }: ReportAgentTableProps) => {
  const [filterData, setFilterData] = useState<ITableFilter>({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    sortBy: undefined,
    sortOrder: undefined,
    startTime: "",
    endTime: "",
    query: "",
  });
  const { isAgent } = usePermission();

  const { data: listAgentData, isLoading } = useQuery({
    queryKey: [QUERY_KEY.LIST_AGENT, filterData, rangeTime],
    queryFn: () =>
      getListAgent({
        ...filterData,
        ...rangeTime,
      }),
    // keepPreviousData: true,
    enabled: !isAgent && !!rangeTime.startTime && !!rangeTime.endTime,
  });

  const convertData = (listAgentData as any)?.data?.data || [];
  const memoChartData: ListAgentTableRes[] = convertData;
  const columns = [
    {
      title: "Agent Name",
      dataIndex: "agentFirstName",
      width: "30%",
      sorter: {
        compare: (a: any, b: any) => {
          return a.agentFirstName - b.agentFirstName;
        },
      },
      render: (_: any, record: any) => (
        <div>{`${record?.agentFirstName} ${record?.agentLastName}`}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "agentEmail",
      width: "30%",
      sorter: {
        compare: (a: any, b: any) => {
          return a.agentEmail - b.agentEmail;
        },
      },
    },
    {
      title: "Ticket Assigned",
      dataIndex: "ticketAssigned",
      width: "20%",
      sorter: {
        compare: (a: any, b: any) => {
          return a.ticketAssigned - b.ticketAssigned;
        },
      },
    },
    {
      title: "Ticket Closed",
      dataIndex: "ticketClosed",
      sorter: {
        compare: (a: any, b: any) => {
          return a.ticketClosed - b.ticketClosed;
        },
      },
      width: "20%",
    },
    {
      title: "Percentage (Resolved)",
      dataIndex: "percentage",
      sorter: {
        compare: (a: any, b: any) => {
          return a.percentage - b.percentage;
        },
      },
      width: "20%",
    },
  ];
  const onChangeTable = useCallback(
    (_: any, __: any, sorter: SorterResult<any>) => {
      if (sorter.order && sorter.field) {
        setFilterData((pre) => ({
          ...pre,
          sortBy: sorter?.field as string,
          sortOrder: sorter?.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((pre) => ({
          ...pre,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    []
  ) as TableProps<any>["onChange"];
  const handleSearchInput = (query: string) => {
    setFilterData((pre) => ({ ...pre, query }));
  };
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

  return (
    <>
      <div className={styles.wrapTopFilter}>
        <div className={styles.title}>Tickets By Agents</div>
        <div className={styles.searchWrap}>
          <MDSearchInput onTypeSearch={handleSearchInput} />
        </div>
      </div>
      <section>
        <Table
          dataSource={memoChartData}
          columns={columns}
          loading={isLoading}
          onChange={onChangeTable}
          scroll={{ x: 1024 }}
          rowKey={(record) => record}
        />
        <Pagination
          className="mt-4 flex justify-end"
          currentPage={filterData.page ?? 1}
          total={(listAgentData as any)?.data.metadata.totalCount}
          pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
          onChange={onPagination}
        />
      </section>
    </>
  );
};

export default memo(ReportAgentTable);
