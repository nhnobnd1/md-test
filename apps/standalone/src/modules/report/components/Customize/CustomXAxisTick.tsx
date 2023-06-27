export const CustomXAxisTick = ({ x, y, payload }: any) => (
  <text x={x} y={y} textAnchor="middle" dy={16} fill="#141414">
    {payload.value}
  </text>
);
