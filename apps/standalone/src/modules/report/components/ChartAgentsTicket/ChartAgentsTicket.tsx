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
import Icon from "src/components/UI/Icon";
import { CustomTooltip } from "src/modules/report/components/Customize/CustomTooltip";
import { CustomXAxisTick } from "src/modules/report/components/Customize/CustomXAxisTick";
import { CustomYAxisTick } from "src/modules/report/components/Customize/CustomYAxisTick";
import ChartTopFiveRes from "src/modules/report/helper/interface";
interface ChartAgentsTicketProps {
  data: ChartTopFiveRes[];
}
const barChartStyle = {
  margin: {
    top: 5,
    right: 30,
    left: 20,
    bottom: 5,
  },
  width: 500,
  height: 400,
};
const LIST_CHART_ITEM_COLOR = [
  "#FF5252",
  "#7E57C2",
  "#00BCD4",
  "#4CAF50",
  "#FFEB3B",
];
const ChartAgentsTicket = ({ data }: ChartAgentsTicketProps) => {
  const convertTopFiveAgents: any =
    data?.map((item: ChartTopFiveRes | any) => item?.agentClosed) || [];

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
  const memoChartData = data?.map((item: any, index: number) => {
    return {
      name: item?.date,
      ...convertListAgent[index],
    };
  });

  const _renderListBarChart = () => {
    if (convertTopFiveAgents?.length === 0) return null;
    return convertTopFiveAgents[0]?.map((agent: any, index: number) => (
      <Bar
        key={`bar-${index}`}
        name={`${agent.agentEmail}`}
        dataKey={agent.agentObjectId}
        fill={LIST_CHART_ITEM_COLOR[index]}
        animationDuration={2000}
        isAnimationActive={true}
      />
    ));
  };
  return (
    <ResponsiveContainer
      className="flex-center justify-center"
      width="100%"
      height="100%"
    >
      {!convertTopFiveAgents[0]?.length ? (
        <div className="text-center">
          <Icon name="emptyChartData" />
          <p className="md_text--secondary">
            Sorry! There is no records matched with your criteria.
          </p>
        </div>
      ) : (
        <BarChart data={memoChartData}>
          <CartesianGrid vertical={false} color="#F0F0F0" />
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
      )}
    </ResponsiveContainer>
  );
};

export default memo(ChartAgentsTicket);
