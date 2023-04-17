import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { DataTable, EmptySearchResult } from "@shopify/polaris";
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
const listSort = [
  "agentFirstName",
  "ticketAssigned",
  "ticketClosed",
  "percentage",
];

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
    const rows = convertData?.map((item: any) => {
      return [
        item?.agentFirstName + item?.agentLastName,
        item?.ticketAssigned,
        item?.ticketClosed,
        item?.percentage,
      ];
    });
    return rows;
  }, [listAgentData]);

  const handleSearchInput = (value: string) => {
    setQuerySearch(value);
  };
  const handleChangePage = (page: number) =>
    setFilterData((val) => {
      return { ...val, page };
    });

  const handleSortTable = (
    headingIndex: number,
    direction: "ascending" | "descending" | "none"
  ) => {
    setFilterData((pre) => ({
      ...pre,
      sortBy: listSort[headingIndex],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
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
      {!memoChartData?.length ? (
        <div className="mt-3">
          <EmptySearchResult
            title={
              "Sorry! There is no records matched with your search criteria"
            }
            description={"Try changing the filters or search term"}
            withIllustration
          />
        </div>
      ) : (
        <DataTable
          columnContentTypes={["text", "numeric", "numeric", "numeric"]}
          headings={[
            "Agent Name",
            "Ticket Assigned",
            "Tickets Closed",
            "Percentage (Resolved)",
          ]}
          rows={memoChartData}
          sortable={[true, true, true, true]}
          onSort={handleSortTable}
        />
      )}
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
