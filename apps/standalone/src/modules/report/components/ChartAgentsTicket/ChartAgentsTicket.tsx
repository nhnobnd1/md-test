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

interface ChartAgentsTicketProps {}

const ChartAgentsTicket = (props: ChartAgentsTicketProps) => {
  const data = [
    {
      name: "Dec 27th",
      ab: 35,
      uv: 23,
      pv: 45,
      cd: 36,
      ef: 29,
    },
    {
      name: "Dec 28th",
      ab: 23,
      uv: 38,
      pv: 21,
      cd: 51,
      ef: 22,
    },
    {
      name: "Dec 29th",
      ab: 45,
      uv: 33,
      pv: 32,
      cd: 21,
      ef: 46,
    },
    {
      name: "Dec 30th",
      ab: 36,
      uv: 37,
      pv: 51,
      cd: 30,
      ef: 47,
    },
    {
      name: "Dec 31st",
      ab: 29,
      uv: 21,
      pv: 20,
      cd: 18,
      ef: 11,
    },
    {
      name: "Jan 1st",
      ab: 0,
      uv: 0,
      pv: 0,
      cd: 0,
      ef: 0,
    },
    {
      name: "Jan 2nd",
      ab: 28,
      uv: 26,
      pv: 29,
      cd: 20,
      ef: 19,
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
        <Bar dataKey="ab" fill="#1e88e5" />
        <Bar dataKey="uv" fill="#fb8c00" />
        <Bar dataKey="pv" fill="#9e9e9e" />
        <Bar dataKey="cd" fill="#ffeb3b" />
        <Bar dataKey="ef" fill="#29b6f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartAgentsTicket;
