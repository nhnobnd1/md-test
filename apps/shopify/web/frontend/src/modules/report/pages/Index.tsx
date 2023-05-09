import { PageComponent } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Card, Page } from "@shopify/polaris";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueries } from "react-query";
import MDDatePicker from "src/components/DatePicker/MDDatePicker";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import {
  getFirstResponseTime,
  getReportSummaryReport,
  getResolutionTime,
  getSupportVolume,
} from "src/modules/report/api/api";
import ChartFirstResponseTime from "src/modules/report/components/ChartFirstResponseTime/ChartFirstResponseTime";
import ChartResolutionTime from "src/modules/report/components/ChartResolutionTime/ChartResolutionTime";
import ChartSupportVolume from "src/modules/report/components/ChartSupportVolume/ChartSupportVolume";
import Statistic from "src/modules/report/components/Statistic/Statistic";
import {
  getTwoWeeksAfter,
  getTwoWeeksBefore,
} from "src/modules/report/helper/convert";
import styles from "./styles.module.scss";
interface ReportIndexPageProps {}
enum ChartReportData {
  SUMMARY = 0,
  SUPPORT_VOLUME = 1,
  RESOLUTION_TIME = 2,
  FIRST_RESPONSE_TIME = 3,
}
const ReportIndexPage: PageComponent<ReportIndexPageProps> = () => {
  const dateRef: any = useRef(null);
  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");
  const [filter, setFilter] = useState({
    startTime: "",
    endTime: "",
  });
  const [timeDisable, setTimeDisable] = useState<any>({
    start: dayjs().subtract(2, "weeks").startOf("day"),
    end: dayjs().endOf("day"),
  });
  useEffect(() => {
    if (!timezone) return;
    setFilter({
      startTime: String(
        dayjs().tz(timezone).subtract(2, "weeks").startOf("day").unix()
      ),
      endTime: String(dayjs().tz(timezone).endOf("day").unix()),
    });
  }, [timezone]);
  const queries = useQueries([
    {
      queryKey: [QUERY_KEY.SUMMARY, filter],
      queryFn: () => getReportSummaryReport(filter),
      keepPreviousData: true,
      enabled: !!filter.startTime && !!filter.endTime,
    },
    {
      queryKey: [QUERY_KEY.REPORT_SUPPORT_VOLUME, filter],
      queryFn: () => getSupportVolume(filter),
      keepPreviousData: true,
      enabled: !!filter.startTime && !!filter.endTime,
    },
    {
      queryKey: [QUERY_KEY.REPORT_RESOLUTION_TIME, filter],
      queryFn: () => getResolutionTime(filter),
      keepPreviousData: true,

      enabled: !!filter.startTime && !!filter.endTime,
    },
    {
      queryKey: [QUERY_KEY.REPORT_FIRST_RESPONSE_TIME, filter],
      queryFn: () => getFirstResponseTime(filter),
      keepPreviousData: true,

      enabled: !!filter.startTime && !!filter.endTime,
    },
  ]);
  const memoData = useMemo(() => {
    const convertListDataQueries = queries?.map((dataItem: any) => {
      return dataItem?.data?.data?.data;
    });
    return convertListDataQueries;
  }, [queries]);

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
      setFilter((pre) => ({
        endTime: "",
        startTime: String(dayjs.tz(date, timezone).unix()),
      }));
      return;
    }
    setFilter((pre) => ({
      ...pre,
      startTime: String(dayjs.tz(date, timezone).unix()),
    }));
    setTimeDisable((pre: any) => ({ ...pre, start: dayjs(date) }));
  };
  const handleChangeEndDate = useCallback((value: string) => {
    const date = dayjs(value, "MM/DD/YYYY")
      .endOf("days")
      .format("YYYY-MM-DD HH:mm:ss");
    setFilter((pre) => ({
      ...pre,
      endTime: String(dayjs.tz(date, timezone).unix()),
    }));
    setTimeDisable((pre: any) => ({ ...pre, end: dayjs(date) }));
  }, []);
  return (
    <Page title="Reporting" compactTitle fullWidth>
      <Card>
        <div className="px-4 pt-4 pb-2">
          <div className={styles.groupFilter}>
            <div className={styles.dateTime}>
              <MDDatePicker
                type="start"
                onDateChange={handleChangeStartDate}
                datePickerClassName={styles.datePickerCustomer}
                disableDatesBefore={
                  timeDisable.end &&
                  getTwoWeeksBefore(timeDisable.end?.toDate()).toDate()
                }
                // disableDatesAfter={timeDisable.end.toDate()}
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
              />
            </div>
          </div>
          <div className="card-statistic mb-8">
            <Statistic data={memoData[ChartReportData.SUMMARY]} />
          </div>
          <div className="wrap-chart mb-[40px]">
            <div className="title text-lg font-semibold mb-6">
              Support Volume
            </div>
            <div className="w-full h-[450px]">
              <ChartSupportVolume
                data={memoData[ChartReportData.SUPPORT_VOLUME]}
              />
            </div>
          </div>
          <div className="wrap-chart mb-[50px]">
            <div className="title text-lg font-semibold mb-6">
              Resolution Time (Median)
            </div>
            <div className="w-full h-[450px]">
              <ChartResolutionTime
                data={memoData[ChartReportData.RESOLUTION_TIME]}
              />
            </div>
          </div>
          <div className="wrap-chart">
            <div className="title text-lg font-semibold mb-6">
              First Response Time (Median)
            </div>
            <div className="w-full h-[450px]">
              <ChartFirstResponseTime
                data={memoData[ChartReportData.FIRST_RESPONSE_TIME]}
              />
            </div>
          </div>
        </div>
      </Card>
    </Page>
  );
};

export default ReportIndexPage;
