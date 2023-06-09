import { Icon, Text } from "@shopify/polaris";
import { EmailMajor, PhoneMajor } from "@shopify/polaris-icons";
import styles from "./style.module.scss";

interface IProps {
  detail: any;
}
export default function OrderOverview({ detail }: IProps) {
  return (
    <>
      <Text as="h2" variant="headingMd">
        {`${detail.first_name} ${detail.last_name}`}
      </Text>
      <div className={styles.cardDetail}>
        <div className={styles.item}>
          <Icon source={EmailMajor} />
          <p className={styles.email}>{detail.email}</p>
        </div>
        <div className={styles.item}>
          <Icon source={PhoneMajor} />
          <p className={styles.phone}>{detail.phone || "Empty phone number"}</p>
        </div>
        <div className={styles.groupBottomItem}>
          <div className={styles.totalOrder}>
            <span className={styles.labels}>Orders: </span>
            <span className={styles.value}>{detail.orders_count}</span>
          </div>
          <div className={styles.totalPrice}>
            <span className={styles.labels}>Amount: </span>
            <span className={styles.value}>
              {detail.total_spent}
              {detail.currency}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
