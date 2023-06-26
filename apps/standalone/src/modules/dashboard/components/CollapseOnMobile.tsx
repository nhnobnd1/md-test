import { Collapse } from "antd";
import Icon from "src/components/UI/Icon";
import { RecentActivities } from "src/modules/dashboard/components/RecentActivities";
import { TodoList } from "src/modules/dashboard/components/TodoList";
import styles from "./styles.module.scss";
export const CollapseOnMobile = () => {
  const { Panel } = Collapse;

  return (
    <div className={styles.wrapCollapse}>
      <Collapse expandIconPosition="end">
        <Panel
          header={
            <div className={styles.title}>
              <Icon name="activities" /> <span>Recent Activities</span>
            </div>
          }
          key="1"
        >
          <RecentActivities />
        </Panel>
        <Panel
          header={
            <div className={styles.title}>
              <Icon name="todo" />
              <span>To do List</span>
            </div>
          }
          key="2"
        >
          <TodoList />
        </Panel>
      </Collapse>
    </div>
  );
};
