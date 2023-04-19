import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { DatePicker } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import { usePermission } from "src/hooks/usePerrmisson";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getReportTopFive } from "src/modules/report/api/api";
import ChartAgentsTicket from "src/modules/report/components/ChartAgentsTicket/ChartAgentsTicket";
import { ReportAgentTable } from "src/modules/report/components/ReportAgentTable";
import {
  convertTimeStamp,
  getTimeFilterDefault,
  getTwoWeeksAfter,
  getTwoWeeksBefore,
} from "src/modules/report/helper/convert";
interface ByAgentPageProps {}
enum DataAgent {
  TOP_FIVE = 0,
  LIST_AGENT = 1,
}
const ByAgentPage = (props: ByAgentPageProps) => {
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
  const { data: reportTopFiveData } = useQuery({
    queryKey: [QUERY_KEY.REPORT_TOP_FIVE, filter],
    queryFn: () => getReportTopFive(filter),
    keepPreviousData: true,
    enabled: !isAgent && !!filter.startTime && !!filter.endTime,
  });
  const memoChartData = useMemo(() => {
    const convertData = (reportTopFiveData as any)?.data?.data;
    return convertData;
  }, [reportTopFiveData]);
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
      <div className="wrap-chart mb-[40px] mt-6">
        <div className="title text-lg font-semibold mb-6">
          Ticket closed per agent per day (Top 5 Agents)
        </div>
        <div className="w-full h-[450px]">
          <ChartAgentsTicket data={memoChartData} />
        </div>
      </div>

      <div>
        <div className="title text-lg font-semibold mb-6">
          Tickets by Agents
        </div>
        <ReportAgentTable rangeTime={filter} />
      </div>
    </>
  );
};

export default ByAgentPage;
