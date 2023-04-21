import { Card, Statistic as AntStatistic } from "antd";
import { convertSecondsToHoursMinutes } from "src/modules/report/helper/convert";
import SummaryReportRes from "src/modules/report/helper/interface";

import "./Statistic.scss";

export interface StatisticProps {
  data: SummaryReportRes;
}
export const Statistic = ({ data }: StatisticProps) => {
  const LIST_SUMMARY = [
    { title: "Tickets Created", value: data?.ticketCreatedCount },
    { title: "Tickets Replied", value: data?.ticketRepliedCount },
    { title: "Tickets Closed", value: data?.ticketClosedCount },
    {
      title: "First ResponseTime",
      value: convertSecondsToHoursMinutes(data?.avgFirstResponseTime || 0),
    },
    {
      title: "Resolution Time",
      value: convertSecondsToHoursMinutes(data?.avgResolutionTime || 0),
    },
  ];
  return (
    <div className="Statistic grid grid-cols-5 gap-x-4">
      {LIST_SUMMARY.map((block, index) => {
        return (
          <div key={index} className="col-span-1">
            <Card className="card-statistic" bordered={true}>
              <AntStatistic title={block.title} value={block.value} />
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Statistic;
