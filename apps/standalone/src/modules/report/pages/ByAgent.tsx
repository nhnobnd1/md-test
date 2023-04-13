import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import {
  formatTimeByTimezone,
  formatTimeStamp,
} from "@moose-desk/core/helper/format";
import useTimezone from "@moose-desk/core/hooks/useTimezone";
import { DatePicker } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import { getReportTopFive } from "src/modules/report/api/api";
import ChartAgentsTicket from "src/modules/report/components/ChartAgentsTicket/ChartAgentsTicket";
import { ReportAgentTable } from "src/modules/report/components/ReportAgentTable";

interface ByAgentPageProps {}
enum DataAgent {
  TOP_FIVE = 0,
  LIST_AGENT = 1,
}
const ByAgentPage = (props: ByAgentPageProps) => {
  const [form] = Form.useForm();
  const { timezone } = useTimezone(true);
  const { startOfMonth, endOfMonth } = formatTimeByTimezone(timezone);
  const [filter, setFilter] = useState({
    startTime: String(startOfMonth),
    endTime: String(endOfMonth),
  });
  const { data: reportTopFiveData } = useQuery({
    queryKey: [QUERY_KEY.REPORT_TOP_FIVE, filter],
    queryFn: () => getReportTopFive(filter),
    keepPreviousData: true,
  });
  const memoChartData = useMemo(() => {
    const convertData = (reportTopFiveData as any)?.data?.data;
    return convertData;
  }, [reportTopFiveData]);
  const disabledStartDate = useCallback(
    (current) => {
      return form.getFieldValue("to")
        ? current > form.getFieldValue("to")
        : false;
    },
    [form.getFieldValue("to")]
  );

  const disabledEndDate = useCallback(
    (current) => {
      return form.getFieldValue("from")
        ? current < form.getFieldValue("from")
        : false;
    },
    [form.getFieldValue("from")]
  );
  const handleChangeStartTime = (_: any, values: string) => {
    setFilter((pre) => ({
      ...pre,
      startTime: String(
        formatTimeStamp(values, "DD/MM/YYYY", timezone) || startOfMonth
      ),
    }));
  };
  const handleChangeEndTime = (_: any, values: string) => {
    setFilter((pre) => ({
      ...pre,
      endTime: String(
        formatTimeStamp(values, "DD/MM/YYYY", timezone) || endOfMonth
      ),
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
