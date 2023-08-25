import { formatTimeDDMMYY } from "@moose-desk/core/helper/format";
import { memo } from "react";
import {
  Bar,
  BarChart,
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
import styles from "./style.module.scss";
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

  const CustomLegendIcon = ({ payload }: any) => {
    const { color } = payload;
    return (
      <svg width="16" height="16" radius="2">
        <circle cx="8" cy="8" r="6" fill={color} />
      </svg>
    );
  };

  // const outputArray: OutputObject[] = [];
  // if (data) {
  //   const keys = Object.keys(data[0]).filter((key) => key !== "date");

  //   keys.forEach((key) => {
  //     const datax: any = data?.map((item: ChartSupportVolumeRes | any) => ({
  //       key: item.date,
  //       value: item[key],
  //     }));
  //     let color = "";
  //     if (key === "ticketsCreated") {
  //       color = "red";
  //     }
  //     if (key === "ticketsResponded") {
  //       color = "blue";
  //     }
  //     if (key === "ticketsResolved") {
  //       color = "green";
  //     }
  //     outputArray.push({ name: key, data: datax, color });
  //   });
  // }
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className={styles.supportVolumeChart}
    >
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
          axisLine={false}
          tickLine={false}
          tick={<CustomXAxisTick />}
        />
        <YAxis axisLine={false} tickLine={false} tick={<CustomYAxisTick />} />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
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
          align="center"
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
