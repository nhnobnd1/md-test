import { Empty, Table as ATable, TableProps as ATableProps } from "antd";
import { Loading } from "src/components/Loading";
import styles from "./style.module.scss";

interface TableProps extends ATableProps<any> {}

export const Table = (props: TableProps) => {
  return (
    <ATable
      scroll={{ x: 512 }}
      className={styles.MDTable}
      pagination={false}
      sortDirections={["ascend", "descend", "ascend"]}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Sorry!, There is no records matched with your search
                  criteria."
          />
        ),
      }}
      {...props}
      rowKey={props.rowKey ?? "_id"}
      showSorterTooltip={false}
      loading={{
        indicator: <Loading />,
        spinning: typeof props.loading === "boolean" ? props.loading : false,
      }}
    />
  );
};

Table.Column = ATable.Column;
Table.ColumnGroup = ATable.ColumnGroup;
Table.EXPAND_COLUMN = ATable.EXPAND_COLUMN;
Table.SELECTION_ALL = ATable.SELECTION_ALL;
Table.SELECTION_COLUMN = ATable.SELECTION_COLUMN;
Table.SELECTION_INVERT = ATable.SELECTION_INVERT;
Table.SELECTION_NONE = ATable.SELECTION_NONE;

export default Table;
