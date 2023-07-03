import { Row } from "antd";
import CountUp from "react-countup";
import Icon from "src/components/UI/Icon";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { convertSecondsToHoursMinutes } from "src/modules/report/helper/convert";
import styles from "./style.module.scss";
interface IProps {
  data: {
    ticketCreatedCount: number;
    ticketRepliedCount: number;
    ticketClosedCount: number;
    avgFirstResponseTime: number;
    avgResolutionTime: number;
  };
  loading?: boolean;
}
export default function SummaryBlock({ data, loading }: IProps) {
  const LIST_BLOCK = [
    {
      labels: "Tickets Created",
      value: data.ticketCreatedCount,
      iconName: "ticketCreated",
    },
    {
      labels: "Tickets Replied",
      value: data.ticketRepliedCount,
      iconName: "ticketReplied",
    },
    {
      labels: "Tickets Closed",
      value: data.ticketClosedCount,
      iconName: "ticketClosed",
    },
    {
      labels: "First Response Time",
      value: data.avgFirstResponseTime,
      iconName: "firstResponseTime",
    },
    {
      labels: "Resolution Time",
      value: data.avgResolutionTime,
      iconName: "resolutionTime",
    },
  ];
  return (
    <Row justify="space-between" wrap>
      {LIST_BLOCK.map((block, index) => (
        // <Col key={index}>
        <div key={index} className={styles.block}>
          <div className={styles.icon}>
            <Icon name={block.iconName} />
          </div>
          <div className={styles.description}>
            <p className={styles.label}>{block.labels}</p>
            <p className={styles.value}>
              {loading ? (
                <MDSkeleton lines={1} width={80} />
              ) : (
                <CountUp
                  end={block.value}
                  start={0}
                  duration={3 + (index + 1) * 0.3}
                  useEasing={true}
                  formattingFn={
                    [3, 4].includes(index)
                      ? convertSecondsToHoursMinutes
                      : undefined
                  }
                />
              )}
            </p>
          </div>
        </div>
        // </Col>
      ))}
    </Row>
  );
}
