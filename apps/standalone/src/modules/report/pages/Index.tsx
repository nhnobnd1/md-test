import { PageComponent } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { DatePicker } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueries } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import Icon from "src/components/UI/Icon";
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
      enabled: !isAgent && !!filter.startTime && !!filter.endTime,
    },
    {
      queryKey: [QUERY_KEY.REPORT_RESOLUTION_TIME, filter],
      queryFn: () => getResolutionTime(filter),
      enabled: !isAgent && !!filter.startTime && !!filter.endTime,
    },
    {
      queryKey: [QUERY_KEY.REPORT_FIRST_RESPONSE_TIME, filter],
      queryFn: () => getFirstResponseTime(filter),
      enabled: !isAgent && !!filter.startTime && !!filter.endTime,
    },
  ]);
  const memoData = useMemo(() => {
    const convertListDataQueries = queries?.map((dataItem: any) => {
      return dataItem?.data?.data?.data;
    });
    return convertListDataQueries;
  }, [queries]);

  const disabledStartDate = useCallback(
    (current) => {
      return form.getFieldValue("to")
        ? current > form.getFieldValue("to") ||
            current < getTwoWeeksBefore(form.getFieldValue("to"))
        : false;
    },
    [form.getFieldValue("to")]
  );

  const disabledEndDate = useCallback(
    (current) => {
      return form.getFieldValue("from")
        ? current < form.getFieldValue("from") ||
            current > getTwoWeeksAfter(form.getFieldValue("from"))
        : false;
    },
    [form.getFieldValue("from")]
  );
  const handleChangeStartTime = (date: any, values: string) => {
    setFilter((pre) => ({
      ...pre,
      startTime: values
        ? String(convertTimeStamp(date, timezone, "start"))
        : "",
    }));
  };
  const handleChangeEndTime = (date: any, values: string) => {
    setFilter((pre) => ({
      ...pre,
      endTime: values ? String(convertTimeStamp(date, timezone, "end")) : "",
    }));
  };
  return (
    <>
      <Header title="Reporting" />
      <div className={styles.dateWrap}>
        <Form form={form}>
          <div className={styles.groupDatePicker}>
            <span>From:</span>
            <Form.Item name="from" label="">
              <DatePicker
                format={"MM/DD/YYYY"}
                disabledDate={disabledStartDate}
                onChange={handleChangeStartTime}
                suffixIcon={<Icon name="calendar" />}
                size={isMobile ? "middle" : "large"}
                // defaultValue={twoWeekAgo}
              />
            </Form.Item>
          </div>
          <div className={styles.groupDatePicker}>
            <span>To:</span>
            <Form.Item name="to" label="">
              <DatePicker
                format={"MM/DD/YYYY"}
                disabledDate={disabledEndDate}
                onChange={handleChangeEndTime}
                suffixIcon={<Icon name="calendar" />}
                size={isMobile ? "middle" : "large"}
                // defaultValue={current}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className={styles.summary}>
        <SummaryBlock
          data={memoData[ChartReportData.SUMMARY] || initialSummary}
        />
      </div>
      <div className={styles.wrapChart}>
        <div className={styles.title}>Support Volume</div>
        <div className="w-full h-[450px]">
          <ChartSupportVolume data={memoData[ChartReportData.SUPPORT_VOLUME]} />
        </div>
      </div>
      <div className={styles.wrapChart}>
        <div className={styles.title}>Resolution Time (Median)</div>
        <div className="w-full h-[450px]">
          <ChartResolutionTime
            data={memoData[ChartReportData.RESOLUTION_TIME]}
          />
        </div>
      </div>
      <div className={styles.wrapChart}>
        <div className={styles.title}>First Response Time (Median)</div>
        <div className="w-full h-[450px]">
          <ChartFirstResponseTime
            data={memoData[ChartReportData.FIRST_RESPONSE_TIME]}
          />
        </div>
      </div>
    </>
  );
};

export default ReportIndexPage;
