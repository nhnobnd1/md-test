import { memo, useMemo } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "src/modules/report/components/Customize/CustomTooltip";
import { CustomXAxisTick } from "src/modules/report/components/Customize/CustomXAxisTick";
import { CustomYAxisTick } from "src/modules/report/components/Customize/CustomYAxisTick";
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
  "#FA7D00",
  "#2C6ECB",
  "#00A0AC",
  "#458FFF",
  "#D72C0D",
];
const ChartAgentsTicket = ({
  data = defaultEmptyAgent,
}: ChartAgentsTicketProps) => {
  const convertTopFiveAgents =
    data?.map((item: ChartTopFiveRes | any) => item?.agentClosed) || []; // fix eslint report
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
        name={`${agent.agentEmail}`}
        dataKey={agent.agentObjectId}
        fill={LIST_CHART_ITEM_COLOR[index]}
        radius={[2, 2, 0, 0]}
        barSize={16}
      />
    ));
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={memoChartData}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="name"
          color="black"
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {_renderListBarChart()}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartAgentsTicket);
