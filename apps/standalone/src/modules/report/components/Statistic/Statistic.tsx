import { Card, Statistic as AntStatistic } from "antd";

export interface StatisticProps {}

export const Statistic = (props: StatisticProps) => {
  return (
    <div className="grid grid-cols-5 gap-x-4">
      <div className="col-span-1">
        <Card bordered={false}>
          <AntStatistic
            title="Tickets Created"
            value={11.28}
            precision={2}
            suffix="%"
          />
        </Card>
      </div>
      <div className="col-span-1">
        <Card bordered={false}>
          <AntStatistic
            title="Tickets Replied"
            value={9.3}
            precision={2}
            suffix="%"
          />
        </Card>
      </div>
      <div className="col-span-1">
        <Card bordered={false}>
          <AntStatistic
            title="Tickets Closed"
            value={9.3}
            precision={2}
            suffix="%"
          />
        </Card>
      </div>
      <div className="col-span-1">
        <Card bordered={false}>
          <AntStatistic
            title="First ResponseTime"
            value={9.3}
            precision={2}
            suffix="%"
          />
        </Card>
      </div>
      <div className="col-span-1">
        <Card bordered={false}>
          <AntStatistic
            title="Resolution Time"
            value={9.3}
            precision={2}
            suffix="%"
          />
        </Card>
      </div>
    </div>
  );
};

export default Statistic;
