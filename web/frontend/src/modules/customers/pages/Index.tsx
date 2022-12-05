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
import useTable from "src/core/hooks/useTable";
import { BaseListRequest } from "src/models/Request";
import { Customer } from "src/modules/customers/modal/Customer";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
export default function CustomerIndexPage() {
  const param = useParams();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState<Customer>(customers);

  const rowMarkup = customers.map((customer, index) => (
    <IndexTable.Row
      id={customer._id}
      key={`${customer._id}`}
      selected={selectedResources.includes(customer._id)}
      position={index}
      onClick={() => navigateShowDetails(customer._id)}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {`${customer.firstName} ${customer.lastName}`}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{customer.email}</IndexTable.Cell>
      <IndexTable.Cell>{customer.storeId}</IndexTable.Cell>
    </IndexTable.Row>
  ));

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);

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
  const [email, setEmail] = useState<string>("");
  const navigateShowDetails = useCallback((id: string) => {
    navigate(CustomersRoutePaths.Details, {
      state: {
        id: id,
      },
    });
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
  const promotedBulkActions = [
    {
      content: "Remove customer",
      onAction: () => handleRemoveCustomer(selectedResources),
    },
  ];
  const { page, setPage, rowsPerPage } = useTable({
    defaultRowsPerPage: env.DEFAULT_PAGE_SIZE,
  });
  const [filterData, setFilterData] = useState<BaseListRequest>(
    !isEmpty(param)
      ? {
          page: page ? Number(page) : 0,
          limit: rowsPerPage ? Number(rowsPerPage) : env.DEFAULT_PAGE_SIZE,
        }
      : {
          page: 0,
          limit: env.DEFAULT_PAGE_SIZE,
        }
  );
  const handleRemoveCustomer = useCallback((id: string[]) => {}, []);
  const { run: fetchListStaticPosts, result } = useJob(
    () => {
      return CustomerRepository.getList(filterData).pipe(
        map(({ data }) => {
          setCustomers(data.data);
          return data;
        })
      );
    },
    { showLoading: false }
  );

  useEffect(() => {
    setPage(0);
    fetchListStaticPosts();
  }, [filterData]);

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
            if (page > 0) {
              setPage(page - 1);
            }
          }}
          hasNext
          onNext={() => {
            if (
              page <
              (result ? result.metadata.totalCount / env.DEFAULT_PAGE_SIZE : 1)
            ) {
              setPage(page + 1);
            }
          }}
          label={`${customers.length} / ${customers.length}`}
          nextTooltip={"Next"}
        />
      </div>
    </Page>
  );
}
