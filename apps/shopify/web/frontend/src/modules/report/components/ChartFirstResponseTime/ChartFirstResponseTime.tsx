import { formatTimeDDMMYY } from "@moose-desk/core/helper/format";
import { memo, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
  const maxYValue = useMemo(() => {
    const listTime: any = data?.map(
      (item: ChartFirstResponseTimeRes) => item.avgFirstResponseTime
    );
    return Math.max(...(listTime || [0, 0]));
  }, [chartData]);
  // const maxYValue = 0;
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
        <YAxis
          tickFormatter={formatYAxis}
          domain={maxYValue ? [0, maxYValue] : undefined}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="time" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartFirstResponseTime);
