import { TicketTable } from "@moose-beta/components/layoutComponents/component/Tickets/TicketTable";
import { useNavigate } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useToast } from "@shopify/app-bridge-react";
import { Loading } from "@shopify/polaris";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Search } from "src/components/Search/Search";
import { SkeletonTable } from "src/components/Skelaton/SkeletonTable";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTicketCustomer } from "src/modules/customers/api/api";
import { ListTicketCustomerFilter } from "src/modules/customers/helper/interface";
import styles from "./styles.module.scss";
dayjs.extend(timezone);
dayjs.extend(utc);
const limit = 10;
const resourceName = {
  singular: "customerTicket",
  plural: "customersTicket",
};

const listSort = [
  "subject",
  "createdDatetime",
  "updatedDatetime",
  "status",
  "priority",
  "agentEmail",
];

interface IProps {
  customerId: string;
}
export const ListTicketCustomer = memo(({ customerId }: IProps) => {
  const navigate = useNavigate();
  const { subDomain } = useSubdomain();
  const { t } = useTranslation();
  const { show } = useToast();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [filter, setFilter] = useState<ListTicketCustomerFilter | any>({
    limit,
    page: 1,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });
  const {
    data: dataSource,
    refetch: refetchCustomers,
    isLoading,
    isFetching,
  }: any = useQuery({
    queryKey: [QUERY_KEY.LIST_TICKET_CUSTOMER, filter, customerId],
    queryFn: () => getListTicketCustomer(customerId, filter),
    keepPreviousData: true,
    enabled: !!customerId,
    onError: () => {
      show(t("messages:error.get_ticket_customer"), {
        isError: true,
      });
    },
  });

  // const totalResult = dataSource?.data?.metadata.totalCount;
  const memoDataSource = useMemo(() => {
    const cloneListData = dataSource?.data;
    return cloneListData;
  }, [dataSource]);
  const handleSearch = (value: string) => {
    setFilter((pre: any) => ({ ...pre, query: value }));
  };

  const handleSort = (sortBy: string, sortOrder: string) => {
    setFilter((pre: any) => ({
      ...pre,
      sortBy,
      sortOrder,
    }));
  };
  const handleChangePage = (page: number) =>
    setFilter((pre: any) => ({ ...pre, page }));
  return (
    <div className={styles.wrapTableTicketCustomer}>
      <div className={classNames(styles.searchWrap)}>
        <Search onTypeSearch={handleSearch} />
      </div>
      <section className={styles.wrapTable}>
        {isFetching && <Loading />}
        {isLoading ? (
          <SkeletonTable columnsCount={6} rowsCount={10} />
        ) : (
          <TicketTable
            data={memoDataSource?.data}
            limit={filter.limit}
            meta={memoDataSource?.metadata}
            onSort={handleSort}
            onChangePagination={handleChangePage}
            onRefetch={refetchCustomers}
            name="customer"
          />
        )}
      </section>

      {/* </section> */}
    </div>
  );
});
