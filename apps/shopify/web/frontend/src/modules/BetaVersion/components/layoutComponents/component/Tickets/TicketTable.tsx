import {
  createdDatetimeFormat,
  generatePath,
  priorityToTagShopify,
  typeChannelTicket,
  useJob,
  useNavigate,
  useToggle,
} from "@moose-desk/core";
import { StatusTicket, TicketRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Badge,
  ButtonGroup,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Text,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import styles from "./style.module.scss";
const upperCaseFirst = (str: string) => {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};
interface IProps {
  data: any;
  meta: any;
  limit: number;
  name: string;
  onRefetch: () => void;
  onChangePagination: (page: number) => void;
  onSort: (sortBy: string, sortOrder: string) => void;
}
export const TicketTable = React.memo(
  ({
    data,
    meta,
    limit,
    name,
    onSort,
    onChangePagination,
    onRefetch,
  }: IProps) => {
    const navigate = useNavigate();
    const { show } = useToast();
    const {
      state: modalDelete,
      on: openModalDelete,
      off: closeModalDelete,
    } = useToggle(false);
    const { t } = useTranslation();
    const { subDomain } = useSubdomain();
    const { timezone }: any = useGlobalData(false, subDomain || "");
    const [idDelete, setIdDelete] = useState("");
    const [direction, setDirection] = useState<"descending" | "ascending">(
      "descending"
    );
    const [indexSort, setIndexSort] = useState<number | undefined>(undefined);

    const handleOpenModalDelete = useCallback((id: string) => {
      openModalDelete();
      setIdDelete(id);
    }, []);
    const rowMarkup = data?.map(
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
          agentEmail,
        }: any,
        index: number
      ) => (
        <IndexTable.Row id={_id} key={ticketId} position={index}>
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
                className="hover:underline max-w-lg truncate subject-350"
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
          {name === "customer" ? (
            <IndexTable.Cell>
              <span className="subject max-w-lg truncate">{agentEmail}</span>
            </IndexTable.Cell>
          ) : (
            <IndexTable.Cell>
              {createdViaWidget || incoming ? (
                <span className="subject max-w-lg truncate">{`${
                  fromEmail.name ? fromEmail.name : fromEmail.email
                }`}</span>
              ) : (
                <span className="subject max-w-lg truncate">{`${
                  toEmails[0]?.name ? toEmails[0]?.name : toEmails[0]?.email
                }`}</span>
              )}
            </IndexTable.Cell>
          )}
          <IndexTable.Cell>
            <Badge status={typeChannelTicket(createdViaWidget)}>
              {createdViaWidget ? "Via widget" : "Email"}
            </Badge>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Badge status={priorityToTagShopify(priority)}>
              {upperCaseFirst(priority)}
            </Badge>
          </IndexTable.Cell>
          <IndexTable.Cell>
            {createdDatetimeFormat(updatedDatetime, timezone)}
          </IndexTable.Cell>
          <IndexTable.Cell>
            <ButtonGroup>
              <div className="flex gap-2">
                <ButtonEdit
                  isTable
                  onClick={() => {
                    navigate(
                      generatePath(TicketRoutePaths.Detail, { id: _id })
                    );
                  }}
                ></ButtonEdit>
                <ButtonDelete
                  isTable
                  onClick={() => handleOpenModalDelete(_id)}
                >
                  Remove
                </ButtonDelete>
              </div>
            </ButtonGroup>
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    );
    const { run: deleteTicketApi, processing } = useJob((id: string[]) => {
      return TicketRepository()
        .delete({
          ids: id,
        })
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show(t("messages:success.delete_ticket"));
              onRefetch();
              closeModalDelete();
            }
          }),
          catchError((err) => {
            show(t("messages:error.delete_ticket"), { isError: true });
            return of(err);
          })
        );
    });
    const listSort = [
      "ticketId",
      "subject",
      name === "customer" ? "agentEmail" : "customer",
      "createdViaWidget",
      "priority",
      "updatedTimestamp",
    ];

    const handleSort = (
      headingIndex: number,
      direction: "descending" | "ascending"
    ) => {
      setIndexSort(Number(headingIndex));
      setDirection(direction);
      onSort(
        listSort[Number(headingIndex)],
        direction === "ascending" ? "1" : "-1"
      );
    };
    return (
      <div>
        <ModalDelete
          open={modalDelete}
          onClose={() => {
            setIdDelete("");
            closeModalDelete();
          }}
          closePopupAction={false}
          title="Are you sure that you want to remove this ticket?"
          content="This Ticket will be removed to Trash. You can check removed tickets in the Trash"
          loadingConfirm={processing}
          deleteAction={() => {
            if (idDelete) {
              deleteTicketApi([idDelete]);
            }
          }}
        />
        <LegacyCard>
          <IndexTable
            resourceName={{ singular: name, plural: name }}
            itemCount={data?.length || 0}
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
              { title: "Ticket ID" },
              { title: "Ticket Title" },
              { title: name === "customer" ? "Assignee" : "Customer" },
              { title: "Channel" },
              { title: "Priority" },
              { title: "Last Update" },
              { title: "Action" },
            ]}
            sortable={[true, true, true, true, true, true, false]}
            sortDirection={direction}
            sortColumnIndex={indexSort}
            onSort={handleSort}
            lastColumnSticky
          >
            {rowMarkup}
          </IndexTable>
          <div>
            {meta?.totalCount ? (
              <div className={styles.wrapPagination}>
                {meta?.totalCount && (
                  <>
                    <div className="col-span-3 flex justify-center">
                      <Pagination
                        total={meta.totalCount}
                        pageSize={limit ?? 0}
                        currentPage={meta.page}
                        onChangePage={(page) => onChangePagination(page)}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </LegacyCard>
      </div>
    );
  }
);
