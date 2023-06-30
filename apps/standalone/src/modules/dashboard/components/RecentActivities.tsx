import { Activities } from "@moose-desk/repo/dashboard/Dashboard";
import { Button } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { getActivities } from "src/modules/dashboard/api/api";
import ActivateItem from "src/modules/dashboard/components/ActivateItem";
import styles from "./styles.module.scss";
export const RecentActivities = () => {
  const [page, setPage] = useState({
    page: 1,
    limit: 15,
  });
  const {
    data: listActivities,
    isLoading,
    isFetching: isFetchingNextPage,
  }: any = useQuery({
    queryKey: ["dashboardActivities", page],
    queryFn: () => getActivities(page),
    keepPreviousData: true,
  });
  const totalItem = listActivities?.data?.metadata?.totalCount;
  const dataActivities = listActivities?.data?.data;
  const handleLoadMore = () => {
    setPage((pre) => ({ ...pre, limit: pre.limit + 10 }));
  };
  return (
    <div className={styles.wrapActivities}>
      {isLoading ? (
        <MDSkeleton lines={15} />
      ) : (
        dataActivities?.map((activity: Activities) => (
          <ActivateItem data={activity} key={activity._id} />
        ))
      )}
      <Button
        size="large"
        className={styles.loadMoreButton}
        disabled={page.limit >= totalItem}
        loading={isFetchingNextPage}
        onClick={handleLoadMore}
      >
        Load more
      </Button>
    </div>
  );
};
