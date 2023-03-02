import { Card, Statistic as AntStatistic } from "antd";
import "./Statistic.scss";

export interface StatisticProps {}

export const Statistic = (props: StatisticProps) => {
  return (
    <div className="Statistic grid grid-cols-5 gap-x-4">
      <div className="col-span-1">
        <Card className="card-statistic" bordered={true}>
          <AntStatistic title="Tickets Created" value={45} />
        </Card>
      </div>
      <div className="col-span-1">
        <Card className="card-statistic" bordered={true}>
          <AntStatistic title="Tickets Replied" value={26} />
        </Card>
      </div>
      <div className="col-span-1">
        <Card className="card-statistic" bordered={true}>
          <AntStatistic title="Tickets Closed" value={20} />
        </Card>
      </div>
      <div className="col-span-1">
        <Card className="card-statistic" bordered={true}>
          <AntStatistic title="First ResponseTime" value={"36m"} />
        </Card>
      </div>
      <div className="col-span-1">
        <Card className="card-statistic" bordered={true}>
          <AntStatistic title="Resolution Time" value={"1h15m"} />
        </Card>
      </div>
    </div>
  );
};

export default Statistic;
