import { Card } from "@shopify/polaris";
import { memo } from "react";
import { convertSecondsToHoursMinutes } from "src/modules/report/helper/convert";
import SummaryReportRes from "src/modules/report/helper/interface";

import "./Statistic.scss";

export interface StatisticProps {
  data: SummaryReportRes;
}
export const Statistic = ({ data }: StatisticProps) => {
  const LIST_SUMMARY = [
    { title: "Tickets Created", value: data?.ticketCreatedCount || 0 },
    { title: "Tickets Replied", value: data?.ticketRepliedCount || 0 },
    { title: "Tickets Closed", value: data?.ticketClosedCount || 0 },
    {
      title: "First Response Time",
      value: convertSecondsToHoursMinutes(data?.avgFirstResponseTime || 0),
    },
    {
      title: "Resolution Time",
      value: convertSecondsToHoursMinutes(data?.avgResolutionTime || 0),
    },
  ];
  return (
    <div className="Statistic">
      {LIST_SUMMARY.map((block, index) => {
        return (
          <div key={index} className="block">
            <Card
              title={<div className="text-center">{block.title}</div>}
              sectioned
            >
              <p>{block.value}</p>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Statistic);
