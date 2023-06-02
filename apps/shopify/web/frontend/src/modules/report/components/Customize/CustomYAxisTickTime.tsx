import { convertSecondsToHoursMinutes } from "src/modules/report/helper/convert";

export const CustomYAxisTickTime = ({ x, y, payload }: any) => {
  const formatYAxis = (tickItem: number) => {
    return `${convertSecondsToHoursMinutes(tickItem)}`;
  };
  return (
    <text x={x} y={y} textAnchor="middle" dx={-16} fill="#141414">
      {formatYAxis(payload.value)}
    </text>
  );
};
