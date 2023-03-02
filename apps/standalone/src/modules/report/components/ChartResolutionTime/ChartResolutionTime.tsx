import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartResolutionTimeProps {}

export const ChartResolutionTime = (props: ChartResolutionTimeProps) => {
  const data = [
    {
      name: "Dec 27th",
      uv: 4000,
    },
    {
      name: "Dec 28th",
      uv: 3000,
    },
    {
      name: "Dec 29th",
      uv: 2000,
    },
    {
      name: "Dec 30th",
      uv: 2780,
    },
    {
      name: "Dec 31st",
      uv: 1890,
    },
    {
      name: "Jan 1st",
      uv: 2390,
    },
    {
      name: "Jan 2nd",
      uv: 3490,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartResolutionTime;
