import { Activities } from "@moose-desk/repo/dashboard/Dashboard";
import { Link } from "@shopify/polaris";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { renderTextContent } from "src/modules/dashboard/helper";
import styles from "./styles.module.scss";

dayjs.extend(relativeTime);

interface IProps {
  data: Activities;
}
const renderName = (isAgent: boolean, id: string, name: string) => {
  return isAgent ? (
    <span className={styles.name}>{name}</span>
  ) : (
    <Link
      url={id ? `/customers/detail?customer=${id}` : "#"} // for checking undefined id when re-build backend
      monochrome
      removeUnderline
    >
      <span className={styles.name}>{name}</span>
    </Link>
  );
};
const ActivateItem = ({ data }: IProps) => {
  const { performer } = data;
  return (
    <div className={styles.activateWrap}>
      <div>
        {renderName(performer.isAgent, performer.id, performer.name)}{" "}
        <span className={styles.content}>
          {renderTextContent(data.actions.type)}
          <span className={styles.ticketTitle}>
            <Link
              removeUnderline
              url={`/ticket/${data.actions.ticketObjectId}`}
            >
              {data.actions.ticketSubject}
            </Link>
          </span>{" "}
        </span>
      </div>
      <div className={styles.timeAgo}>
        {dayjs.unix(data.performedTimestamp).local().fromNow()}
      </div>
    </div>
  );
};
export default React.memo(ActivateItem);
