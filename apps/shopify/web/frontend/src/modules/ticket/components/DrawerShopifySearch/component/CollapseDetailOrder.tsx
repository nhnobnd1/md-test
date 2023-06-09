import { Collapsible, Icon, TextContainer } from "@shopify/polaris";
import { CaretDownMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { DetailOrderCustomer } from "src/modules/ticket/components/DrawerShopifySearch/DetailOrderCustomer";
import styles from "./style.module.scss";
interface IProps {
  order: any;
  uniqueIndex: number;
}
const CollapseDetailOrder = ({ order, uniqueIndex }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  return (
    <div className={styles.toggleWrap}>
      <div onClick={handleToggle}>
        <div className="d-flex align-center justify-between">
          <div className={styles.name}>
            <div
              className={classNames(styles.collapseIcon, {
                [styles.collapseIconActive]: open,
              })}
            >
              <Icon source={CaretDownMinor} color="warning" />
            </div>

            {order?.name}
          </div>
          <p className={styles.price}>
            {order?.total}
            {order?.currency}
          </p>
        </div>
      </div>
      <Collapsible
        open={open}
        id={`basic-collapsible-${uniqueIndex}`}
        transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        <TextContainer>
          <DetailOrderCustomer dataOrder={order} />
        </TextContainer>
      </Collapsible>
    </div>
  );
};
export default React.memo(CollapseDetailOrder);
