import {
  createdDatetimeFormat,
  generatePath,
  PageComponent,
  priorityToTagShopify,
  upperCaseFirst,
  useNavigate,
} from "@moose-desk/core";
import { StatusTicket } from "@moose-desk/repo";
import {
  Badge,
  EmptySearchResult,
  IndexTable,
  Loading,
  Text,
} from "@shopify/polaris";

import { useToast } from "@shopify/app-bridge-react";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "src/components/Pagination";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import styles from "./style.module.scss";
// import { ScreenType } from "@moose-desk/repo/";
import { useTranslation } from "react-i18next";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getListTicketApi } from "src/modules/ticket/helper/api";

import { useQuery } from "react-query";
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
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [filterData, setFilterData] = useState<any>({
    limit: 10,
    page: 1,
    agentObjectId: "",
  });

  useEffect(() => {
    if (!agentId) return;
    setFilterData((pre: any) => ({ ...pre, agentObjectId: agentId }));
  }, [agentId]);

  const { data: dataTicket, isLoading: loadingFilter } = useQuery({
    queryKey: ["getListTickets", filterData],
    queryFn: () => getListTicketApi(filterData),
    enabled: !!filterData.agentObjectId,
    onError: () => {
      show(t("messages:error.get_ticket"), { isError: true });
    },
  });
  const tickets = useMemo(() => {
    if (dataTicket?.data)
      return dataTicket.data.map((item) => ({ ...item, id: item._id }));
    return [];
  }, [dataTicket, filterData.agentObjectId]);

  const meta = useMemo(() => {
    if (dataTicket?.metadata) return dataTicket.metadata;
    return undefined;
  }, [dataTicket]);

  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");

  const listSort = [
    "status",
    "ticketId",
    "subject",
    "priority",
    "updatedTimestamp",
  ];

  const handleSort = (
    headingIndex: number,
    direction: "descending" | "ascending"
  ) => {
    setIndexSort(Number(headingIndex));
    setDirection(direction);
    setFilterData((pre: any) => ({
      ...pre,
      sortBy: listSort[Number(headingIndex)],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };

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
        status,
      },
      index
    ) => (
      <IndexTable.Row
        id={_id}
        key={ticketId}
        position={index}
        onClick={() => {}}
      >
        <IndexTable.Cell>
          <Badge status={priorityToTagShopify(status)}>
            {upperCaseFirst(status)}
          </Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div
            className="hover:underline"
            onClick={() => {
              navigate(generatePath(TicketRoutePaths.Detail, { id: _id }));
            }}
          >
            <Text
              variant="bodyMd"
              fontWeight={status === StatusTicket.NEW ? "bold" : "medium"}
              as="span"
            >
              {ticketId}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {
            <div
              className="hover:underline max-w-lg truncate"
              onClick={() => {
                navigate(generatePath(TicketRoutePaths.Detail, { id: _id }));
              }}
            >
              <Text
                variant="bodyMd"
                fontWeight={status === StatusTicket.NEW ? "bold" : "medium"}
                as="span"
              >
                {subject}
              </Text>
            </div>
          }
        </IndexTable.Cell>

        <IndexTable.Cell>
          {createdDatetimeFormat(updatedDatetime, timezone)}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge status={priorityToTagShopify(priority)}>
            {upperCaseFirst(priority)}
          </Badge>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  return (
    <>
      {loadingFilter && <Loading />}
      {loadingFilter ? (
        <SkeletonTable columnsCount={5} rowsCount={10} />
      ) : (
        <div>
          <IndexTable
            resourceName={{ singular: "ticket", plural: "tickets" }}
            itemCount={tickets?.length}
            selectable={false}
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
              { title: "Status" },
              { title: "Ticket ID" },
              { title: "Ticket Title" },
              { title: "Last Update" },
              { title: "Priority" },
            ]}
            sortable={[true, true, true, true, true, true]}
            sortDirection={direction}
            sortColumnIndex={indexSort}
            onSort={handleSort}
          >
            {rowMarkup}
          </IndexTable>
        </div>
      )}
      <div>
        {meta?.totalCount ? (
          <div className={styles.wrapPagination}>
            {filterData.page && filterData.limit && meta?.totalCount && (
              <>
                <div className="col-span-3 flex justify-center">
                  <Pagination
                    total={meta.totalCount}
                    pageSize={filterData.limit ?? 0}
                    currentPage={meta.page}
                    onChangePage={(page) =>
                      setFilterData((val: any) => {
                        return { ...val, page };
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Tickets;
