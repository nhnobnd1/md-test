import { Activities } from "@moose-desk/repo/dashboard/Dashboard";
import { Button, EmptySearchResult, SkeletonBodyText } from "@shopify/polaris";
import React, { lazy, useState } from "react";
import { useQuery } from "react-query";
import { getActivities } from "src/modules/dashboard/api/api";
import styles from "./styles.module.scss";
const ActivateItem = lazy(
  () => import("src/modules/dashboard/components/ActivateItem")
);
const RecentActivities = React.memo(() => {
  const [page, setPage] = useState({
    page: 1,
    limit: 15,
    sortBy: "performedDatetime",
    sortOrder: -1,
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
        <SkeletonBodyText lines={15} />
      ) : totalItem === 0 ? (
        <EmptySearchResult
          title={"Sorry! There is no records matched with your search criteria"}
          description={"Try changing the filters or search term"}
          withIllustration
        />
      ) : (
        dataActivities?.map((activity: Activities) => (
          <ActivateItem data={activity} key={activity._id} />
        ))
      )}
      <div className={styles.loadMoreButton}>
        <Button
          // size="large"
          disabled={page.limit >= totalItem}
          loading={isFetchingNextPage}
          onClick={handleLoadMore}
          plain
        >
          Load more
        </Button>
      </div>
    </div>
  );
});
export default RecentActivities;
