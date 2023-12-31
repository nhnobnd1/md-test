import { Link } from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Ticket } from "@moose-desk/repo";
import { Button, Empty } from "antd";
import classNames from "classnames";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { Table } from "src/components/UI/Table";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getTodoList } from "src/modules/dashboard/api/api";
import styles from "./styles.module.scss";

export const TodoList = () => {
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [page, setPage] = useState({
    page: 1,
    limit: 15,
  });
  const {
    data: todoList,
    isLoading,
    isFetching: isFetchingNextPage,
  }: any = useQuery({
    queryKey: ["dashboardTodoList", page],
    queryFn: () => getTodoList(page),
    keepPreviousData: true,
  });
  const totalItem = todoList?.data?.metadata?.totalCount;
  const handleLoadMore = () => {
    setPage((pre) => ({ ...pre, limit: pre.limit + 10 }));
  };
  const columns = [
    {
      title: "Ticket ID",
      dataIndex: "ticketId",
      key: "ticketId",
      render: (_: string, record: Ticket) => (
        <Link
          className={classNames(styles.actionLink, "one-line")}
          to={`/ticket/${record._id}`}
        >
          {record.ticketId}
        </Link>
      ),
      width: "15%",
    },
    {
      title: "Ticket Title",
      dataIndex: "subject",
      key: "subject",
      render: (_: string, record: Ticket) => (
        <Link
          className={classNames(styles.actionLink, "one-line")}
          to={`/ticket/${record._id}`}
        >{`${record.subject}`}</Link>
      ),
      width: "50%",
    },

    {
      title: "Date Requested",
      dataIndex: "updatedDatetime",
      key: "updatedDatetime",
      render: (_: string, record: any) => (
        <div>
          {/* {createdDatetimeFormat(record.updatedDatetime, timezone)} */}
          {moment(record.updatedDatetime).local().fromNow()}
        </div>
      ),
      width: "35%",
    },
  ];
  return (
    <div className={styles.wrapTodoList}>
      {isLoading ? (
        <MDSkeleton lines={15} />
      ) : todoList?.data?.data?.length === 0 ? (
        <div>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Sorry!, There is no records matched with your search
                  criteria."
          />
        </div>
      ) : (
        <Table
          dataSource={todoList?.data?.data}
          columns={columns}
          pagination={false}
          scroll={{ x: 500 }}
          loading={isLoading}
          rowKey={(record) => record._id}
          locale={{
            emptyText: null,
          }}
        />
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
