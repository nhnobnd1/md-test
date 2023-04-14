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
        <Bar name="Ticket request" dataKey="uv" fill="#8884d8" />
        <Bar name="Ticket responded" dataKey="pv" fill="#82ca9d" />
        <Bar name="Ticket resolved" dataKey="cd" fill="#e53935" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default memo(ChartSupportVolume);
