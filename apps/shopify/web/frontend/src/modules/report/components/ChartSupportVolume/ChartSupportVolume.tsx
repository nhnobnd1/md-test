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
        width={500}
        height={400}
        data={chartData}
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
        <Bar
          name="Ticket created"
          dataKey="uv"
          fill="#42A5F5"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          name="Ticket responded"
          dataKey="pv"
          fill="#FFC107"
          radius={[5, 5, 0, 0]}
        />
        <Bar
          name="Ticket Closed"
          dataKey="cd"
          fill="#8E24AA"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartSupportVolume);
