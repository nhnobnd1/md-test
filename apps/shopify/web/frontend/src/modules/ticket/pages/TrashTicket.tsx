import {
  createdDatetimeFormat,
  upperCaseFirst,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import {
  GetListTicketRequest,
  Ticket,
  TicketRepository,
  TicketStatistic,
} from "@moose-desk/repo";
import {
  EmptySearchResult,
  Filters,
  IndexTable,
  LegacyCard,
  Link,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { FC, useCallback, useEffect, useState } from "react";
import { map } from "rxjs";

import { Pagination } from "src/components/Pagination";
import env from "src/core/env";
import CardStatistic from "src/modules/ticket/components/CardStatistic/CardStatistic";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface TrashTicketProps {}

const TrashTicket: FC<TrashTicketProps> = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const defaultFilter: () => any = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
  });
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    removeSelectedResources,
  } = useIndexResourceState(tickets);
  const [statistic, setStatistic] = useState<TicketStatistic>({
    statusCode: 200,
    data: {
      OPEN: 0,
      PENDING: 0,
      RESOLVED: 0,
      TRASH: 0,
      NEW: 0,
    },
  });
  const [meta, setMeta] = useState<any>();

  const [filterData, setFilterData] = useState<GetListTicketRequest>(
    defaultFilter()
  );
  const handleFiltersQueryChange = useCallback((queryValue: string) => {
    setFilterData((old: any) => {
      return {
        ...old,
        query: queryValue,
      };
    });
  }, []);
  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old: any) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);
  const { run: getListTrashApi, processing: loadingList } = useJob(
    (payload: GetListTicketRequest) => {
      return TicketRepository()
        .getListTrash(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const tickets = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setTickets(tickets);
              setMeta(data.metadata);
            } else {
              // message.error("Get data ticket failed");
            }
          })
        );
    }
  );
  const rowMarkup = tickets.map(
    (
      {
        _id,
        ticketId,
        subject,
        priority,
        updatedDatetime,
        tags,
        incoming,
        createdViaWidget,
        fromEmail,
        toEmails,
      },
      index
    ) => (
      <IndexTable.Row
        id={_id}
        key={ticketId}
        selected={selectedResources.includes(_id)}
        position={index}
        onClick={() => {}}
      >
        <IndexTable.Cell>
          <Link
            removeUnderline
            dataPrimaryLink
            onClick={() => {
              console.log("clicked", _id);
            }}
          >
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {ticketId}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{subject}</IndexTable.Cell>
        <IndexTable.Cell>
          {createdViaWidget || incoming ? (
            <span className="subject">{`${fromEmail.email}`}</span>
          ) : (
            <span className="subject">{`${toEmails[0]?.email}`}</span>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="flex flex-col wrap gap-2">
            {tags?.slice(-2).map((item, indexTag) => (
              <span className="tag-item" key={item + indexTag}>
                #{item}
              </span>
            ))}
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>{upperCaseFirst(priority)}</IndexTable.Cell>
        <IndexTable.Cell>
          {createdDatetimeFormat(updatedDatetime)}
        </IndexTable.Cell>
        <IndexTable.Cell></IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);
  const handleApply = () => {};
  useEffect(() => {
    getListTrashApi(filterData);
  }, [filterData]);
  return (
    <Page
      breadcrumbs={[{ onAction: () => navigate(TicketRoutePaths.Index) }]}
      fullWidth
      primaryAction={
        <div className="flex gap-2">
          <div className="min-w-[300px] flex-1">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search ticket"
              filters={[]}
              onClearAll={resetFilterData}
            ></Filters>
          </div>
        </div>
      }
    >
      <LegacyCard sectioned>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-1">
            <CardStatistic
              className="mb-4"
              handleApply={handleApply}
              screen="ListTicket"
              title="Public Views"
              options={[
                { label: "New", value: `${statistic?.data.NEW}` },
                { label: "Open", value: `${statistic?.data.OPEN}` },
                { label: "Pending", value: `${statistic?.data.PENDING}` },
                { label: "Resolved", value: `${statistic?.data.RESOLVED}` },
                { label: "Trash", value: `${statistic?.data.TRASH}` },
              ]}
            />
          </div>
          <div className="col-span-4">
            <IndexTable
              resourceName={{ singular: "ticket", plural: "tickets" }}
              itemCount={tickets?.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources?.length
              }
              onSelectionChange={handleSelectionChange}
              loading={loadingList}
              emptyState={
                <EmptySearchResult
                  title={
                    "Sorry! There is no records matched with your search criteria"
                  }
                  description={"Try changing the filters or search term"}
                  withIllustration
                />
              }
              headings={[
                { title: "#" },
                { title: "Ticket Title" },
                { title: "Customer" },
                { title: "Tags" },
                { title: "Priority" },
                { title: "Last Update" },
                { title: "Action" },
              ]}
            >
              {rowMarkup}
            </IndexTable>
            <div>
              {meta?.totalCount ? (
                <div className="flex items-center justify-center py-8">
                  {filterData.page && filterData.limit && meta?.totalCount && (
                    <>
                      <div className="col-span-1 flex justify-center">
                        <Pagination
                          total={meta.totalCount}
                          pageSize={filterData.limit ?? 0}
                          currentPage={filterData.page}
                          onChangePage={(page) =>
                            setFilterData((val) => {
                              return { ...val, page };
                            })
                          }
                        />
                      </div>
                      <div className="col-span-1 ">
                        <p></p>
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </LegacyCard>
    </Page>
  );
};
export default TrashTicket;
