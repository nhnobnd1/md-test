import { Activities } from "@moose-desk/repo/dashboard/Dashboard";
import { Button, Empty } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { getActivities } from "src/modules/dashboard/api/api";
import ActivateItem from "src/modules/dashboard/components/ActivateItem";
import styles from "./styles.module.scss";
export const RecentActivities = () => {
  // const intObserver: any = useRef();

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
  // const lastActiveRef = useCallback(
  //   (item) => {
  //     if (isLoading) return;
  //     if (intObserver.current) intObserver.current.disconnect();
  //     intObserver.current = new IntersectionObserver((items) => {
  //       if (items[0].isIntersecting && page.limit < totalItem) {
  //         // Kiểm tra xem items[0] có phải là giao điểm với khung hình hay không.
  //         handleLoadMore();
  //       }
  //     });
  //     if (item) intObserver.current.observe(item);
  //   },
  //   [isLoading, page.limit, totalItem]
  // );
  return (
    <div className={styles.wrapActivities}>
      {isLoading ? (
        <MDSkeleton lines={15} />
      ) : totalItem === 0 ? (
        <div>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Sorry!, There is no records matched with your search
                  criteria."
          />
        </div>
      ) : (
        dataActivities?.map((activity: Activities, i: number) => {
          // if (dataActivities?.length === i + 1) {
          //   // nếu là phần tử cuối cùng trong page thì gán cho ref
          //   return (
          //     <ActivateItem
          //       ref={lastActiveRef}
          //       data={activity}
          //       key={activity._id}
          //     />
          //   );
          // }
          return <ActivateItem data={activity} key={activity._id} />;
        })
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
