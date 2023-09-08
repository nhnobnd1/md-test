import {
  createdDatetimeFormat,
  generatePath,
  priorityToTagShopify,
  typeChannelTicket,
  upperCaseFirst,
  useNavigate,
} from "@moose-desk/core";
import { StatusTicket } from "@moose-desk/repo";
import { Badge, ButtonGroup, IndexTable, Text } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
interface IProps {
  data: any;
}
export const TicketTable = React.memo(({ data }: IProps) => {
  const navigate = useNavigate();
  const { subDomain } = useSubdomain();
  const { timezone }: any = useGlobalData(false, subDomain || "");
  const [idDelete, setIdDelete] = useState("");
  const handleOpenModalDelete = useCallback((id: string) => {
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
                  navigate(generatePath(TicketRoutePaths.Detail, { id: _id }));
                }}
              ></ButtonEdit>
              <ButtonDelete isTable onClick={() => handleOpenModalDelete(_id)}>
                Remove
              </ButtonDelete>
            </div>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  return <div>TicketTable</div>;
});
