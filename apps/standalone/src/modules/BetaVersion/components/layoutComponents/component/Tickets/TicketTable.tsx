import { getTableHeigh } from "@moose-beta/helper/function";
import {
  createdDatetimeFormat,
  generatePath,
  priorityToTag,
  typeChannelTicket,
  upperCaseFirst,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { StatusTicket, Ticket, TicketRepository } from "@moose-desk/repo";
import { TableProps, Tag as TagAntd } from "antd";
import { SorterResult } from "antd/es/table/interface";
import env from "src/core/env";

import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import useMessage from "src/hooks/useMessage";
import { useSubdomain } from "src/hooks/useSubdomain";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface IProps {
  type: "ticket" | "customer";
  data: any;
  loading: boolean;
  meta: any;
  page: number;
  limit: number;
  onPaginationChange: ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => void;
  onRefetch: () => void;
  onChangeTable: (
    sortBy: string | undefined,
    sortOrder: string | undefined
  ) => void;
}
export const TicketTable = React.memo(
  ({
    type,
    data,
    loading,
    meta,
    page,
    limit,
    onRefetch,
    onPaginationChange,
    onChangeTable,
  }: IProps) => {
    const navigate = useNavigate();
    const message = useMessage();
    const { t } = useTranslation();
    const { subDomain } = useSubdomain();
    const { timezone } = useGlobalData(false, subDomain || "");
    const handleEdit = (record: Ticket) => {
      navigate(generatePath(TicketRoutePaths.Detail, { id: record._id }));
    };
    const { run: deleteTicketApi } = useJob((id: string[]) => {
      message.loading.show(t("messages:loading.removing_ticket"));

      return TicketRepository()
        .delete({
          ids: id,
        })
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              message.success(t("messages:success.delete_ticket"));

              onRefetch();
            } else {
              message.error(t("messages:error.delete_ticket"));
            }
          }),
          catchError((err) => {
            message.error(t("messages:error.delete_ticket"));
            return of(err);
          })
        );
    });
    const handleDelete = useCallback((ticket: any) => {
      deleteTicketApi([ticket._id]);
    }, []);

    const handleChangeTable = useCallback(
      (pagination: any, filters: any, sorter: SorterResult<any>) => {
        if (sorter.order && sorter.columnKey) {
          onChangeTable(
            sorter.columnKey as string,
            sorter.order === "ascend" ? "1" : "-1"
          );
        } else {
          onChangeTable(undefined, undefined);
        }
      },
      [onChangeTable]
    ) as TableProps<any>["onChange"];
    const headerSettingEl = document.getElementById("md_my_profile");
    const tabHeaderEl = document.querySelector(".ant-tabs-nav-wrap");
    const screenHeight = window.innerHeight;
    return (
      <div>
        <Table
          dataSource={data}
          scroll={{
            x: 1024,
            y:
              getTableHeigh(
                screenHeight,
                headerSettingEl?.clientHeight,
                tabHeaderEl?.clientHeight
              ) - 40,
          }}
          loading={loading}
          onChange={handleChangeTable}
        >
          <Table.Column
            key="ticketId"
            title="Ticket ID"
            render={(_, record: Ticket) => (
              <span
                className={`cursor-pointer hover:underline hover:text-blue-500 ${
                  record.status === StatusTicket.NEW && "text-bold"
                }`}
                onClick={() => handleEdit(record)}
              >
                {`${record.ticketId}`}
              </span>
            )}
            sorter={{
              compare: (a: Ticket, b: Ticket) => a.ticketId - b.ticketId,
            }}
            width="10%"
          ></Table.Column>
          <Table.Column
            ellipsis={true}
            key="subject"
            title="Ticket Title"
            render={(_, record: Ticket) => (
              <span
                className={`cursor-pointer hover:underline hover:text-blue-500  ${
                  record.status === StatusTicket.NEW && "text-bold"
                }`}
                onClick={() => handleEdit(record)}
              >{`${record.subject}`}</span>
            )}
            sorter={{
              compare: (a: any, b: any) => a.subject - b.subject,
            }}
            width="25%"
          ></Table.Column>
          {type === "customer" ? (
            <Table.Column
              ellipsis={true}
              key="agentEmail"
              dataIndex="agentEmail"
              title="Assignee"
              width="20%"
              sorter={{
                compare: (a: any, b: any) => {
                  return a?.agentEmail - b?.agentEmail;
                },
              }}
            ></Table.Column>
          ) : (
            <Table.Column
              ellipsis={true}
              key={"customer"}
              title={"Customer"}
              render={(_, record: Ticket) => {
                if (record.createdViaWidget || record.incoming) {
                  return (
                    <span className="">{`${
                      record?.fromEmail.name
                        ? record?.fromEmail.name
                        : record?.fromEmail.email
                    }`}</span>
                  );
                }
                return (
                  <span className="">{`${
                    record?.toEmails[0]?.name
                      ? record?.toEmails[0]?.name
                      : record?.toEmails[0]?.email
                  }`}</span>
                );
              }}
              width="20%"
              sorter={{
                compare: (a: any, b: any) => {
                  const condition1 = a.createdViaWidget || a.incoming;
                  const express1 = condition1
                    ? a.fromEmail?.email
                    : a.toEmails[0]?.email;
                  const condition2 = b.createdViaWidget || b.incoming;
                  const express2 = condition2
                    ? b.fromEmail?.email
                    : b.toEmails[0]?.email;
                  return express1 - express2;
                },
              }}
            ></Table.Column>
          )}
          <Table.Column
            key="createdViaWidget"
            title="Channel"
            render={(_, record: Ticket) => {
              return (
                <TagAntd color={typeChannelTicket(record.createdViaWidget)}>{`${
                  record.createdViaWidget ? "Via widget" : "Email"
                }`}</TagAntd>
              );
            }}
            sorter={{
              compare: (a: any, b: any) => a.tags - b.tags,
            }}
            width="10%"
          ></Table.Column>
          <Table.Column
            key="priority"
            title="Priority"
            render={(_, record: Ticket) => (
              <TagAntd
                color={priorityToTag(record.priority)}
              >{`${upperCaseFirst(record.priority)}`}</TagAntd>
            )}
            sorter={{
              compare: (a: any, b: any) => a.priority - b.priority,
            }}
            width="10%"
          ></Table.Column>
          <Table.Column
            key="updatedTimestamp"
            title="Last Update"
            render={(_, record: Ticket) => (
              <span>
                {createdDatetimeFormat(record.updatedDatetime, timezone)}
              </span>
            )}
            sorter={{
              compare: (a: any, b: any) =>
                a.updatedDatetime - b.updatedDatetime,
            }}
            width="15%"
          ></Table.Column>
          <Table.Column
            align="center"
            title="Action"
            render={(_, record: Ticket) => (
              <TableAction
                record={record}
                edit
                onEdit={handleEdit}
                specialDelete={{
                  title: "Are you sure that you want to remove this ticket?",
                  description:
                    "This Ticket will be removed to Trash. You can check removed tickets in the Trash",
                  textDelete: "Remove",
                }}
                onSpecialDelete={handleDelete}
                onlyIcon
              />
            )}
            width="10%"
          />
        </Table>
        {meta?.totalCount
          ? meta && (
              <div className="flex justify-end items-end bg-white rounded-br-md rounded-bl-md pb-2 pr-4">
                <Pagination
                  className="mt-2 pt-2 flex justify-end flex-wrap"
                  currentPage={page ?? 1}
                  total={meta?.totalCount}
                  pageSize={limit ?? env.DEFAULT_PAGE_SIZE}
                  onChange={onPaginationChange}
                />
              </div>
            )
          : null}
      </div>
    );
  }
);
