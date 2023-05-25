import { PageComponent } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import {
  Card,
  DataTable,
  EmptySearchResult,
  Loading,
  Page,
} from "@shopify/polaris";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import MDDatePicker from "src/components/DatePicker/MDDatePicker";
import { MDTextField } from "src/components/Input/TextFieldPassword/MDTextField";
import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getReportByTags } from "src/modules/report/api/api";
import {
  getTimeFilterDefault,
  getTwoWeeksAfter,
  getTwoWeeksBefore,
} from "src/modules/report/helper/convert";
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
const headings = ["Tag", "Total Tickets", "Percentage", "Percentage Closed"];
const listSort = ["tagName", "totalTicket", "percentage", "percentageClosed"];
export const ByTags: PageComponent<ByTagsProps> = () => {
  const dateRef: any = useRef(null);

  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");
  const { current, twoWeekAgo } = getTimeFilterDefault();

  const [filterData, setFilterData] = useState<ITableFilter | any>({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
    startTime: "",
    endTime: "",
  });
  const [timeDisable, setTimeDisable] = useState<any>({
    start: dayjs().subtract(2, "weeks").startOf("day"),
    end: dayjs().endOf("day"),
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
  const [querySearch, setQuerySearch] = useState<string>("");
  const debounceValue: string = useDebounce(querySearch, 500);

  const { data: listReportTags, isFetching } = useQuery({
    queryKey: [QUERY_KEY.REPORT_BY_TAGS, filterData, debounceValue],
    queryFn: () => getReportByTags({ ...filterData, query: debounceValue }),
    keepPreviousData: true,
    enabled: !!filterData.startTime && !!filterData.endTime,
  });
  const memoChartData = useMemo(() => {
    const convertData = (listReportTags as any)?.data?.data || [];
    const rows = convertData?.map((item: any) => {
      return [
        item?.tagName,
        item?.totalTicket,
        item?.percentage,
        item?.percentageClosed,
      ];
    });
    return rows;
  }, [listReportTags]);

  const handleSearchInput = (value: string) => {
    setQuerySearch(value);
  };
  // const onPagination = useCallback(
  //   ({ page, limit }: { page: number; limit: number }) => {
  //     setFilterData((value: any) => {
  //       return {
  //         ...value,
  //         page,
  //         limit,
  //       };
  //     });
  //   },
  //   []
  // );
  // const disabledStartDate = useCallback(
  //   (current) => {
  //     return form.getFieldValue("to")
  //       ? current > form.getFieldValue("to")
  //       : false;
  //   },
  //   [form.getFieldValue("to")]
  // );

  // const disabledEndDate = useCallback(
  //   (current) => {
  //     return form.getFieldValue("from")
  //       ? current < form.getFieldValue("from")
  //       : false;
  //   },
  //   [form.getFieldValue("from")]
  // );
  const handleChangePage = (page: number) =>
    setFilterData((val: any) => {
      return { ...val, page };
    });

  const handleSortTable = (
    headingIndex: number,
    direction: "ascending" | "descending" | "none"
  ) => {
    setFilterData((pre: any) => ({
      ...pre,
      sortBy: listSort[headingIndex],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
  const handleChangeStartDate = (value: string) => {
    const date = dayjs(value, "MM/DD/YYYY")
      .startOf("days")
      .format("YYYY-MM-DD HH:mm:ss");

    if (dayjs(date) > timeDisable.end) {
      dateRef?.current?.clearValue();
      setTimeDisable((pre: any) => ({
        end: undefined,
        start: dayjs(date),
      }));
      setFilterData((pre: any) => ({
        endTime: "",
        startTime: String(dayjs.tz(date, timezone).unix()),
      }));
      return;
    }
    setFilterData((pre: any) => ({
      ...pre,
      startTime: String(dayjs.tz(date, timezone).unix()),
    }));
    setTimeDisable((pre: any) => ({ ...pre, start: dayjs(date) }));
  };
  const handleChangeEndDate = useCallback((value: string) => {
    const date = dayjs(value, "MM/DD/YYYY")
      .endOf("days")
      .format("YYYY-MM-DD HH:mm:ss");
    setFilterData((pre: any) => ({
      ...pre,
      endTime: String(dayjs.tz(date, timezone).unix()),
    }));
    setTimeDisable((pre: any) => ({ ...pre, end: dayjs(date) }));
  }, []);
  return (
    <Page title="By Tags" compactTitle fullWidth>
      <Card>
        <div className="px-4 pt-4 pb-2">
          <div className={styles.groupFilter}>
            <div className={styles.dateTime}>
              <MDDatePicker
                type="start"
                onDateChange={handleChangeStartDate}
                datePickerClassName={styles.datePickerCustomer}
                disableDatesBefore={getTwoWeeksBefore(
                  timeDisable.end?.toDate()
                ).toDate()}
                // disableDatesAfter={timeDisable.end.toDate()}
                // multiMonth
                // allowRange
              />
              <MDDatePicker
                ref={dateRef}
                type="end"
                onDateChange={handleChangeEndDate}
                datePickerClassName={styles.datePickerCustomer}
                containerClassName={styles.endDateBlock}
                disableDatesBefore={timeDisable.start.toDate()}
                disableDatesAfter={getTwoWeeksAfter(
                  timeDisable.start.toDate()
                ).toDate()}
                // multiMonth
                // allowRange
              />
            </div>
            <div className={styles.search}>
              <MDTextField
                value={querySearch}
                type="search"
                onChange={handleSearchInput}
              />
            </div>
          </div>
          <div>
            {isFetching && <Loading />}
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
                headings={headings}
                rows={memoChartData}
                sortable={[true, true, true, true]}
                onSort={handleSortTable}
              />
            )}
            <div className={styles.wrapPagination}>
              <Pagination
                total={10}
                pageSize={filterData.limit || 10}
                currentPage={filterData.page || 1}
                onChangePage={handleChangePage}
              />
            </div>
          </div>
        </div>
      </Card>
    </Page>
  );
};

export default ByTags;
