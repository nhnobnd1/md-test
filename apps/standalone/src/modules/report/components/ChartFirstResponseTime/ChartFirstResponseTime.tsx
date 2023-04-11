import { memo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { convertToLongDate } from "src/modules/report/helper/convert";
import ChartFirstResponseTimeRes from "src/modules/report/helper/interface";

interface ChartFirstResponseTimeProps {
  data: ChartFirstResponseTimeRes[];
}

export const ChartFirstResponseTime = ({
  data,
}: ChartFirstResponseTimeProps) => {
  const chartData = data?.map((item: ChartFirstResponseTimeRes) => {
    return {
      name: convertToLongDate(item?.date),
      time: item?.avgFirstResponseTime,
    };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="time" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartFirstResponseTime);
