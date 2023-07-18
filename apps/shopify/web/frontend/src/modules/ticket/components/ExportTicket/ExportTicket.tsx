import { createdDatetimeFormat, upperCaseFirst } from "@moose-desk/core";
import { Agent, Conversation, Ticket } from "@moose-desk/repo";
import { Divider, IndexTable, Text } from "@shopify/polaris";

import moment from "moment";
import { FC, useMemo } from "react";
import { ItemConversation } from "src/modules/ticket/helper/interface";
import useTicketSelected from "src/modules/ticket/store/useTicketSelected";
import useUser from "src/store/useUser";

interface ExportTicketProps {
  // tickets: Ticket[];
  selectedRowKeys: React.Key[];
  agents: Agent[];
  conversations: ItemConversation[];
  timezone: string;
}

export const ExportTicket: FC<ExportTicketProps> = ({
  selectedRowKeys,
  agents,
  conversations,
  timezone,
}) => {
  const tickets = useTicketSelected((state) => state.needTicket);
  const user = useUser((state) => state.user);

  const filterItem = useMemo(() => {
    return tickets.filter((item) => selectedRowKeys.includes(item._id));
  }, [selectedRowKeys, tickets]);
  const recordText = useMemo(() => {
    if (!filterItem.length) return "";
    if (filterItem.length === 1) return "1 Record";
    return `${filterItem.length} Records`;
  }, [filterItem]);

  const itemConversation = (one: any) => {
    return (
      <div key={one.id}>
        <div>
          <p>{one?.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">{one?.email}</p>
        </div>
        <div style={{ marginTop: 20 }}>
          <div
            className="text-black text-scroll mt-5"
            dangerouslySetInnerHTML={{
              __html: one.chat,
            }}
          />
        </div>
        <div className="flex justify-end">
          <p>{one?.time}</p>
        </div>
        <div className="mt-5">
          <Divider />
        </div>
      </div>
    );
  };

  const createPage = (item: Ticket) => {
    const findItemAgentName = agents.find((agent: Agent) => {
      return agent._id === item.agentObjectId;
    });
    const conversation = conversations.find(
      (conversation) => conversation?.id === item._id
    );
    const conversationMapping: any = conversation?.conversations.map(
      (one: Conversation) => {
        return {
          id: one._id,
          name: one.fromEmail?.name,
          email: one.fromEmail?.email,
          time: moment
            .unix(one.createdTimestamp)
            .local()
            .format("HH:mm MM/DD/YYYY"),
          chat: one.description,
        };
      }
    );
    conversationMapping?.unshift({
      id: item._id,
      name: item.fromEmail.name,
      email: item.fromEmail.email,
      time: moment
        .unix(item.createdTimestamp)
        .local()
        .format("HH:mm MM/DD/YYYY"),
      chat: item.description,
    });
    return (
      <div key={item._id}>
        <div className="flex justify-center items-center mt-5">
          <p>{`Ticket ${item.ticketId}: ${item.subject}`}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Status: {item.status}</p>
          <p>Assignee: {findItemAgentName?.email}</p>
          <p>Priority: {upperCaseFirst(item.priority)}</p>
        </div>
        <div className="mt-5">
          <Divider />
        </div>
        {conversationMapping?.map((one: any) => itemConversation(one))}
      </div>
    );
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
      },
      index
    ) => (
      <IndexTable.Row id={_id} key={ticketId} position={index}>
        <IndexTable.Cell>
          <div className="hover:underline">
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {ticketId}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {
            <div className="hover:underline max-w-[200px] truncate">
              <Text variant="bodyMd" fontWeight="bold" as="span">
                {subject}
              </Text>
            </div>
          }
        </IndexTable.Cell>
        <IndexTable.Cell>
          <div className="max-w-[100px] truncate">
            {createdViaWidget || incoming ? (
              <span className="subject max-w[100px] truncate inline-block">{`${fromEmail.email}`}</span>
            ) : (
              <span className="subject max-w-[100px] truncate inline-block">{`${toEmails[0]?.email}`}</span>
            )}
          </div>
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
          {createdDatetimeFormat(updatedDatetime, timezone)}
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <div className="p-5">
      <p>Date: {moment().format("MM/DD/YYYY HH:mm:ss")}</p>
      <p>
        Exported by: {user?.family_name} {user?.given_name}
      </p>
      <IndexTable
        resourceName={{ singular: "ticket", plural: "tickets" }}
        itemCount={tickets?.length}
        headings={[
          { title: "Ticket ID" },
          { title: "Ticket Title" },
          { title: "Customer" },
          { title: "Tags" },
          { title: "Priority" },
          { title: "Last Update" },
        ]}
        selectable={false}
      >
        {rowMarkup}
      </IndexTable>
      <div className="flex justify-end mt-5">
        <p>{recordText}</p>
      </div>
      {filterItem?.map((item) => createPage(item))}
    </div>
  );
};
