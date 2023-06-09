import { PageComponent, useToggle } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import {
  Button,
  Card,
  EmptySearchResult,
  IndexTable,
  Loading,
  Text,
} from "@shopify/polaris";
import { MobileBackArrowMajor, SearchMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { useQuery } from "react-query";
import MDDatePicker from "src/components/DatePicker/MDDatePicker";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search/Search";
import { SkeletonTable } from "src/components/Skelaton/SkeletonTable";
import env from "src/core/env";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getReportByTags } from "src/modules/report/api/api";
import { formatDefaultTimeRangePicker } from "src/modules/report/helper/format";
import styles from "./styles.module.scss";

interface ByTagsProps {}
interface ITableFilter {
  page: number;
  limit: number;
  query?: string;
  sortBy?: string;
  sortOrder?: number;
  startTime: string;
  endTime: string;
}
const resourceName = {
  singular: "byTag",
  plural: "byTag",
};
const listSort = ["tagName", "totalTicket", "percentage", "percentageClosed"];
export const ByTags: PageComponent<ByTagsProps> = () => {
  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");
  const { state: isSearch, toggle: onToggleSearch } = useToggle(false);
  const [filterData, setFilterData] = useState<ITableFilter | any>({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
    startTime: "",
    endTime: "",
  });
  useEffect(() => {
    if (!timezone) return;
    setFilterData((pre: any) => ({
      ...pre,
      startTime: String(
        dayjs().tz(timezone).subtract(2, "weeks").startOf("day").unix()
      ),
      endTime: String(dayjs().tz(timezone).endOf("day").unix()),
    }));
  }, [timezone]);
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );

  const {
    data: listReportTags,
    isFetching,
    isLoading,
  }: any = useQuery({
    queryKey: [QUERY_KEY.REPORT_BY_TAGS, filterData],
    queryFn: () => getReportByTags(filterData),
    keepPreviousData: true,
    enabled: !!filterData.startTime && !!filterData.endTime,
  });
  const memoData = useMemo(() => {
    return listReportTags?.data;
  }, [listReportTags]);
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
  const handleSearchInput = (value: string) => {
    setFilterData((pre: any) => ({ ...pre, query: value }));
  };

  const handleChangePage = (page: number) =>
    setFilterData((val: any) => {
      return { ...val, page };
    });

  const handleSubmitDate = useCallback(
    (date: { start: Date; end: Date }) => {
      const startDate = dayjs(date.start, "MM/DD/YYYY")
        .startOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
      const endDate = dayjs(date.end, "MM/DD/YYYY")
        .endOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
      setFilterData({
        startTime: String(dayjs.tz(startDate, timezone).unix()),
        endTime: String(dayjs.tz(endDate, timezone).unix()),
      });
    },
    [timezone]
  );
  const rowMarkup = memoData?.data?.map((records: any, index: number) => (
    <IndexTable.Row id={records?._id} key={records?._id} position={index}>
      <IndexTable.Cell className="py-3">{records?.tagName}</IndexTable.Cell>
      <IndexTable.Cell className="py-3">{records?.totalTicket}</IndexTable.Cell>
      <IndexTable.Cell className="py-3">{records?.percentage}</IndexTable.Cell>
      <IndexTable.Cell className="py-3">
        {records?.percentageClosed}
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <section className="page-wrap">
      {isSearch ? (
        <div className={styles.groupSearchOnMobile}>
          <Button icon={MobileBackArrowMajor} onClick={onToggleSearch}></Button>
          <div className={styles.searchOnMobile}>
            <Search onTypeSearch={handleSearchInput} />
          </div>
        </div>
      ) : (
        <div
          className={classNames(styles.groupTopTable, {
            "align-start": !isMobile,
          })}
        >
          <div>
            <Text variant="headingLg" as="h1">
              By Tags
            </Text>
          </div>
          <div className="d-flex align-center">
            {isMobile ? (
              <div className={styles.buttonSearch}>
                <Button icon={SearchMinor} onClick={onToggleSearch}></Button>
              </div>
            ) : (
              <div className={styles.search}>
                <Search onTypeSearch={handleSearchInput} />
              </div>
            )}
            <div className={styles.dateTime}>
              <MDDatePicker
                defaultRangeTime={{
                  start: formatDefaultTimeRangePicker(
                    filterData.startTime,
                    timezone
                  ),

                  end: formatDefaultTimeRangePicker(
                    filterData.endTime,
                    timezone
                  ),
                }}
                onSubmitTime={handleSubmitDate}
                datePickerClassName={styles.datePickerCustomer}
              />
            </div>
          </div>
        </div>
      )}
      {isFetching && <Loading />}

      {isLoading ? (
        <SkeletonTable rowsCount={5} columnsCount={5} />
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
              { title: "Tag" },
              { title: "Total Tickets" },
              { title: "Percentage" },
              { title: "Percentage Closed" },
            ]}
            sortDirection={direction}
            sortColumnIndex={indexSort}
            onSort={handleSort}
            sortable={[true, true, true, true]}
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
                total={memoData?.metadata ? memoData?.metadata?.totalCount : 1}
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
    </section>
  );
};

export default ByTags;
