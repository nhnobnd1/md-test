import { TicketTable } from "@moose-beta/components/layoutComponents/component/Tickets/TicketTable";
import { useSearchParams } from "@moose-desk/core";
import { message } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { getListTicketCustomer } from "src/modules/customer/api/api";
import { QUERY_KEY } from "src/modules/customer/helper/constant";
import { ListTicketCustomerFilter } from "src/modules/customer/helper/interface";
import styles from "./styles.module.scss";
dayjs.extend(timezone);
dayjs.extend(utc);

const limit = 10;
export const ListTicketCustomer = React.memo(() => {
  const [searchParams] = useSearchParams();
  const customerId: string = searchParams.get("customer") || "";
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ListTicketCustomerFilter | any>({
    limit,
    page: 1,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });
  const {
    data: dataSource,
    refetch,
    isFetching: isFetchingListTicket,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEY.LIST_TICKET_CUSTOMER, filter],
    queryFn: () => getListTicketCustomer(customerId, filter),
    onError: () => {
      message.error(t("messages:error.get_ticket_customer"));
    },
    keepPreviousData: true,
    enabled: !!customerId,
  });
  const memoDataSource = useMemo(() => {
    return (dataSource as any)?.data.data;
  }, [dataSource]);

  const handleSearchInput = (query: string) => {
    setFilter((pre: any) => ({ ...pre, query }));
  };
  const handleChangePage = ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    setFilter({ ...filter, page, limit });
  };
  const handleChangeTable = (
    sortBy: string | undefined,
    sortOrder: string | undefined
  ) => {
    setFilter((pre: any) => ({
      ...pre,
      sortBy,
      sortOrder,
    }));
  };
  return (
    <div className={styles.wrapTableTicketCustomer}>
      <div className={styles.searchBlock}>
        <div className={classNames(styles.searchWrap)}>
          <MDSearchInput onTypeSearch={handleSearchInput} />
        </div>
      </div>
      <section className={styles.wrapTable}>
        {isLoading ? (
          <div className="p-3">
            <MDSkeleton lines={5} />
          </div>
        ) : (
          <TicketTable
            type="customer"
            data={memoDataSource}
            meta={(dataSource as any)?.data?.metadata}
            page={filter.page}
            limit={filter.limit}
            loading={isFetchingListTicket}
            onRefetch={refetch}
            onPaginationChange={handleChangePage}
            onChangeTable={handleChangeTable}
          />
        )}
      </section>
      {/* </section> */}
    </div>
  );
});
