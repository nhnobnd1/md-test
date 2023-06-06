import { useJob, useNavigate } from "@moose-desk/core";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { CustomerRepository } from "@moose-desk/repo";
import { EmptySearchResult, IndexTable, Loading } from "@shopify/polaris";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import { MDTextField } from "src/components/Input/TextFieldPassword/MDTextField";
import Pagination from "src/components/Pagination/Pagination";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
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
interface IProps {
  customerId: string;
}
export const ListTicketCustomer = ({ customerId }: IProps) => {
  const navigate = useNavigate();
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [querySearch, setQuerySearch] = useState<string>("");
  const debounceValue: string = useDebounce(querySearch, 500);
  const [filter, setFilter] = useState<ListTicketCustomerFilter>({
    limit,
    page: 1,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });
  const [dataSource, setDataSource]: any = useState();

  const {
    run: fetListTicketCustomer,
    processing,
    cancel,
  } = useJob((customerId: string, filter: ListTicketCustomerFilter) => {
    return CustomerRepository()
      .getListTicket(customerId, filter)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setDataSource(data);
          } else {
            // message.error("Get data ticket customer failed");
          }
        })
      );
  });
  useEffect(() => {
    fetListTicketCustomer(customerId, { ...filter, query: debounceValue });
    return () => {
      cancel();
    };
  }, [customerId, filter, debounceValue]);
  const totalResult = dataSource?.metadata.totalCount;
  const memoDataSource = useMemo(() => {
    const cloneListData = dataSource?.data;
    return cloneListData;
  }, [dataSource]);

  const handleSearchInput = (value: string) => {
    const newQuery = value;
    setQuerySearch(newQuery);
  };
  const handleSortTable = (headingIndex: number, direction: string) => {
    const listSort = [
      "subject",
      "createdDatetime",
      "updatedDatetime",
      "status",
      "priority",
      "agentEmail",
    ];
    setFilter((pre) => ({
      ...pre,
      sortBy: listSort[headingIndex],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
  const handleChangePage = (page: number) =>
    setFilter((pre) => ({ ...pre, page }));
  const handleClickRow = (id: string) => {
    navigate(`/ticket/${id}`);
  };
  const rowMarkup = memoDataSource?.map(
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
          <div
            style={{ width: 300, whiteSpace: "pre-line" }}
            onClick={() => handleClickRow(_id)}
          >
            {subject}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div onClick={() => handleClickRow(_id)}>
            {!!timezone &&
              dayjs
                .utc(createdDatetime)
                .tz(timezone ?? "America/New_York")
                .format("MM/DD/YYYY")}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div onClick={() => handleClickRow(_id)}>
            {dayjs
              .utc(updatedDatetime ?? createdDatetime)
              .tz(timezone ?? "America/New_York")
              .format("MM/DD/YYYY")}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div onClick={() => handleClickRow(_id)}>{status}</div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div onClick={() => handleClickRow(_id)}>{priority}</div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div onClick={() => handleClickRow(_id)}>{agentEmail}</div>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  return (
    <div className={styles.wrapTableTicketCustomer}>
      <div className={classNames(styles.searchWrap, "mb-10")}>
        <MDTextField
          value={querySearch}
          type="search"
          onChange={handleSearchInput}
        />
      </div>
      <section className={styles.wrapTable}>
        {processing && <Loading />}
        <IndexTable
          selectable={false}
          resourceName={resourceName}
          headings={[
            { title: "Ticket Title" },
            { title: "Date Requested" },
            { title: "Last Updated" },
            { title: "Status" },
            { title: "Priority" },
            { title: "Assignee" },
          ]}
          itemCount={memoDataSource?.length || 10}
          sortable={[true, true, true, true, true, true]}
          onSort={handleSortTable}
          loading={processing}
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
      </section>

      <div className="flex items-center justify-center mt-4">
        <section className={styles.totalResult}>
          {totalResult} Result{totalResult > 1 && "s"}
        </section>
        <Pagination
          total={dataSource?.metadata ? dataSource.metadata.totalCount : 1}
          pageSize={filter.limit ?? 0}
          currentPage={filter.page ?? 1}
          onChangePage={handleChangePage}
          previousTooltip={"Previous"}
          nextTooltip={"Next"}
        />
      </div>
      {/* </section> */}
    </div>
  );
};
