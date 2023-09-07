import {
  priorityToTagShopify,
  upperCaseFirst,
  useNavigate,
} from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useToast } from "@shopify/app-bridge-react";
import {
  Badge,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Loading,
  SkeletonBodyText,
} from "@shopify/polaris";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import Pagination from "src/components/Pagination/Pagination";
import { Search } from "src/components/Search/Search";
import { SkeletonTable } from "src/components/Skelaton/SkeletonTable";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTicketCustomer } from "src/modules/customers/api/api";
import {
  ListTicketCustomerFilter,
  TicketCustomerResponse,
} from "src/modules/customers/helper/interface";
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
  const [filter, setFilter] = useState<ListTicketCustomerFilter>({
    limit,
    page: 1,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });
  const {
    data: dataSource,
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
    setFilter((pre) => ({ ...pre, query: value }));
  };

  const handleSort = (
    headingIndex: number,
    direction: "descending" | "ascending"
  ) => {
    setIndexSort(Number(headingIndex));
    setDirection(direction);
    setFilter((pre) => ({
      ...pre,
      sortBy: listSort[Number(headingIndex)],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
  const handleChangePage = (page: number) =>
    setFilter((pre) => ({ ...pre, page }));
  const handleClickRow = (id: string) => {
    navigate(`/ticket/${id}`);
  };
  const rowMarkup = memoDataSource?.data?.map(
    (
      {
        _id,
        subject,
        createdDatetime,
        updatedDatetime,
        status,
        priority,
        agentEmail,
      }: TicketCustomerResponse,
      index: number
    ) => (
      <IndexTable.Row id={_id} key={_id} position={index}>
        <IndexTable.Cell>
          {isLoading ? (
            <SkeletonBodyText lines={1} />
          ) : (
            <div>
              <Badge status={priorityToTagShopify(status)}>
                {upperCaseFirst(status)}
              </Badge>
            </div>
          )}
        </IndexTable.Cell>

        <IndexTable.Cell>
          {isLoading ? (
            <SkeletonBodyText lines={1} />
          ) : (
            <div
              className="hover:underline max-w-lg truncate"
              onClick={() => handleClickRow(_id)}
            >
              {subject}
            </div>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          {isLoading ? (
            <SkeletonBodyText lines={1} />
          ) : (
            <div>
              {!!timezone &&
                dayjs
                  .utc(createdDatetime)
                  .tz(timezone ?? "America/New_York")
                  .format("MM/DD/YYYY")}
            </div>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          {isLoading ? (
            <SkeletonBodyText lines={1} />
          ) : (
            <div>
              {dayjs
                .utc(updatedDatetime ?? createdDatetime)
                .tz(timezone ?? "America/New_York")
                .format("MM/DD/YYYY")}
            </div>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          {isLoading ? (
            <SkeletonBodyText lines={1} />
          ) : (
            <div>
              <Badge status={priorityToTagShopify(priority)}>
                {upperCaseFirst(priority)}
              </Badge>
            </div>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          {isLoading ? <SkeletonBodyText lines={1} /> : <div>{agentEmail}</div>}
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
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
          <LegacyCard>
            <IndexTable
              resourceName={resourceName}
              itemCount={memoDataSource?.data?.length || 0}
              selectable={false}
              headings={[
                { title: "Status" },
                { title: "Ticket Title" },
                { title: "Date Requested" },
                { title: "Last Updated" },
                { title: "Priority" },
                { title: "Assignee" },
              ]}
              sortDirection={direction}
              sortColumnIndex={indexSort}
              onSort={handleSort}
              sortable={[true, true, true, true, true, true]}
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
            <div className="flex items-center justify-center mt-4 pb-4">
              <Pagination
                total={
                  memoDataSource?.metadata
                    ? memoDataSource?.metadata?.totalCount
                    : 1
                }
                pageSize={filter.limit ?? 0}
                currentPage={filter.page ?? 1}
                onChangePage={handleChangePage}
                previousTooltip={"Previous"}
                nextTooltip={"Next"}
              />
            </div>
          </LegacyCard>
        )}
      </section>

      {/* </section> */}
    </div>
  );
});
