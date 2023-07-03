import { InfoCircleTwoTone } from "@ant-design/icons";
import { PageComponent } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Tooltip } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueries } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import MDRangePicker from "src/components/UI/MDRangePicker/MDRangePicker";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import SummaryBlock from "src/components/UI/SummaryBlock/SummaryBlock";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import useViewport from "src/hooks/useViewport";
import {
  getFirstResponseTime,
  getReportSummaryReport,
  getResolutionTime,
  getSupportVolume,
} from "src/modules/report/api/api";
import { ChartFirstResponseTime } from "src/modules/report/components/ChartFirstResponseTime";
import { ChartResolutionTime } from "src/modules/report/components/ChartResolutionTime";
import { ChartSupportVolume } from "src/modules/report/components/ChartSupportVolume";
import {
  convertTimeStamp,
  getTimeFilterDefault,
} from "src/modules/report/helper/convert";
import styles from "./styles.module.scss";
interface ReportIndexPageProps {}
enum ChartReportData {
  SUMMARY = 0,
  SUPPORT_VOLUME = 1,
  RESOLUTION_TIME = 2,
  FIRST_RESPONSE_TIME = 3,
}
const initialSummary = {
  ticketCreatedCount: 0,
  ticketRepliedCount: 0,
  ticketClosedCount: 0,
  avgFirstResponseTime: 0,
  avgResolutionTime: 0,
};
const ReportIndexPage: PageComponent<ReportIndexPageProps> = () => {
  const [form] = Form.useForm();
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const { isAgent } = usePermission();
  const { isMobile } = useViewport();
  const { current, twoWeekAgo } = getTimeFilterDefault();
  const [filter, setFilter] = useState({
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (!timezone) return;
    form.setFieldsValue({
      to: current?.tz(timezone),
      from: twoWeekAgo?.tz(timezone),
    });
    setFilter({
      startTime: String(twoWeekAgo?.tz(timezone).startOf("day").unix()),
      endTime: String(current?.tz(timezone).endOf("day").unix()),
    });
  }, [timezone]);
  const queries = useQueries([
    {
      queryKey: [QUERY_KEY.SUMMARY, filter],
      queryFn: () => getReportSummaryReport(filter),
      keepPreviousData: true,
      enabled: !isAgent && !!filter.startTime && !!filter.endTime,
    },
    {
      queryKey: [QUERY_KEY.REPORT_SUPPORT_VOLUME, filter],
      queryFn: () => getSupportVolume(filter),
      keepPreviousData: true,
      enabled: !isAgent && !!filter.startTime && !!filter.endTime,
    },
    {
      queryKey: [QUERY_KEY.REPORT_RESOLUTION_TIME, filter],
      queryFn: () => getResolutionTime(filter),
      keepPreviousData: true,
      enabled: !isAgent && !!filter.startTime && !!filter.endTime,
    },
    {
      queryKey: [QUERY_KEY.REPORT_FIRST_RESPONSE_TIME, filter],
      queryFn: () => getFirstResponseTime(filter),
      keepPreviousData: true,
      enabled: !isAgent && !!filter.startTime && !!filter.endTime,
    },
  ]);
  const memoData = useMemo(() => {
    const convertListDataQueries = queries?.map((dataItem: any) => {
      return dataItem?.data?.data?.data;
    });
    return convertListDataQueries;
  }, [queries]);

  // const disabledStartDate = useCallback(
  //   (current) => {
  //     return form.getFieldValue("to")
  //       ? current > form.getFieldValue("to") ||
  //           current < getTwoWeeksBefore(form.getFieldValue("to"))
  //       : false;
  //   },
  //   [form.getFieldValue("to")]
  // );
  // const disabledEndDate = useCallback(
  //   (current) => {
  //     return form.getFieldValue("from")
  //       ? current < form.getFieldValue("from") ||
  //           current > getTwoWeeksAfter(form.getFieldValue("from"))
  //       : false;
  //   },
  //   [form.getFieldValue("from")]
  // );
  // const handleChangeStartTime = (date: any, values: string) => {
  //   if (!values) {
  //     form.setFieldsValue({ to: null });
  //     setFilter({
  //       endTime: "",
  //       startTime: "",
  //     });
  //     return;
  //   }

  //   setFilter((pre) => ({
  //     ...pre,
  //     startTime: values
  //       ? String(convertTimeStamp(date, timezone, "start"))
  //       : "",
  //   }));
  // };
  // const handleChangeEndTime = (date: any, values: string) => {
  //   // el?.focus();
  //   if (!values) {
  //     form.setFieldsValue({ from: null });
  //     setFilter({
  //       endTime: "",
  //       startTime: "",
  //     });
  //     return;
  //   }
  //   setFilter((pre) => ({
  //     ...pre,
  //     endTime: values ? String(convertTimeStamp(date, timezone, "end")) : "",
  //   }));
  // };
  const handleChangeTime = useCallback(
    (dates: any) => {
      if (!dates) {
        setFilter({
          endTime: "",
          startTime: "",
        });
      } else {
        setFilter({
          startTime: String(convertTimeStamp(dates[0], timezone, "start")),
          endTime: String(convertTimeStamp(dates[1], timezone, "end")),
        });
      }
    },
    [timezone]
  );
  return (
    <>
      <Header title="Reporting" />
      <div className={styles.dateWrap}>
        <div className={styles.groupDatePicker}>
          <MDRangePicker onFilterChange={handleChangeTime} />
          <Tooltip title="Please select a maximum time period of 14 days (counting from the start date)">
            <div className={styles.infoPicker}>
              <InfoCircleTwoTone twoToneColor="#FA7D00" />
            </div>
          </Tooltip>
        </div>
      </div>
      <div className={styles.summary}>
        <SummaryBlock
          data={memoData[ChartReportData.SUMMARY] || initialSummary}
          loading={queries[ChartReportData.SUMMARY].isLoading}
        />
      </div>
      <div className={styles.wrapChart}>
        <div className={styles.title}>Support Volume</div>
        <div className="w-full h-[450px]">
          {queries[ChartReportData.SUPPORT_VOLUME].isLoading ? (
            <MDSkeleton lines={10} />
          ) : (
            <ChartSupportVolume
              data={memoData[ChartReportData.SUPPORT_VOLUME]}
            />
          )}
        </div>
      </div>
      <div className={styles.wrapChart}>
        <div className={styles.title}>Resolution Time (Median)</div>
        <div className="w-full h-[450px]">
          {queries[ChartReportData.RESOLUTION_TIME].isLoading ? (
            <MDSkeleton lines={10} />
          ) : (
            <ChartResolutionTime
              data={memoData[ChartReportData.RESOLUTION_TIME]}
            />
          )}
        </div>
      </div>
      <div className={styles.wrapChart}>
        <div className={styles.title}>First Response Time (Median)</div>
        <div className="w-full h-[450px]">
          {queries[ChartReportData.FIRST_RESPONSE_TIME].isLoading ? (
            <MDSkeleton lines={10} />
          ) : (
            <ChartFirstResponseTime
              data={memoData[ChartReportData.FIRST_RESPONSE_TIME]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ReportIndexPage;
