export const CustomYAxisTick = ({ x, y, payload }: any) => (
  <text x={x} y={y} textAnchor="start" dx={-52} fill="#141414">
    {payload.value}
  </text>
);
