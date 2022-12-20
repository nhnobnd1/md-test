import {
  ActionList,
  Button,
  Card,
  DataTable,
  Form,
  Page,
  Pagination,
  TextField,
  TopBar,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

export default function DashboardIndexPage() {
  const rows = [
    ["John Doe", 22, "0123456789", 140, "$122,500.00"],
    ["Jane", 22, "0123456789", 83, "$19,090.00"],
    ["Bla bla", 33, "0123456789", 32, "$14,240.00"],
  ];
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );
  const handleSubmit = () => {};
  const handleSearchChange = (value: any) => {
    setEmail(value);
  };
  const navigateCreate = () => {};
  const [email, setEmail] = useState("");

  return (
    <Page title="Customer" subtitle="List of customer" compactTitle>
      <Card sectioned>
        <Form onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <TextField
              value={email}
              onChange={handleSearchChange}
              placeholder="Search customer"
              type="search"
              autoComplete="search"
              label
            />
            <div className="ml-8">
              <Button onClick={navigateCreate} primary>
                Add new
              </Button>
            </div>
          </div>
        </Form>
        <DataTable
          columnContentTypes={[
            "text",
            "numeric",
            "numeric",
            "numeric",
            "numeric",
          ]}
          headings={[
            "Customer",
            "Age",
            "Phone Number",
            "Net quantity",
            "Net sales",
          ]}
          rows={rows}
        />
        <div className="flex items-center justify-center mt-4">
          <Pagination
            hasPrevious
            onPrevious={() => {}}
            hasNext
            onNext={() => {}}
            label={`${rows.length} / ${rows.length}`}
            nextTooltip="Next"
          />
        </div>
      </Card>
    </Page>
  );
}
