import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./style.module.scss";

interface IProps {
  title?: string;
  action?: ReactNode;
  onlyScreen?: boolean;
  children: ReactNode | any;
  mainLayout?: boolean;
}
export default function LayoutPageContent({
  title,
  action,
  children,
  onlyScreen = false,
  mainLayout = false,
}: IProps) {
  return (
    <section
      className={classNames(styles.container, {
        [styles.onlyScreen]: onlyScreen,
      })}
    >
      <div className={styles.groupTopPage}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {action && <div className={styles.actionWrap}>{action}</div>}
      </div>
      {mainLayout ? (
        <div className={styles.mainContent}>{children}</div>
      ) : (
        <>{children}</>
      )}
    </section>
  );
}
