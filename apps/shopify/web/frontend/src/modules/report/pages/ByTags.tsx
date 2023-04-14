import { PageComponent } from "@moose-desk/core";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { Card, DataTable, Page } from "@shopify/polaris";
import { useCallback, useState } from "react";
import MDDatePicker from "src/components/DatePicker/MDDatePicker";
import { MDTextField } from "src/components/Input/TextFieldPassword/MDTextField";
import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
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
export const ByTags: PageComponent<ByTagsProps> = () => {
  // const navigate = useNavigate();
  // const { timezone } = useTimezone();
  // const { startOfMonth, endOfMonth } = formatTimeByTimezone(timezone);
  // const [form] = useForm();
  // const { timezone }: any = useGlobalData();
  // const { startOfMonth, endOfMonth } = formatTimeByTimezone(timezone);
  const [filterData, setFilterData] = useState<ITableFilter>({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
    // startTime: String(startOfMonth),
    // endTime: String(endOfMonth),
    startTime: String(123),
    endTime: String(123),
  });
  const [querySearch, setQuerySearch] = useState<string>("");
  const debounceValue: string = useDebounce(querySearch, 500);

  // const { data: listReportTags, isFetching } = useQuery({
  //   queryKey: [QUERY_KEY.REPORT_BY_TAGS, filterData, debounceValue],
  //   queryFn: () => getReportByTags({ ...filterData, query: debounceValue }),
  //   keepPreviousData: true,
  // });
  // const memoChartData = useMemo(() => {
  //   const convertData = (listReportTags as any)?.data?.data || [];
  //   return convertData;
  // }, [listReportTags]);

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
  // const handleChangeStartTime = (_: any, values: string) => {
  //   setFilterData((pre) => ({
  //     ...pre,
  //     startTime: String(
  //       formatTimeStamp(values, "DD/MM/YYYY", timezone) || startOfMonth
  //     ),
  //   }));
  // };
  // const handleChangeEndTime = (_: any, values: string) => {
  //   setFilterData((pre) => ({
  //     ...pre,
  //     endTime: String(
  //       formatTimeStamp(values, "DD/MM/YYYY", timezone) || endOfMonth
  //     ),
  //   }));
  // };
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
  const handleChangeStartDate = useCallback(
    (value: { start: Date; end: Date }) => {
      // setFilterData((pre) => ({
      //   ...pre,
      //   startTime: String(convertTimeStamp(value.start, timezone)),
      // }));
    },
    []
  );
  const handleChangeEndDate = useCallback(
    (value: { start: Date; end: Date }) => {
      // setFilterData((pre) => ({
      //   ...pre,
      //   endTime: String(convertTimeStamp(value.end, timezone)),
      // }));
    },
    []
  );
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
                // multiMonth
                // allowRange
              />
              <MDDatePicker
                type="end"
                onDateChange={handleChangeEndDate}
                datePickerClassName={styles.datePickerCustomer}
                containerClassName={styles.endDateBlock}
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
            <DataTable
              columnContentTypes={["text", "numeric", "numeric", "numeric"]}
              headings={[
                "Tag",
                "Total Tickets",
                "Percentage",
                "Percentage Closed",
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
        </div>
      </Card>
    </Page>
  );
};

export default ByTags;
