import {
  createdDatetimeFormat,
  upperCaseFirst,
  useJob,
  useNavigate,
  useParams,
} from "@moose-desk/core";
import {
  BaseListTagRequest,
  BaseMetaDataListResponse,
  TagRepository,
  Ticket,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Page,
} from "@shopify/polaris";

import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import SettingRoutePaths from "src/modules/setting/routes/paths";

interface ViewTicketProps {}

const ViewTicket: FC<ViewTicketProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");

  const defaultFilter = () => ({
    page: 1,
    limit: 10,
    query: "",
  });
  const [filterData, setFilterData] =
    useState<BaseListTagRequest>(defaultFilter);

  const listSort = [
    "subject",
    "createdTimestamp",
    "updatedTimestamp",
    "status",
    "priority",
  ];

  const handleSort = (
    headingIndex: number,
    direction: "descending" | "ascending"
  ) => {
    setIndexSort(Number(headingIndex));
    setDirection(direction);
    setFilterData((pre) => ({
      ...pre,
      sortBy: listSort[Number(headingIndex)],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
  const { run: getTicketByTagApi, processing } = useJob(
    (id: string, params: BaseListTagRequest) => {
      return TagRepository()
        .getListTicket(id, params)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              //   console.log("data repsonse", data.data);
              setTickets(data.data);
              setMeta(data.metadata);
            }
          }),
          catchError((err) => {
            show(t("messages:error.something_went_wrong"), { isError: true });
            return of(err);
          })
        );
    },
    {
      showLoading: true,
    }
  );
  const { run: deleteForceApi } = useJob((id: string) => {
    return TagRepository()
      .deleteForce(id)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show(t("messages:success.deleted"));
            getTicketByTagApi(id, filterData);
          } else {
            show(t("messages:error.deleted"), {
              isError: true,
            });
          }
        }),
        catchError((error) => {
          show(t("messages:error.deleted"), {
            isError: true,
          });
          return of(error);
        })
      );
  });

  const handleDelete = useCallback(() => {
    if (id) {
      deleteForceApi(id);
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      getTicketByTagApi(id, filterData);
    }
  }, [filterData, id]);

  return (
    <>
      <Page
        breadcrumbs={[
          { onAction: () => navigate(SettingRoutePaths.Workdesk.Tag.Index) },
        ]}
        primaryAction={
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            destructive
          >
            Remove all
          </Button>
        }
        fullWidth
        compactTitle
        title={`Tickets tagged with "${id}"`}
      >
        <LegacyCard>
          <div className="flex-1 px-4 pt-4 pb-2 mt-5">
            <IndexTable
              resourceName={{ singular: "ticket", plural: "tickets" }}
              itemCount={tickets.length}
              selectable={false}
              hasMoreItems
              headings={[
                { title: "Title" },
                { title: "Date Requested" },
                { title: "Last Updated" },
                { title: "Status" },
                { title: "Priority" },
              ]}
              loading={processing}
              emptyState={
                <EmptySearchResult
                  title={
                    "Sorry! There is no records matched with your search creteria"
                  }
                  description={"Try changing the filters or search term"}
                  withIllustration
                />
              }
              sortable={[true, true, true, true, true]}
              sortDirection={direction}
              sortColumnIndex={indexSort}
              onSort={handleSort}
            >
              {tickets.map((item: Ticket, index) => (
                <IndexTable.Row id={item._id} key={item._id} position={index}>
                  <IndexTable.Cell className="py-3">
                    {item.subject}
                  </IndexTable.Cell>
                  <IndexTable.Cell className="py-3">
                    {createdDatetimeFormat(item.createdDatetime, timezone)}
                  </IndexTable.Cell>
                  <IndexTable.Cell className="py-3">
                    {createdDatetimeFormat(item.updatedDatetime, timezone)}
                  </IndexTable.Cell>
                  <IndexTable.Cell className="py-3">
                    {upperCaseFirst(item.status)}
                  </IndexTable.Cell>
                  <IndexTable.Cell className="py-3">
                    {upperCaseFirst(item.priority)}
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
          </div>
        </LegacyCard>
        {meta?.totalCount
          ? meta && (
              <div className="flex items-center justify-center mt-4">
                <Pagination
                  currentPage={filterData.page ?? 1}
                  total={meta?.totalCount}
                  pageSize={filterData.limit ?? 10}
                  onChangePage={(page) =>
                    setFilterData((val) => ({ ...val, page }))
                  }
                  previousTooltip={"Previous"}
                  nextTooltip={"Next"}
                />
              </div>
            )
          : null}
      </Page>
      <ModalDelete
        title="Are you sure that you want to permanently remove all?"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        content={
          "All tickets will remove this tag permanently. This action cannot be undone."
        }
        deleteAction={handleDelete}
        textConfirm="Remove"
      />
    </>
  );
};

export default ViewTicket;
