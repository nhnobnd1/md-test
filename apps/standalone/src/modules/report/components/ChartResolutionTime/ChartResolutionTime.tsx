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

  const listTime: any = data?.map(
    (item: ChartResolutionTimeRes) => item.avgResolutionTicket
  );
  const maxYValue = Math.max(...(listTime || [0, 0]));

  return (
    <ResponsiveContainer
      className="flex-center justify-center"
      width="100%"
      height="100%"
    >
      <AreaChart
        // width={500}
        // height={400}
        data={chartData}
        margin={{
          right: 20,
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} color="#F0F0F0" />
        <XAxis dataKey="name" tickLine={false} tick={<CustomXAxisTick />} />
        <YAxis
          domain={maxYValue ? [0, maxYValue] : undefined}
          tickLine={false}
          tick={<CustomYAxisTickTime />}
          // tickFormatter={formatYAxis}
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

export default memo(ChartResolutionTime);
