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
import ChartResolutionTimeRes from "src/modules/report/helper/interface";
interface ChartResolutionTimeProps {
  data: ChartResolutionTimeRes[];
}

export const ChartResolutionTime = ({ data }: ChartResolutionTimeProps) => {
  const chartData: any[] = data?.map((item: ChartResolutionTimeRes) => {
    return {
      name: formatTimeDDMMYY(item?.date),
      time: item?.avgResolutionTicket,
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
  // const maxYValue = useMemo(() => {
  //   const convertChartDataToNumberArray = chartData?.map(
  //     (data) => data?.time || 0
  //   );
  //   return Math.max(...convertChartDataToNumberArray);
  // }, [chartData]);
  const maxYValue = useMemo(() => {
    const listTime: any = data?.map(
      (item: ChartResolutionTimeRes) => item.avgResolutionTicket
    );
    return Math.max(...(listTime || [0, 0]));
  }, [chartData]);

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
        <Area type="monotone" dataKey="time" stroke="#4DD0E1" fill="#4DD0E1" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartResolutionTime);
