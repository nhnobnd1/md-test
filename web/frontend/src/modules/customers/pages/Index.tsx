import {
  ActionList,
  Button,
  Card,
  Form,
  IndexTable,
  Page,
  Pagination,
  Text,
  TextField,
  TopBar,
  useIndexResourceState,
} from "@shopify/polaris";
import { isEmpty } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { map } from "rxjs";
import env from "src/core/env";
import { useJob } from "src/core/hooks";
import { BaseListRequest } from "src/models/Request";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
export default function CustomerIndexPage() {
  const param = useParams();
  const navigate = useNavigate();
  const customers = [
    {
      id: "3411",
      url: "customers/341",
      name: "Mae Jemison",
      location: "Decatur, USA",
      orders: 20,
      amountSpent: "$2,400",
    },
    {
      id: "2561",
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
      orders: 30,
      amountSpent: "$140",
    },
  ];
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);

  const rowMarkup = customers.map(({ id, name, location, orders }, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      selected={selectedResources.includes(id)}
      position={index}
      onClick={() => navigateShowDetails(id)}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {name}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{location}</IndexTable.Cell>
      <IndexTable.Cell>{orders}</IndexTable.Cell>
    </IndexTable.Row>
  ));

  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const handleSubmit = () => {};
  const handleSearchChange = (value: any) => {
    setEmail(value);
  };
  const navigateCreate = () => {
    return navigate(CustomersRoutePaths.Create);
  };
  const [email, setEmail] = useState("");
  const navigateShowDetails = (id: string) => {
    console.log("hihihi");

    navigate(CustomersRoutePaths.Details, {
      state: id,
    });
  };
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
  const promotedBulkActions = [
    {
      content: "Remove customer",
      onAction: () => console.log("remove customer"),
    },
  ];
  const [filterData, setFilterData] = useState<BaseListRequest>(
    !isEmpty(param)
      ? {
          page: 0,
          limit: env.DEFAULT_PAGE_SIZE,
        }
      : {
          page: 0,
          limit: env.DEFAULT_PAGE_SIZE,
        }
  );
  useEffect(() => {
    fetchListStaticPosts();
  }, [filterData]);

  const { run: fetchListStaticPosts, result } = useJob(
    () => {
      console.log(111111111111111);
      console.log(filterData);

      return CustomerRepository.getList(filterData).pipe(
        map((data) => {
          console.log(3333333333);

          console.log("dataFetch", data);
          return data;
        })
      );
    },
    { showLoading: false }
  );
  return (
    <Page title="Customer" subtitle="List of customer" compactTitle fullWidth>
      <Card sectioned>
        <div className="mb-4">
          <Form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
              <div className="w-3/4 relative">
                <TextField
                  value={email}
                  onChange={handleSearchChange}
                  placeholder="Search customer"
                  type="search"
                  autoComplete="search"
                  label
                />
              </div>
              <Button onClick={navigateCreate} primary>
                {"Add new"}
              </Button>
            </div>
          </Form>
        </div>
        <IndexTable
          resourceName={resourceName}
          itemCount={customers.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Customer name" },
            { title: "Email" },
            { title: "Number of tickets" },
          ]}
          hasMoreItems
          promotedBulkActions={promotedBulkActions}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
      <div className="flex items-center justify-center mt-4">
        <Pagination
          hasPrevious
          onPrevious={() => {
            console.log("Previous");
          }}
          hasNext
          onNext={() => {
            console.log("Next");
          }}
          label={`${customers.length} / ${customers.length}`}
          nextTooltip={"Next"}
        />
      </div>
    </Page>
  );
}
