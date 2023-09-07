import classNames from "classnames";
import DetailTicketFormBeta from "src/modules/ticket/components/DetailTicketForm/DetailTicketFormBeta";
import styles from "./styles.module.scss";

const DetailTicket = () => {
  return (
    <section className={classNames(styles.container)}>
      <div className={classNames(styles.wrapContent, "flex-1")}>
        <DetailTicketFormBeta />
      </div>
    </section>
  );
};

export default DetailTicket;
