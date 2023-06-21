import {
  createdDatetimeFormat,
  upperCaseFirst,
  useUser,
} from "@moose-desk/core";
import { Agent, Conversation, Ticket } from "@moose-desk/repo";
import { Divider, Table } from "antd";
import moment from "moment";
import { FC, useMemo } from "react";
interface ItemConversation {
  id: string;
  conversations: Conversation[];
}
interface ExportTicketProps {
  tickets: Ticket[];
  selectedRowKeys: React.Key[];
  agents: Agent[];
  conversations: ItemConversation[];
  timezone: string;
}

export const ExportTicket: FC<ExportTicketProps> = ({
  tickets,
  selectedRowKeys,
  agents,
  conversations,
  timezone,
}) => {
  const user: any = useUser();
  const filterItem = useMemo(() => {
    return tickets.filter((item) => selectedRowKeys.includes(item._id));
  }, [selectedRowKeys, tickets]);
  const recordText = useMemo(() => {
    if (!filterItem.length) return "";
    if (filterItem.length === 1) return "1 Record";
    return `${filterItem.length} Records`;
  }, [filterItem]);

  const columns = [
    {
      title: "#",
      dataIndex: "ticketId",
      key: "ticketId",
      render: (_: any, record: Ticket) => (
        <span className="cursor-pointer hover:underline hover:text-blue-500">
          {`${record.ticketId}`}
        </span>
      ),
    },
    {
      title: "Ticket Title",
      dataIndex: "subject",
      key: "subject",
      render: (_: any, record: Ticket) => (
        <span className="cursor-pointer hover:underline hover:text-blue-500 subject">{`${record.subject}`}</span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (_: any, record: Ticket) => {
        if (record.createdViaWidget || record.incoming) {
          return (
            <span className="subject">{`${record?.fromEmail.email}`}</span>
          );
        }
        return (
          <span className="subject">{`${record?.toEmails[0]?.email}`}</span>
        );
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_: any, record: Ticket) => {
        return (
          <div className="flex flex-col wrap gap-2">
            {record.tags?.slice(-2).map((item, index) => (
              <span className="tag-item" key={item + index}>
                #{item}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Last Update",
      dataIndex: "updatedDatetime",
      key: "updatedDatetime",
      render: (_: any, record: Ticket) => (
        <span>{createdDatetimeFormat(record.updatedDatetime, timezone)}</span>
      ),
    },
  ];

  const regexQuote = /<div dir="ltr".*?<\/div><br>/s;

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
        <Divider />
      </div>
    );
  };

  const createPage = (item: Ticket) => {
    const findItemAgentName = agents.find((agent: Agent) => {
      return agent._id === item.agentObjectId;
    });
    const conversation = conversations.find(
      (conversation) => conversation.id === item._id
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
        <Divider />
        {conversationMapping?.map((one: any) => itemConversation(one))}
      </div>
    );
  };

  return (
    <div className="p-5">
      {" "}
      <p>Date: {moment().format("MM/DD/YYYY HH:mm:ss")}</p>
      <p>
        Exported by: {user?.family_name} {user?.given_name}
      </p>
      <Table pagination={false} columns={columns} dataSource={filterItem} />
      <div className="flex justify-end mt-5">
        <p>{recordText}</p>
      </div>
      {filterItem?.map((item) => createPage(item))}
    </div>
  );
};
