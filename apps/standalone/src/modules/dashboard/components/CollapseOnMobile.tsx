import { Collapse } from "antd";
import { RecentActivities } from "src/modules/dashboard/components/RecentActivities";
import { TodoList } from "src/modules/dashboard/components/TodoList";
import styles from "./styles.module.scss";
export const CollapseOnMobile = () => {
  const { Panel } = Collapse;

  return (
    <div className={styles.wrapCollapse}>
      <Collapse>
        <Panel header="Recent Activities" key="1">
          <RecentActivities />
        </Panel>
        <Panel header="To do List" key="2">
          <TodoList />
        </Panel>
      </Collapse>
    </div>
  );
};
