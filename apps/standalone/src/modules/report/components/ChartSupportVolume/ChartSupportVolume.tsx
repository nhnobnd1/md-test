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
import { CustomTooltip } from "src/modules/report/components/Customize/CustomTooltip";
import { CustomXAxisTick } from "src/modules/report/components/Customize/CustomXAxisTick";
import { CustomYAxisTick } from "src/modules/report/components/Customize/CustomYAxisTick";
import ChartSupportVolumeRes from "src/modules/report/helper/interface";
interface ChartSupportVolumeProps {
  data: ChartSupportVolumeRes[];
}

export const ChartSupportVolume = ({ data }: ChartSupportVolumeProps) => {
  const chartData = data?.map((item: ChartSupportVolumeRes) => {
    return {
      name: formatTimeDDMMYY(item?.date),
      uv: item?.ticketsCreated,
      pv: item?.ticketsResponded,
      cd: item?.ticketsResolved,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        // width={500}
        height={450}
        barGap={10}
        data={chartData}
        margin={{
          // left: -20,
          // right: -20,
          top: 20,
        }}
      >
        <XAxis
          dataKey="name"
          color="black"
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <CartesianGrid vertical={false} color="#F0F0F0" />
        <YAxis tick={<CustomYAxisTick />} />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          name="Ticket Created"
          dataKey="uv"
          fill="#FA7D00"
          radius={[2, 2, 0, 0]}
          barSize={32}
        />
        <Bar
          name="Ticket Responded"
          dataKey="pv"
          fill="#2C6ECB"
          radius={[2, 2, 0, 0]}
          barSize={32}
        />
        <Bar
          name="Ticket Closed"
          dataKey="cd"
          fill="#D72C0D"
          radius={[2, 2, 0, 0]}
          barSize={32}
        />
        <Legend
          align="left"
          formatter={(value) => (
            <span style={{ color: "#141414" }}>{value}</span>
          )}
          iconSize={16}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartSupportVolume);
