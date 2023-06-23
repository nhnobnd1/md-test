import { MediaScreen, PageComponent } from "@moose-desk/core";
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
              <div className={styles.title}>Recent Activities</div>
              <RecentActivities />
            </div>
            <div className={styles.block}>
              <div className={styles.title}>To do List</div>
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
