import {
  Badge,
  IndexTable,
  LegacyCard,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
const orders = [
  {
    id: "1020",
    order: "#1020",
    date: "Jul 20 at 4:34pm",
    customer: "Jaydon Stanton",
    total: "$969.44",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1019",
    order: "#1019",
    date: "Jul 20 at 3:46pm",
    customer: "Ruben Westerfelt",
    total: "$701.19",
    paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
  {
    id: "1018",
    order: "#1018",
    date: "Jul 20 at 3.44pm",
    customer: "Leo Carder",
    total: "$798.24",
    paymentStatus: <Badge progress="complete">Paid</Badge>,
    fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
  },
];
const resourceName = {
  singular: "order",
  plural: "orders",
};
function ExampleTableWithSort() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={index}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>{total}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  const handleSort = (headingIndex: number) => {
    setIndexSort(Number(headingIndex));
    setToggle((pre) => !pre);
    setDirection(!toggle ? "descending" : "ascending");
  };
  useEffect(() => {
    // for reset sort when click different heading, fix bug: have to click twice to sort
    setDirection("ascending");
    setToggle(false);
  }, [indexSort]);
  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Order" },
          { title: "Date" },
          { title: "Customer" },
          { title: "Total" },
          { title: "Payment status" },
          { title: "Fulfillment status" },
        ]}
        sortDirection={direction}
        sortColumnIndex={indexSort}
        onSort={handleSort}
        sortable={[true, true, true, true, false, false]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}

export default ExampleTableWithSort;