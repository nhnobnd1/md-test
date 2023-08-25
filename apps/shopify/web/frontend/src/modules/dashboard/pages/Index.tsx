import { MediaScreen } from "@moose-desk/core";
import {
  GetDashboardRequest,
  GetSummaryResponse,
} from "@moose-desk/repo/dashboard/Dashboard";
import { LegacyCard, Text } from "@shopify/polaris";
import { lazy, useEffect, useState } from "react";
import { useQuery } from "react-query";
import useGlobalData from "src/hooks/useGlobalData";
import useScreenType from "src/hooks/useScreenType";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getDashboardSummary } from "src/modules/dashboard/api/api";
import CollapseOnMobile from "src/modules/dashboard/components/CollapseOnMobile";
import { getTimeFilterDefault } from "src/modules/report/helper/convert";
import { onCLS, onFID, onLCP } from "web-vitals";
import styles from "./styles.module.scss";

const RecentActivities = lazy(
  () => import("src/modules/dashboard/components/RecentActivities")
);
const TodoList = lazy(
  () => import("src/modules/dashboard/components/TodoList")
);
const Statistic = lazy(
  () => import("src/modules/report/components/Statistic/Statistic")
);
export default function DashboardIndexPage() {
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [screenType, screenWidth] = useScreenType();
  const isMobileOrTablet = Boolean(screenWidth < MediaScreen.LG);
  const { current, twoWeekAgo } = getTimeFilterDefault();
  const [filter, setFilter] = useState<GetDashboardRequest>({
    startTime: "",
    endTime: "",
  });

  onCLS(console.log);
  onFID(console.log);
  onLCP(console.log);
  useEffect(() => {
    if (!timezone) return;
    setFilter({
      startTime: String(twoWeekAgo?.tz(timezone).startOf("day").unix()),
      endTime: String(current?.tz(timezone).endOf("day").unix()),
    });
  }, [timezone]);
  const { data, isLoading }: any = useQuery({
    queryKey: ["DashboardSummary", filter],
    queryFn: () => getDashboardSummary(filter),
    keepPreviousData: true,
    enabled: !!filter.startTime && !!filter.endTime,
  });

  const summaryData: GetSummaryResponse = data?.data;
  return (
    <section className={styles.pageWrap}>
      <Text variant="headingLg" as="h1">
        Dashboard
      </Text>
      <div className={styles.statistic}>
        <Statistic data={summaryData?.data} loading={isLoading} />
      </div>
      <div className={styles.bottomBlock}>
        <div className={styles.block}>
          {isMobileOrTablet ? (
            <CollapseOnMobile title="Recent Activities">
              <RecentActivities />
            </CollapseOnMobile>
          ) : (
            <LegacyCard title="Recent Activities" sectioned>
              <RecentActivities />
            </LegacyCard>
          )}
        </div>
        <div className={styles.block}>
          {isMobileOrTablet ? (
            <CollapseOnMobile title="Recent Ticket">
              <TodoList />
            </CollapseOnMobile>
          ) : (
            <LegacyCard title="Recent Ticket" sectioned>
              <TodoList />
            </LegacyCard>
          )}
        </div>
      </div>
    </section>
  );
}
