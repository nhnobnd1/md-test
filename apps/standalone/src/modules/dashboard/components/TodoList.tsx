import { createdDatetimeFormat } from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { Ticket } from "@moose-desk/repo";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import classNames from "classnames";
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
      title: "#",
      dataIndex: "ticketId",
      key: "ticketId",
      render: (_: string, record: Ticket) => (
        <Link
          className={classNames(styles.actionLink, "one-line")}
          href={`/ticket/${record._id}`}
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
          href={`/ticket/${record._id}`}
        >{`${record.subject}`}</Link>
      ),
      width: "50%",
    },

    {
      title: "Date Requested",
      dataIndex: "updatedDatetime",
      key: "updatedDatetime",
      render: (_: string, record: any) => (
        <div>{createdDatetimeFormat(record.updatedDatetime, timezone)}</div>
      ),
      width: "35%",
    },
  ];
  return (
    <div className={styles.wrapTodoList}>
      {isLoading ? (
        <MDSkeleton lines={15} />
      ) : (
        <Table
          dataSource={todoList?.data?.data}
          columns={columns}
          pagination={false}
          scroll={{ x: 500 }}
          loading={isLoading}
          rowKey={(record) => record._id}
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
