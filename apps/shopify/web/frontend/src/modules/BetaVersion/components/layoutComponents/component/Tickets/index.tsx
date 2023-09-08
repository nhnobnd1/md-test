import { PageComponent, useNavigate } from "@moose-desk/core";
import { Loading } from "@shopify/polaris";

import { useToast } from "@shopify/app-bridge-react";
import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
// import { ScreenType } from "@moose-desk/repo/";
import { useTranslation } from "react-i18next";
import { getListTicketApi } from "src/modules/ticket/helper/api";

import { TicketTable } from "@moose-beta/components/layoutComponents/component/Tickets/TicketTable";
import { useQuery } from "react-query";
import { Search } from "src/components/Search/Search";
import { SkeletonTable } from "src/components/Skelaton/SkeletonTable";

interface TicketIndexPageProps {
  agentId: string;
}
export interface FilterObject {
  customer: string;
  tags: string;
  status: string;
  priority: string;
  agentObjectId: string;
}

const Tickets: PageComponent<TicketIndexPageProps> = ({
  agentId,
}: TicketIndexPageProps) => {
  const navigate = useNavigate();
  const { show } = useToast();
  const { t } = useTranslation();
  const [filterData, setFilterData] = useState<any>({
    limit: 10,
    page: 1,
    agentObjectId: "",
    query: "",
  });

  useEffect(() => {
    if (!agentId) return;

    setFilterData((pre: any) => ({ ...pre, agentObjectId: agentId }));
  }, [agentId]);
  const {
    data: dataTicket,
    refetch: refetchListTicket,
    isLoading: loadingFilter,
  } = useQuery({
    queryKey: ["getListTickets", filterData],
    queryFn: () => getListTicketApi(filterData),
    onError: () => {
      show(t("messages:error.get_ticket"), { isError: true });
    },
    keepPreviousData: true,
  });
  const tickets = useMemo(() => {
    if (!filterData.agentObjectId) return [];
    if (dataTicket?.data)
      return dataTicket.data.map((item) => ({ ...item, id: item._id }));
    return [];
  }, [dataTicket, filterData.agentObjectId]);
  const meta = useMemo(() => {
    if (dataTicket?.metadata) return dataTicket.metadata;
    return undefined;
  }, [dataTicket]);
  const handleSearch = (value: string) => {
    setFilterData((pre: any) => ({ ...pre, query: value }));
  };
  const handleChangePage = (page: number) => {
    setFilterData((pre: any) => ({ ...pre, page }));
  };
  const handleSort = (sortBy: string, sortOrder: string) => {
    setFilterData((pre: any) => ({ ...pre, sortBy, sortOrder }));
  };
  return (
    <>
      {(loadingFilter || !filterData.agentObjectId) && <Loading />}
      <div className={styles.searchWrap}>
        <Search onTypeSearch={handleSearch} />
      </div>
      {loadingFilter ? (
        <SkeletonTable columnsCount={7} rowsCount={10} />
      ) : (
        <TicketTable
          data={filterData.agentObjectId ? tickets : []}
          meta={filterData.agentObjectId ? meta : undefined}
          limit={filterData.limit}
          onRefetch={() => refetchListTicket()}
          onChangePagination={handleChangePage}
          onSort={handleSort}
          name="ticket"
        />
      )}
    </>
  );
};

export default Tickets;
