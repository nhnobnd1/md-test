import { createdDatetimeFormat } from "@moose-desk/core";
import {
  Button,
  EmptySearchResult,
  IndexTable,
  Link,
  Text,
} from "@shopify/polaris";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { SkeletonTable } from "src/components/Skelaton/SkeletonTable";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getTodoList } from "src/modules/dashboard/api/api";
import styles from "./styles.module.scss";
const resourceName = {
  singular: "todoListTable",
  plural: "todoListTable",
};
export const TodoList = React.memo(() => {
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
  const rowMarkup = todoList?.data?.data?.map((records: any, index: number) => (
    <IndexTable.Row id={records?._id} key={records?._id} position={index}>
      <IndexTable.Cell className="">
        <Link monochrome removeUnderline url={`/ticket/${records?._id}`}>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {records?.ticketId}
          </Text>
        </Link>
      </IndexTable.Cell>
      <IndexTable.Cell className="">
        <Link monochrome removeUnderline url={`/ticket/${records?._id}`}>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {records?.subject}
          </Text>
        </Link>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {createdDatetimeFormat(records?.updatedDatetime, timezone)}
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <div className={styles.wrapTodoList}>
      {isLoading ? (
        <SkeletonTable columnsCount={3} rowsCount={15} />
      ) : (
        <IndexTable
          resourceName={resourceName}
          itemCount={totalItem || 0}
          selectable={false}
          headings={[
            { title: "Ticket ID" },
            { title: "Ticket Title" },

            { title: "Date Requested" },
          ]}
          sortable={[false, false, false]}
          emptyState={
            <EmptySearchResult
              title={
                "Sorry! There is no records matched with your search criteria"
              }
              description={"Try changing the filters or search term"}
              withIllustration
            />
          }
        >
          {rowMarkup}
        </IndexTable>
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
