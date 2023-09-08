import { TicketTable } from "@moose-beta/components/layoutComponents/component/Tickets/TicketTable";
import { useSearchParams } from "@moose-desk/core";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import { getListTicketApi } from "src/modules/ticket/helper/api";
import styles from "./style.module.scss";

export const Tickets = React.memo(() => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get("agent");
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    agentObjectId: "",
  });
  useEffect(() => {
    if (!agentId) return;
    setFilter((pre) => ({ ...pre, agentObjectId: agentId }));
  }, [agentId]);
  const {
    data: dataTicket,
    refetch,
    isLoading: loadingFilter,
    isFetching: fetchingFilter,
  } = useQuery({
    queryKey: ["getListTickets", filter],
    queryFn: () => getListTicketApi(filter),

    onError: () => {
      message.error(t("messages:error.get_ticket"));
    },
    enabled: !!filter?.agentObjectId,
  });

  const handleChangePage = ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    setFilter((value) => {
      return {
        ...value,
        page,
        limit,
      };
    });
  };
  const handleChangeTable = (
    sortBy: string | undefined,
    sortOrder: string | undefined
  ) => {
    setFilter((pre: any) => ({ ...pre, sortBy, sortOrder }));
  };
  const handleSearchInput = (query: string) => {
    setFilter((pre) => ({ ...pre, query }));
  };
  return (
    <div>
      <div className={styles.searchBlock}>
        <div className={styles.searchWrap}>
          <MDSearchInput onTypeSearch={handleSearchInput} />
        </div>
      </div>
      <TicketTable
        type="ticket"
        data={(dataTicket as any)?.data}
        meta={(dataTicket as any)?.metadata}
        page={filter.page}
        limit={filter.limit}
        loading={fetchingFilter}
        onRefetch={refetch}
        onPaginationChange={handleChangePage}
        onChangeTable={handleChangeTable}
      />
    </div>
  );
});
