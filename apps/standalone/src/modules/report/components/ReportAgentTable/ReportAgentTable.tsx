import { useNavigate, usePrevious } from "@moose-desk/core";
import { GetListUserGroupRequest } from "@moose-desk/repo";
import { Input, Table, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import Pagination from "src/components/UI/Pagination/Pagination";
import env from "src/core/env";

interface ReportAgentTableProps {}

export const ReportAgentTable = (props: ReportAgentTableProps) => {
  const [agentReports, setAgentReports] = useState<any[]>([]);
  const navigate = useNavigate();
  const defaultFilter: () => GetListUserGroupRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });

  const [filterData, setFilterData] = useState<any>(defaultFilter);
  const [meta, setMeta] = useState<any>();

  const prevFilter = usePrevious<any>(filterData);

  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      // getListDebounce(filterData);
    } else {
      // getListCustomerApi(filterData);
    }
  }, [filterData]);

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

  const handleDelete = useCallback((record: any) => {
    //  deleteGroupApi(record._id);
  }, []);

  return (
    <>
      <div className="search mb-6">
        <Input.Search
          placeholder="Search"
          enterButton
          allowClear
          onSearch={(searchText: string) => {
            setFilterData((value: any) => {
              return {
                ...value,
                query: searchText,
                page: 1,
              };
            });
          }}
        />
      </div>
      <div>
        <Table
          dataSource={agentReports}
          // loading={loadingList}
          onChange={onChangeTable}
        >
          <Table.Column
            key="name"
            title="Agent name"
            render={(_, record: any) => (
              <span
                className="cursor-pointer hover:underline hover:text-blue-500"
                // onClick={() =>
                //   navigate(
                //     generatePath(GroupRoutePaths.Detail, { id: record._id })
                //   )
                // }
              >
                {record.name}
              </span>
            )}
            sorter={{
              compare: (a: any, b: any) => a.name - b.name,
            }}
          />
          <Table.Column
            key="ticketAssigned"
            title="Ticket Assigned"
            dataIndex="ticketAssigned"
            sorter={{
              compare: (a: any, b: any) => a.name - b.name,
            }}
          />
          <Table.Column
            key="ticketClosed"
            title="Ticket Closed"
            dataIndex="ticketAssigned"
            sorter={{
              compare: (a: any, b: any) => a.name - b.name,
            }}
          />
          <Table.Column
            key="percentage"
            title="Percentage (Resolved)"
            dataIndex="percentage"
            sorter={{
              compare: (a: any, b: any) => a.name - b.name,
            }}
          />
        </Table>
        {meta?.totalCount && meta ? (
          <Pagination
            className="mt-4 flex justify-end"
            currentPage={filterData.page ?? 1}
            total={meta?.totalCount}
            pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
            onChange={onPagination}
          />
        ) : null}
      </div>
    </>
  );
};

export default ReportAgentTable;
