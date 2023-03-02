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

interface ChartSupportVolumeProps {}

export const ChartSupportVolume = (props: ChartSupportVolumeProps) => {
  const data = [
    {
      name: "Dec 27th",
      uv: 4000,
      pv: 2400,
      cd: 2400,
    },
    {
      name: "Dec 28th",
      uv: 3000,
      pv: 1398,
      cd: 2210,
    },
    {
      name: "Dec 29th",
      uv: 2000,
      pv: 9800,
      cd: 2290,
    },
    {
      name: "Dec 30th",
      uv: 2780,
      pv: 3908,
      cd: 2000,
    },
    {
      name: "Dec 31st",
      uv: 1890,
      pv: 4800,
      cd: 2181,
    },
    {
      name: "Jan 1st",
      uv: 2390,
      pv: 3800,
      cd: 2500,
    },
    {
      name: "Jan 2nd",
      uv: 3490,
      pv: 4300,
      cd: 2100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={400}
        data={data}
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
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
        <Bar dataKey="cd" fill="#e53935" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartSupportVolume;
