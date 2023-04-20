import { memo, useMemo } from "react";
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
  data?: ChartTopFiveRes[];
}
const defaultEmptyAgent: any = [
  {
    agentFirstName: "string",
    agentLastName: "string",
    percentage: 1,
    ticketAssigned: 1,
    ticketClosed: 1,
  },
];
const LIST_CHART_ITEM_COLOR = [
  "#FF5252",
  "#7E57C2",
  "#00BCD4",
  "#4CAF50",
  "#FFEB3B",
];
const ChartAgentsTicket = ({
  data = defaultEmptyAgent,
}: ChartAgentsTicketProps) => {
  const convertTopFiveAgents =
    data?.map((item: ChartTopFiveRes) => item?.agentClosed) || [];
  const memoChartData = useMemo(() => {
    const convertList = data?.map((item: any) => {
      const formatItemInList = item?.agentClosed?.map((agent: any) => {
        return { [agent?.agentObjectId]: agent?.totalTicket };
      });
      return formatItemInList;
    });
    const convertListAgent = convertList?.map((item: any) => {
      if (!item) return [{}];
      return Object.assign({}, ...item);
    });
    return data?.map((item: any, index: number) => {
      return {
        name: item?.date,
        ...convertListAgent[index],
      };
    });
  }, [data]);
  const _renderListBarChart = () => {
    if (convertTopFiveAgents[0]?.length === 0) return null;
    return convertTopFiveAgents[0]?.map((agent: any, index: number) => (
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
        data={memoChartData}
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
