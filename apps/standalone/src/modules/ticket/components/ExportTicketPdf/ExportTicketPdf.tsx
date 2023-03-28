import { useUser } from "@moose-desk/core";
import { Agent, Conversation, Tag, Ticket } from "@moose-desk/repo";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { FC, useMemo } from "react";
interface ItemConversation {
  id: string;
  conversations: Conversation[];
}
interface ExportTicketPdfProps {
  tickets: Ticket[];
  selectedRowKeys: React.Key[];
  tags: Tag[];
  agents: Agent[];
  conversations: ItemConversation[];
}
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    borderBottom: "1pt solid black",
  },
  label: {
    width: "30%",
    textAlign: "right",
    marginRight: 10,
    paddingRight: 10,
    borderRight: "1pt solid black",
  },
  value: {
    width: "70%",
    paddingLeft: 10,
  },
});
const regexQuote = /<div dir="ltr".*?<\/div><br>/s;
export const ExportTicketPdf: FC<ExportTicketPdfProps> = ({
  tickets,
  selectedRowKeys,
  tags,
  agents,
  conversations,
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

  const tableStyle: any = {
    display: "table",
    width: "auto",
  };

  const tableRowStyle: any = {
    flexDirection: "row",
    backgroundColor: "white",
  };

  const firstTableColHeaderStyle: any = {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    backgroundColor: "#bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const firstTableColStyle: any = {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderTopWidth: 0,
  };

  const tableCellHeaderStyle: any = {
    textAlign: "center",

    fontSize: 12,
    fontWeight: "bold",
    whiteSpace: "nowrap",
  };

  const tableCellStyle: any = {
    textAlign: "center",
    margin: 2,
    fontSize: 12,
  };

  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={{ ...firstTableColHeaderStyle, flexBasis: 70 }}>
          <Text style={tableCellHeaderStyle}>Ticket</Text>
          <Text style={tableCellHeaderStyle}>Number</Text>
        </View>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Ticket Title</Text>
        </View>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Customer</Text>
        </View>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Tags</Text>
        </View>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Priority</Text>
        </View>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Last Update</Text>
        </View>
      </View>
    );
  };
  const MyHr = () => (
    <View style={styles.container}>
      <View style={styles.label} />
      <View style={styles.value} />
    </View>
  );
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
            .format("HH:mm DD/MM/YYYY Z"),
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
        .format("HH:mm DD/MM/YYYY Z"),
      chat: item.description,
    });
    return (
      <Page
        key={item._id}
        size="A4"
        style={{ paddingRight: 20, paddingLeft: 20 }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text>{`Ticket ${item.ticketId}: ${item.subject}`}</Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 13 }}>Status: {item.status}</Text>
          <Text style={{ fontSize: 13 }}>
            Assignee: {findItemAgentName?.email}
          </Text>
          <Text style={{ fontSize: 13 }}>Priority {item.priority}</Text>
        </View>
        <View style={{ marginTop: 20 }}></View>
        <MyHr />
        {conversationMapping?.map((one: any) => itemConversation(one))}
      </Page>
    );
  };

  const itemConversation = (one: any) => {
    const removeQuote = one.chat.match(regexQuote)
      ? one.chat.match(regexQuote)[0]
      : one.chat;
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(removeQuote, "text/html");
    const plainText = parsedHtml.body.textContent;
    return (
      <View key={one.id}>
        <View>
          <Text style={{ fontSize: 16 }}>{one?.name}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 12, color: "gray" }}>{one?.email}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>{plainText}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          <Text style={{ flex: 1 }}></Text>
          <Text style={{ fontSize: 12 }}>{one?.time}</Text>
        </View>
        <MyHr />
      </View>
    );
  };

  const createTableRow = (item: Ticket) => {
    const condition = item.createdViaWidget || item.incoming;
    const customerName = condition
      ? item.fromEmail.email
      : item.toEmails[0].email;
    const filterItemTag = tags.filter((tag: Tag) =>
      item.tags?.slice(-2).includes(tag._id)
    );

    return (
      <View key={item._id} style={tableRowStyle}>
        <View style={{ ...firstTableColStyle, flexBasis: 70 }}>
          <Text style={tableCellStyle}>{item.ticketId}</Text>
        </View>
        <View style={firstTableColStyle}>
          <Text style={tableCellStyle}>{item.subject}</Text>
        </View>
        <View style={firstTableColStyle}>
          <Text wrap={false} style={tableCellStyle}>
            {customerName}
          </Text>
        </View>
        <View style={firstTableColStyle}>
          {filterItemTag.map((itemTag) => (
            <Text style={tableCellStyle} key={itemTag._id}>
              #{itemTag.name}
            </Text>
          ))}
        </View>
        <View style={firstTableColStyle}>
          <Text style={tableCellStyle}>{item.priority}</Text>
        </View>
        <View style={firstTableColStyle}>
          <Text style={tableCellStyle}>
            {item.updatedDatetime
              ? moment(item.updatedDatetime).format("DD/MM/YYYY")
              : ""}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="portrait">
        <View style={tableStyle}>
          <Text style={{ fontSize: 14, marginTop: 30, fontWeight: "bold" }}>
            Date: {moment().format("DD-MM-YYYY HH:mm:ss")}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              marginBottom: 30,
              fontWeight: "bold",
            }}
          >
            Exported by: {user?.family_name} {user?.given_name}
          </Text>
          {createTableHeader()}
          {filterItem?.map((item) => createTableRow(item))}
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 70 }}
          >
            <Text style={{ flex: 1 }}></Text>
            <Text style={{ fontSize: 14, marginRight: 10, marginTop: 10 }}>
              {recordText}
            </Text>
          </View>
        </View>
      </Page>
      {filterItem?.map((item) => createPage(item))}
    </Document>
  );
};
