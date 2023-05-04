import {
  createdDatetimeFormat,
  upperCaseFirst,
  useUser,
} from "@moose-desk/core";
import { Agent, Conversation, Ticket } from "@moose-desk/repo";
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";
import { FC, useMemo } from "react";
interface ItemConversation {
  id: string;
  conversations: Conversation[];
}
interface ExportTicketPdfProps {
  tickets: Ticket[];
  selectedRowKeys: React.Key[];
  agents: Agent[];
  conversations: ItemConversation[];
}
Font.register({
  family: "Roboto",
  src: "/font/RobotoRegular.ttf",
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",

    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
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

    fontSize: 10,
    fontWeight: "bold",
    whiteSpace: "nowrap",
    fontFamily: "Roboto",
  };

  const tableCellStyle: any = {
    textAlign: "center",
    margin: 2,
    fontSize: 10,
    fontFamily: "Roboto",
  };

  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={{ ...firstTableColHeaderStyle, flexBasis: 40 }}>
          <Text style={tableCellHeaderStyle}>#</Text>
        </View>
        <View style={{ ...firstTableColHeaderStyle, flexGrow: 1 }}>
          <Text style={tableCellHeaderStyle}>Ticket Title</Text>
        </View>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Customer</Text>
        </View>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Tags</Text>
        </View>
        <View style={{ ...firstTableColHeaderStyle, flexBasis: 60 }}>
          <Text style={tableCellHeaderStyle}>Priority</Text>
        </View>
        <View style={{ ...firstTableColHeaderStyle, flexBasis: 80 }}>
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
          <Text
            style={{ fontFamily: "Roboto" }}
          >{`Ticket ${item.ticketId}: ${item.subject}`}</Text>
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
          <Text style={{ fontSize: 11, fontFamily: "Roboto" }}>
            Status: {item.status}
          </Text>
          <Text style={{ fontSize: 11, fontFamily: "Roboto" }}>
            Assignee: {findItemAgentName?.email}
          </Text>
          <Text style={{ fontSize: 11, fontFamily: "Roboto" }}>
            Priority: {upperCaseFirst(item.priority)}
          </Text>
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
          <Text style={{ fontSize: 14, fontFamily: "Roboto" }}>
            {one?.name}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 8, color: "gray", fontFamily: "Roboto" }}>
            {one?.email}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "Roboto", fontSize: 12 }}>
            {plainText}
          </Text>
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
          <Text style={{ fontSize: 8, fontFamily: "Roboto" }}>{one?.time}</Text>
        </View>
        <MyHr />
      </View>
    );
  };
  function splitText(text: string, maxLength: number) {
    const result = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const slice = text.slice(currentIndex, currentIndex + maxLength);
      result.push(slice);
      currentIndex += maxLength;
    }

    return result;
  }

  const createTableRow = (item: Ticket) => {
    const condition = item.createdViaWidget || item.incoming;
    const customerName = condition
      ? item.fromEmail.email
      : item.toEmails[0].email;

    return (
      <View key={item._id} style={tableRowStyle}>
        <View style={{ ...firstTableColStyle, flexBasis: 40 }}>
          <Text wrap style={tableCellStyle}>
            {item.ticketId}
          </Text>
        </View>
        <View style={{ ...firstTableColStyle, flexGrow: 1 }}>
          <Text wrap style={tableCellStyle}>
            {item.subject}
          </Text>
        </View>
        <View style={{ ...firstTableColStyle, overflow: "hidden" }}>
          <Text wrap style={tableCellStyle}>
            {splitText(customerName, 7)}
          </Text>
        </View>
        <View style={firstTableColStyle}>
          {item.tags?.slice(-2).map((itemTag) => (
            <Text wrap style={tableCellStyle} key={itemTag}>
              #{itemTag}
            </Text>
          ))}
        </View>
        <View style={{ ...firstTableColStyle, flexBasis: 60 }}>
          <Text style={tableCellStyle}>{upperCaseFirst(item.priority)}</Text>
        </View>
        <View style={{ ...firstTableColStyle, flexBasis: 80 }}>
          <Text style={tableCellStyle}>
            {createdDatetimeFormat(item.updatedDatetime)}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              marginTop: 30,
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            Date: {moment().format("MM/DD/YYYY HH:mm:ss")}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 10,
              marginBottom: 30,
              fontWeight: "bold",
              fontFamily: "Roboto",
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
            <Text
              style={{
                fontSize: 12,
                marginRight: 10,
                marginTop: 10,
                fontFamily: "Roboto",
              }}
            >
              {recordText}
            </Text>
          </View>
        </View>
      </Page>
      {filterItem?.map((item) => createPage(item))}
    </Document>
  );
};
