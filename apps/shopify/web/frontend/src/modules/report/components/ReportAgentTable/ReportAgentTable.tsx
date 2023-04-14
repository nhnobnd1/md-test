import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { DataTable } from "@shopify/polaris";
import { useMemo, useState } from "react";
import { MDTextField } from "src/components/Input/TextFieldPassword/MDTextField";
import { Pagination } from "src/components/Pagination";
import styles from "./styles.module.scss";

import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useQuery } from "react-query";
import env from "src/core/env";
import { getListAgent } from "src/modules/report/api/api";
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
    startTime: rangeTime.startTime,
    endTime: rangeTime.endTime,
    query: "",
  });
  const [querySearch, setQuerySearch] = useState<string>("");
  const debounceValue: string = useDebounce(querySearch, 500);

  const { data: listAgentData, isFetching } = useQuery({
    queryKey: [QUERY_KEY.LIST_AGENT, filterData, rangeTime, debounceValue],
    queryFn: () =>
      getListAgent({
        ...{ ...filterData, query: debounceValue },
        ...rangeTime,
      }),
    keepPreviousData: true,
  });
  const memoChartData = useMemo(() => {
    const convertData = (listAgentData as any)?.data?.data || [];
    return convertData;
  }, [listAgentData]);

  console.log(memoChartData, "memoChartData");
  const handleSearchInput = (value: string) => {
    setQuerySearch(value);
  };
  const handleChangePage = (page: number) =>
    setFilterData((val) => {
      return { ...val, page };
    });
  const rows = [
    ["Emerald Silk Gown", 1, 124689, 140],
    ["Mauve Cashmere Scarf", 20, 124533, 83],
    ["Mauve Cashmere Scarf", 20, 124533, 83],
  ];
  const handleSortTable = (
    headingIndex: number,
    direction: "ascending" | "descending" | "none"
  ) => {
    console.log(headingIndex, direction);
  };
  return (
    <div>
      <div className={styles.search}>
        <MDTextField
          value={querySearch}
          type="search"
          onChange={handleSearchInput}
        />
      </div>
      <DataTable
        columnContentTypes={["text", "numeric", "numeric", "numeric"]}
        headings={[
          "Agent Name",
          "Ticket Assigned",
          "Tickets Closed",
          "Percentage (Resolved)",
        ]}
        rows={rows}
        sortable={[true, true, true, true]}
        onSort={handleSortTable}
      />
      <div className={styles.wrapPagination}>
        <Pagination
          total={10}
          pageSize={filterData.limit ?? 0}
          currentPage={filterData.page}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default ReportAgentTable;
