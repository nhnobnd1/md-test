import { formatTimeDDMMYY } from "@moose-desk/core/helper/format";
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
import { CustomXAxisTick } from "src/modules/report/components/Customize/CustomXAxisTick";
import { CustomYAxisTickTime } from "src/modules/report/components/Customize/CustomYAxisTickTime";
import { convertSecondsToHoursMinutes } from "src/modules/report/helper/convert";
import ChartFirstResponseTimeRes from "src/modules/report/helper/interface";

interface ChartFirstResponseTimeProps {
  data: ChartFirstResponseTimeRes[];
}
export const ChartFirstResponseTime = ({
  data,
}: ChartFirstResponseTimeProps) => {
  const chartData: any = data?.map((item: ChartFirstResponseTimeRes) => {
    return {
      name: formatTimeDDMMYY(item?.date),
      time: item?.avgFirstResponseTime,
    };
  });

  const formatYAxis = (tickItem: number) => {
    return `${convertSecondsToHoursMinutes(tickItem)}`;
  };
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="time">{`time: ${convertSecondsToHoursMinutes(
            payload[0].value
          )}`}</p>
        </div>
      );
    }
    return null;
  };

  const listTime: any = data?.map(
    (item: ChartFirstResponseTimeRes) => item.avgFirstResponseTime
  );
  const maxYValue = Math.max(...(listTime || [0, 0]));

  // const maxYValue = 0;
  return (
    <ResponsiveContainer
      className="flex-center justify-center"
      width="100%"
      height="100%"
    >
      <AreaChart
        data={chartData}
        margin={{
          top: 20,
          right: 20,
        }}
      >
        <CartesianGrid vertical={false} color="#F0F0F0" />
        <XAxis dataKey="name" tickLine={false} tick={<CustomXAxisTick />} />
        <YAxis
          domain={maxYValue ? [0, maxYValue] : undefined}
          tickLine={false}
          tick={<CustomYAxisTickTime />}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="time"
          stroke="#FA7D00"
          fill="none"
          strokeWidth={2}
          dot={{ r: 4, fill: "#FA7D00" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartFirstResponseTime);
