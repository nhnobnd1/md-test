import { Collapsible, Icon } from "@shopify/polaris";
import { ChevronDownMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import React, { ReactNode, useCallback, useState } from "react";
import styles from "./styles.module.scss";
interface IProps {
  title: string;
  children: ReactNode;
}
const CollapseOnMobile = ({ title, children }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  return (
    <div className={styles.toggleWrap}>
      <div onClick={handleToggle}>
        <div
          className={classNames(styles.wrapHeaderToggle, {
            [styles.closeStatus]: !open,
          })}
        >
          <div className={styles.name}>
            <div
              className={classNames(styles.collapseIcon, {
                [styles.collapseIconActive]: open,
              })}
            >
              <Icon source={ChevronDownMinor} />
            </div>

            {title}
          </div>
        </div>
      </div>
      <Collapsible
        open={open}
        id={`basic-collapsible-${title}`}
        transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        {/* <Card sectioned>{children}</Card> */}
        <div className={styles.wrapChildren}>{children}</div>
      </Collapsible>
    </div>
  );
};
export default React.memo(CollapseOnMobile);
