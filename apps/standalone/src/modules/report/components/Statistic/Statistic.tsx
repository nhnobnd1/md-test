import { GetSummaryResponse } from "@moose-desk/repo/dashboard/Dashboard";
import { memo } from "react";

import "./Statistic.scss";

export interface StatisticProps {
  data: GetSummaryResponse;
}
export const Statistic = ({ data }: StatisticProps) => {
  console.log(data);
  return (
    <></>
    // <SummaryBlock data={data} />
    // <div className="Statistic grid grid-cols-5 gap-x-4">
    //   {LIST_SUMMARY.map((block, index) => {
    //     return (
    //       <div key={index} className="col-span-1">
    //         <Card className="card-statistic" bordered={true}>
    //           <AntStatistic title={block.title} value={block.value} />
    //         </Card>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default memo(Statistic);
