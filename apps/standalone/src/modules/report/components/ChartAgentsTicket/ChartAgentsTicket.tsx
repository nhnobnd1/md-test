import { formatTimeDDMMYY } from "@moose-desk/core/helper/format";
import { memo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTopFiveRes from "src/modules/report/helper/interface";
interface ChartAgentsTicketProps {
  data: ChartTopFiveRes[];
}
const defaultEmptyAgent = [
  {
    agentObjectId: "emptyId",
    totalTicket: 0,
    agentFirstName: "first name",
    agentLastName: "last name",
  },
];
const LIST_CHART_ITEM_COLOR = [
  "#1e88e5",
  "#fb8c00",
  "#9e9e9e",
  "#ffeb3b",
  "#29b6f6",
];
const ChartAgentsTicket = ({ data }: ChartAgentsTicketProps) => {
  const convertTopFiveAgents = data?.map(
    (item: ChartTopFiveRes) => item?.agentClosed
  );
  const topFiveAgents = convertTopFiveAgents?.shift() || [];
  const convertAgentsForChartData = topFiveAgents?.map((agent: any) => {
    return {
      [agent.agentObjectId]: agent.totalTicket,
    };
  });
  const chartData = data?.map((item: any) => {
    return Object.assign(
      {},
      { name: formatTimeDDMMYY(item?.date) },
      ...convertAgentsForChartData
    );
  });
  const _renderListBarChart = () => {
    if (topFiveAgents?.length === 0) return null;
    return topFiveAgents?.map((agent: any, index) => (
      <Bar
        key={`bar-${index}`}
        name={`${agent.agentFirstName} ${agent.agentLastName}`}
        dataKey={agent.agentObjectId}
        fill={LIST_CHART_ITEM_COLOR[index]}
      />
    ));
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {_renderListBarChart()}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartAgentsTicket);
