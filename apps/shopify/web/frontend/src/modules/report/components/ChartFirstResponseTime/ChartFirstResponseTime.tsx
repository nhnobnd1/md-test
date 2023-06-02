import { formatTimeDDMMYY } from "@moose-desk/core/helper/format";
import { memo, useMemo } from "react";
import {
  Area,
  AreaChart,
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
      <AreaChart data={chartData}>
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <YAxis
          domain={maxYValue ? [0, maxYValue] : undefined}
          axisLine={false}
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
