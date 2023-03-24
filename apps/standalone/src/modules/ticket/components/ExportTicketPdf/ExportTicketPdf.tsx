import { Tag, Ticket } from "@moose-desk/repo";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import { FC } from "react";
interface ExportTicketPdfProps {
  tickets: Ticket[];
  selectedRowKeys: React.Key[];
  tags: Tag[];
}
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const ExportTicketPdf: FC<ExportTicketPdfProps> = ({
  tickets,
  selectedRowKeys,
  tags,
}) => {
  const pageStyle: any = {
    paddingTop: 16,
    paddingHorizontal: 40,
    paddingBottom: 56,
  };

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

  const tableColHeaderStyle: any = {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    backgroundColor: "#bdbdbd",
  };

  const firstTableColStyle: any = {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderTopWidth: 0,
  };

  const tableColStyle = {
    width: "20%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  };

  const tableCellHeaderStyle: any = {
    textAlign: "center",

    fontSize: 8,
    fontWeight: "bold",
    whiteSpace: "nowrap",
  };

  const tableCellStyle: any = {
    textAlign: "center",
    margin: 2,
    fontSize: 8,
    whiteSpace: "nowrap",
  };
  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={{ ...firstTableColHeaderStyle, flexBasis: 70 }}>
          <Text style={tableCellHeaderStyle}>Ticket Number</Text>
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
  const createTableRow = (item: Ticket) => {
    const condition = item.createdViaWidget || item.incoming;
    const customerName = condition
      ? item.fromEmail.email
      : item.toEmails[0].email;
    const filterItemTag = tags.filter((tag: Tag) =>
      item.tags?.slice(-2).includes(tag._id)
    );

    return (
      <View style={tableRowStyle}>
        <View style={{ ...firstTableColStyle, flexBasis: 70 }}>
          <Text style={tableCellStyle}>{item.ticketId}</Text>
        </View>
        <View style={firstTableColStyle}>
          <Text style={tableCellStyle}>{item.subject}</Text>
        </View>
        <View style={firstTableColStyle}>
          <Text style={tableCellStyle}>{customerName}</Text>
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
              ? moment(item.updatedDatetime).format("HH:mm DD/MM/YYYY")
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
          {createTableHeader()}
          {tickets
            .filter((item) => selectedRowKeys.includes(item._id))
            .map((item) => createTableRow(item))}
        </View>
      </Page>
    </Document>
  );
};
