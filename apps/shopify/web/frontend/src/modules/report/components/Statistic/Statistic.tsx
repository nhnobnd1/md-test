import { Grid, Page } from "@shopify/polaris";
import { memo } from "react";
import SkeletonCard from "src/components/Skelaton/SkeletonCard";
import { convertSecondsToHoursMinutes } from "src/modules/report/helper/convert";
import SummaryReportRes from "src/modules/report/helper/interface";
import styles from "./style.module.scss";

export interface StatisticProps {
  data: SummaryReportRes | any;
  loading: boolean;
}
const Statistic = ({ data, loading }: StatisticProps) => {
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
    <div className={styles.statisticContainer}>
      <Page fullWidth>
        <Grid columns={{ xs: 6, sm: 9, md: 9, lg: 15, xl: 15 }}>
          {LIST_SUMMARY.map((block, index) => {
            return (
              <Grid.Cell
                key={index}
                columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
              >
                {loading ? (
                  <SkeletonCard lines={1} />
                ) : (
                  <div className={styles.block}>
                    <p className={styles.title}>{block.title}</p>
                    <p className={styles.value}>{block.value}</p>
                  </div>
                )}
              </Grid.Cell>
            );
          })}
        </Grid>
      </Page>
    </div>
  );
};

export default memo(Statistic);
