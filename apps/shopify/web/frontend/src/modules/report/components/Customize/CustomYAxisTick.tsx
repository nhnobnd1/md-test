export const CustomYAxisTick = ({ x, y, payload }: any) => (
  <text x={x} y={y} textAnchor="middle" dx={-16} fill="#141414">
    {payload.value}
  </text>
);
