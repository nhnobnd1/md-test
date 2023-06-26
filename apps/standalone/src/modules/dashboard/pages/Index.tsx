import { MediaScreen, PageComponent } from "@moose-desk/core";
import Icon from "src/components/UI/Icon";
import useViewport from "src/hooks/useViewport";
import { CollapseOnMobile } from "src/modules/dashboard/components/CollapseOnMobile";
import { RecentActivities } from "src/modules/dashboard/components/RecentActivities";
import { Summary } from "src/modules/dashboard/components/Summary";
import { TodoList } from "src/modules/dashboard/components/TodoList";
import styles from "./style.module.scss";
interface DashboardIndexPageProps {}

const DashboardIndexPage: PageComponent<DashboardIndexPageProps> = () => {
  const { isMobile } = useViewport(MediaScreen.MD);
  return (
    // <LayoutPageContent title="Dashboard" onlyScreen>
    <div>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <div className={styles.topBlock}>
        <Summary />
      </div>
      <div className={styles.bottomBlock}>
        {isMobile ? (
          <CollapseOnMobile />
        ) : (
          <>
            <div className={styles.block}>
              <div className={styles.title}>
                <Icon name="activities" /> <span>Recent Activities</span>
              </div>
              <RecentActivities />
            </div>
            <div className={styles.block}>
              <div className={styles.title}>
                <Icon name="todo" />
                <span>To do List</span>
              </div>
              <TodoList />
            </div>
          </>
        )}
      </div>
    </div>
    // </LayoutPageContent>
  );
};

export default DashboardIndexPage;
