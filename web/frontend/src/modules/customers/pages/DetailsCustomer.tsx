import {
  Card,
  Filters,
  IndexTable,
  Text,
  TextField,
  useIndexResourceState,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

export default function IndexTableWithFilteringExample() {
  const customers = [
    {
      id: "3416",
      url: "customers/341",
      name: "Mae Jemison",
      location: "Decatur, USA",
      orders: 20,
      amountSpent: "$2,400",
    },
  ];
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);
  const [taggedWith, setTaggedWith] = useState("VIP");
  const [queryValue, setQueryValue] = useState("");

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  const filters = [
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];
  const rowMarkup = customers.map(
    ({ id, name, location, orders, amountSpent }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card>
      <div style={{ padding: "16px", display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Filters
            queryValue={queryValue}
            filters={filters}
            onQueryChange={setQueryValue}
            onQueryClear={handleQueryValueRemove}
            onClearAll={handleClearAll}
          />
        </div>
      </div>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Name" },
          { title: "Location" },
          { title: "Order count" },
          { title: "Amount spent" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}
