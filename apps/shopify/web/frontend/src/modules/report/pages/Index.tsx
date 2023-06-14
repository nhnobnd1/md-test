import { MediaScreen, PageComponent } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { LegacyCard, SkeletonBodyText, Text } from "@shopify/polaris";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueries } from "react-query";
import MDDatePicker from "src/components/DatePicker/MDDatePicker";
import useGlobalData from "src/hooks/useGlobalData";
import useScreenType from "src/hooks/useScreenType";
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
import { formatDefaultTimeRangePicker } from "src/modules/report/helper/format";
import styles from "./styles.module.scss";
dayjs.extend(timezone);
interface ReportIndexPageProps {}
enum ChartReportData {
  SUMMARY = 0,
  SUPPORT_VOLUME = 1,
  RESOLUTION_TIME = 2,
  FIRST_RESPONSE_TIME = 3,
}
const ReportIndexPage: PageComponent<ReportIndexPageProps> = () => {
  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(true, subDomain || "");
  const [screenType, screenWidth] = useScreenType();
  const isMobile = Boolean(screenWidth < MediaScreen.MD);
  const [filter, setFilter] = useState({
    startTime: "",
    endTime: "",
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
  const loadingStatus = useMemo(() => {
    const loadingArray = queries?.map((dataItem: any) => {
      return dataItem?.isLoading;
    });
    return loadingArray;
  }, [queries]);
  const handleSubmitDate = useCallback(
    (date: { start: Date; end: Date }) => {
      const startDate = dayjs(date.start, "MM/DD/YYYY")
        .startOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
      const endDate = dayjs(date.end, "MM/DD/YYYY")
        .endOf("days")
        .format("YYYY-MM-DD HH:mm:ss");
      setFilter({
        startTime: String(dayjs.tz(startDate, timezone).unix()),
        endTime: String(dayjs.tz(endDate, timezone).unix()),
      });
    },
    [timezone]
  );
  return (
    <section className="page-wrap">
      <div className={styles.wrapTop}>
        <Text variant="headingLg" as="h1">
          Reporting
        </Text>
        <div
          className={styles.groupFilter}
          style={!isMobile ? { marginBottom: 0 } : {}}
        >
          {/* <div className={styles.dateTime}> */}
          <MDDatePicker
            defaultRangeTime={{
              start: formatDefaultTimeRangePicker(filter.startTime, timezone),
              end: formatDefaultTimeRangePicker(filter.endTime, timezone),
            }}
            onSubmitTime={handleSubmitDate}
            datePickerClassName={styles.datePickerCustomer}
          />
          {/* </div> */}
        </div>
        <div className={styles.statistic}>
          <Statistic
            data={memoData[ChartReportData.SUMMARY]}
            loading={loadingStatus[ChartReportData.SUMMARY]}
          />
        </div>
      </div>
      <div className={styles.chartBlock}>
        <LegacyCard title="Support Volume" sectioned>
          {loadingStatus[ChartReportData.SUPPORT_VOLUME] ? (
            <SkeletonBodyText lines={5} />
          ) : (
            <div className={styles.wrapChart}>
              <ChartSupportVolume
                data={memoData[ChartReportData.SUPPORT_VOLUME]}
              />
            </div>
          )}
        </LegacyCard>
      </div>
      <div className={styles.chartBlock}>
        <LegacyCard title="Resolution Time (Median)" sectioned>
          {loadingStatus[ChartReportData.RESOLUTION_TIME] ? (
            <SkeletonBodyText lines={5} />
          ) : (
            <div className={styles.wrapChart}>
              <ChartResolutionTime
                data={memoData[ChartReportData.RESOLUTION_TIME]}
              />
            </div>
          )}
        </LegacyCard>
      </div>
      <div className={styles.chartBlock}>
        <LegacyCard title="First Response Time (Median)" sectioned>
          {loadingStatus[ChartReportData.FIRST_RESPONSE_TIME] ? (
            <SkeletonBodyText lines={5} />
          ) : (
            <div className={styles.wrapChart}>
              <ChartFirstResponseTime
                data={memoData[ChartReportData.FIRST_RESPONSE_TIME]}
              />
            </div>
          )}
        </LegacyCard>
      </div>
      {/* </div> */}
    </section>
  );
};

export default ReportIndexPage;
