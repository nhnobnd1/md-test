import { Activities } from "@moose-desk/repo/dashboard/Dashboard";
import Link from "antd/es/typography/Link";
import moment from "moment";
import { ACTIVATE_TYPE } from "src/modules/dashboard/helper";
import styles from "./styles.module.scss";
interface IProps {
  data: Activities;
}
export default function ActivateItem({ data }: IProps) {
  const renderName = (isAgent: boolean) => {
    return isAgent ? (
      <span className={styles.name}>{data.performer.name}</span>
    ) : (
      <Link
        href={data.performer.id ? `/customers?id=${data.performer.id}` : "#"} // for checking undefined id when re-build backend
        className={styles.name}
      >
        {data.performer.name}
      </Link>
    );
  };
  const renderTypeTextActivate = () => {
    switch (data.actions.type) {
      case ACTIVATE_TYPE.NEW_TICKET_BY_AGENT:
        return (
          <div className={styles.wrapActive}>
            {renderName(data.performer.isAgent)}{" "}
            <span className={styles.content}>
              created a ticket{" "}
              <span className={styles.ticketTitle}>
                <Link href={`/ticket/${data.actions.ticketObjectId}`}>
                  {data.actions.ticketSubject}
                </Link>
              </span>{" "}
            </span>
          </div>
        );
      case ACTIVATE_TYPE.NEW_TICKET_BY_CUSTOMER:
        return (
          <div className={styles.wrapActive}>
            {renderName(data.performer.isAgent)}{" "}
            <span className={styles.content}>
              raised a new ticket{" "}
              <span className={styles.ticketTitle}>
                <Link href={`/ticket/${data.actions.ticketObjectId}`}>
                  {data.actions.ticketSubject}
                </Link>
              </span>{" "}
            </span>
          </div>
        );
      case ACTIVATE_TYPE.NEW_REPLY_BY_AGENT:
        return (
          <div className={styles.wrapActive}>
            {renderName(data.performer.isAgent)}{" "}
            <span className={styles.content}>
              has sent a response to the ticket{" "}
              <span className={styles.ticketTitle}>
                <Link href={`/ticket/${data.actions.ticketObjectId}`}>
                  {data.actions.ticketSubject}
                </Link>
              </span>{" "}
            </span>
          </div>
        );
      case ACTIVATE_TYPE.NEW_REPLY_BY_CUSTOMER:
        return (
          <div className={styles.wrapActive}>
            {renderName(data.performer.isAgent)}{" "}
            <span className={styles.content}>
              has sent an email response to the ticket{" "}
              <span className={styles.ticketTitle}>
                <Link href={`/ticket/${data.actions.ticketObjectId}`}>
                  {data.actions.ticketSubject}
                </Link>
              </span>{" "}
            </span>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className={styles.activateWrap}>
      {renderTypeTextActivate()}
      <div className={styles.timeAgo}>
        {moment.unix(data.performedTimestamp).local().fromNow()}
      </div>
    </div>
  );
}
