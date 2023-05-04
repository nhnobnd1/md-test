import { PageComponent } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { DatePicker } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueries } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import {
  getFirstResponseTime,
  getReportSummaryReport,
  getResolutionTime,
  getSupportVolume,
} from "src/modules/report/api/api";
import { ChartFirstResponseTime } from "src/modules/report/components/ChartFirstResponseTime";
import { ChartResolutionTime } from "src/modules/report/components/ChartResolutionTime";
import { ChartSupportVolume } from "src/modules/report/components/ChartSupportVolume";
import { Statistic } from "src/modules/report/components/Statistic";
import {
  convertTimeStamp,
  getTimeFilterDefault,
  getTwoWeeksAfter,
  getTwoWeeksBefore,
} from "src/modules/report/helper/convert";
interface ReportIndexPageProps {}
enum ChartReportData {
  SUMMARY = 0,
  SUPPORT_VOLUME = 1,
  RESOLUTION_TIME = 2,
  FIRST_RESPONSE_TIME = 3,
}
const ReportIndexPage: PageComponent<ReportIndexPageProps> = () => {
  const [form] = Form.useForm();
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const { isAgent } = usePermission();
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
      <Form form={form} layout="inline">
        <Form.Item name="from" label="From">
          <DatePicker
            format={"MM/DD/YYYY"}
            disabledDate={disabledStartDate}
            onChange={handleChangeStartTime}
            // defaultValue={twoWeekAgo}
          />
        </Form.Item>
        <Form.Item name="to" label="To">
          <DatePicker
            format={"MM/DD/YYYY"}
            disabledDate={disabledEndDate}
            onChange={handleChangeEndTime}
            // defaultValue={current}
          />
        </Form.Item>
      </Form>
      <div className="card-statistic mb-8">
        <Statistic data={memoData[ChartReportData.SUMMARY]} />
      </div>
      <div className="wrap-chart mb-[40px]">
        <div className="title text-lg font-semibold mb-6">Support Volume</div>
        <div className="w-full h-[450px]">
          <ChartSupportVolume data={memoData[ChartReportData.SUPPORT_VOLUME]} />
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
    </>
  );
};

export default ReportIndexPage;
