import { PageComponent } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { formatTimeStamp } from "@moose-desk/core/helper/format";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { DatePicker } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useQueries } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import { usePermission } from "src/hooks/usePerrmisson";
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
  const { timezone } = useGlobalData();
  const [filter, setFilter] = useState({
    startTime: "",
    endTime: "",
  });
  const { isAgent } = usePermission();
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
            current <= getTwoWeeksBefore(form.getFieldValue("to"))
        : false;
    },
    [form.getFieldValue("to")]
  );

  const disabledEndDate = useCallback(
    (current) => {
      return form.getFieldValue("from")
        ? current < form.getFieldValue("from") ||
            current >= getTwoWeeksAfter(form.getFieldValue("from"))
        : false;
    },
    [form.getFieldValue("from")]
  );
  const handleChangeStartTime = (_: any, values: string) => {
    setFilter((pre) => ({
      ...pre,
      startTime: values
        ? String(formatTimeStamp(values, "DD/MM/YYYY", timezone))
        : "",
    }));
  };
  const handleChangeEndTime = (_: any, values: string) => {
    setFilter((pre) => ({
      ...pre,
      endTime: values
        ? String(formatTimeStamp(values, "DD/MM/YYYY", timezone))
        : "",
    }));
  };
  return (
    <>
      <Header title="Reporting" />
      <Form onValuesChange={() => {}} form={form} layout="inline">
        <Form.Item name="from" label="From">
          <DatePicker
            format={"DD/MM/YYYY"}
            placeholder="dd/mm/yyyy"
            disabledDate={disabledStartDate}
            onChange={handleChangeStartTime}
          />
        </Form.Item>
        <Form.Item name="to" label="To">
          <DatePicker
            format={"DD/MM/YYYY"}
            placeholder="dd/mm/yyyy"
            disabledDate={disabledEndDate}
            onChange={handleChangeEndTime}
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
          Resolution Time (median)
        </div>
        <div className="w-full h-[450px]">
          <ChartResolutionTime
            data={memoData[ChartReportData.RESOLUTION_TIME]}
          />
        </div>
      </div>
      <div className="wrap-chart">
        <div className="title text-lg font-semibold mb-6">
          First Response Time (median)
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
