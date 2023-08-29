import { Link } from "@moose-desk/core";
import { Activities } from "@moose-desk/repo/dashboard/Dashboard";
import dayjs, { unix } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ACTIVATE_TYPE } from "src/modules/dashboard/helper";
import styles from "./styles.module.scss";
dayjs.extend(relativeTime);

interface IProps {
  data: Activities;
}
// const ActivateItem = React.forwardRef(({ data }: IProps, ref) => {
const ActivateItem = ({ data }: IProps) => {
  const renderName = (isAgent: boolean) => {
    return isAgent ? (
      <span className={styles.name}>{data.performer.name}</span>
    ) : (
      <Link
        to={
          data.performer.id
            ? `/customers/detail?customer=${data.performer.id}`
            : "#"
        } // for checking undefined id when re-build backend
        // className={styles.name}
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
                <Link to={`/ticket/${data.actions.ticketObjectId}`}>
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
                <Link to={`/ticket/${data.actions.ticketObjectId}`}>
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
                <Link to={`/ticket/${data.actions.ticketObjectId}`}>
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
                <Link to={`/ticket/${data.actions.ticketObjectId}`}>
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
  // const content: any = ref ? (
  //   <div className={styles.activateWrap} ref={ref as any}>
  //     {renderTypeTextActivate()}
  //     <div className={styles.timeAgo}>
  //       {moment.unix(data.performedTimestamp).local().fromNow()}
  //     </div>
  //   </div>
  // ) : (
  //   <div className={styles.activateWrap}>
  //     {renderTypeTextActivate()}
  //     <div className={styles.timeAgo}>
  //       {moment.unix(data.performedTimestamp).local().fromNow()}
  //     </div>
  //   </div>
  // );
  return (
    <div className={styles.activateWrap}>
      {renderTypeTextActivate()}
      <div className={styles.timeAgo}>
        {unix(data.performedTimestamp).local().fromNow()}
      </div>
    </div>
  );
};
// });
export default ActivateItem;
