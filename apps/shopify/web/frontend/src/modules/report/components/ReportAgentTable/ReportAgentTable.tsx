import {
  Card,
  EmptySearchResult,
  IndexTable,
  Loading,
  Text,
} from "@shopify/polaris";
import { memo, useMemo, useState } from "react";
import { Pagination } from "src/components/Pagination";
import styles from "./styles.module.scss";

import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useQuery } from "react-query";
import { Search } from "src/components/Search/Search";
import { SkeletonTable } from "src/components/Skelaton/SkeletonTable";
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
  "agentEmail",
  "ticketAssigned",
  "ticketClosed",
  "percentage",
];
const resourceName = {
  singular: "agentTable",
  plural: "agentTable",
};
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
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const {
    data: listAgentData,
    isFetching,
    isLoading,
  }: any = useQuery({
    queryKey: [QUERY_KEY.LIST_AGENT, filterData, rangeTime],
    queryFn: () =>
      getListAgent({
        ...filterData,
        ...rangeTime,
      }),
    // keepPreviousData: true,
    enabled: !!rangeTime.startTime && !!rangeTime.endTime,
  });
  const memoData = useMemo(() => {
    return listAgentData?.data;
  }, [listAgentData]);

  const handleSearchInput = (value: string) => {
    setFilterData((pre) => ({ ...pre, query: value }));
  };
  const handleChangePage = (page: number) =>
    setFilterData((val) => {
      return { ...val, page };
    });

  const handleSort = (
    headingIndex: number,
    direction: "descending" | "ascending"
  ) => {
    setIndexSort(Number(headingIndex));
    setDirection(direction);
    setFilterData((pre: any) => ({
      ...pre,
      sortBy: listSort[Number(headingIndex)],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
  const rowMarkup = memoData?.data?.map((records: any, index: number) => (
    <IndexTable.Row id={records?._id} key={records?._id} position={index}>
      <IndexTable.Cell className="py-3">
        {records?.agentFirstName} {records?.agentLastName}
      </IndexTable.Cell>
      <IndexTable.Cell className="py-3">{records?.agentEmail}</IndexTable.Cell>
      <IndexTable.Cell className="py-3">
        {records?.ticketAssigned}
      </IndexTable.Cell>
      <IndexTable.Cell className="py-3">
        {records?.ticketClosed}
      </IndexTable.Cell>
      <IndexTable.Cell className="py-3">{records?.percentage}</IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <div>
      <div className={styles.groupTopTable}>
        <div>
          <Text variant="headingMd" as="h2">
            Tickets by Agents
          </Text>
        </div>
        <div className={styles.search}>
          <Search onTypeSearch={handleSearchInput} />
        </div>
      </div>
      {isFetching && <Loading />}

      <div className={styles.cardTable}>
        {isLoading ? (
          <SkeletonTable rowsCount={4} columnsCount={5} />
        ) : (
          <Card>
            <IndexTable
              resourceName={resourceName}
              itemCount={memoData?.data?.length || 0}
              selectable={false}
              // selectedItemsCount={
              //   allResourcesSelected ? "All" : selectedResources.length
              // }
              // onSelectionChange={handleSelectionChange}
              headings={[
                { title: "Agent Name" },
                { title: "Email" },

                { title: "Tickets Assigned" },
                { title: "Tickets Closed" },
                { title: "Resolved" },
              ]}
              sortDirection={direction}
              sortColumnIndex={indexSort}
              onSort={handleSort}
              sortable={[true, true, true, true, true]}
              // loading={isFetching}
              emptyState={
                <EmptySearchResult
                  title={
                    "Sorry! There is no records matched with your search criteria"
                  }
                  description={"Try changing the filters or search term"}
                  withIllustration
                />
              }
            >
              {rowMarkup}
            </IndexTable>
            {memoData && memoData?.metadata?.totalCount ? (
              <div className="flex items-center justify-center mt-12px pb-12px">
                <Pagination
                  total={
                    memoData?.metadata ? memoData?.metadata?.totalCount : 1
                  }
                  pageSize={filterData.limit ?? 0}
                  currentPage={filterData.page ?? 1}
                  onChangePage={handleChangePage}
                  previousTooltip={"Previous"}
                  nextTooltip={"Next"}
                />
              </div>
            ) : null}
          </Card>
        )}
      </div>
    </div>
  );
};

export default memo(ReportAgentTable);
