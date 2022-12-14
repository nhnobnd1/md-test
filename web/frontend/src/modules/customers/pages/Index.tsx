import {
  Button,
  Card,
  IndexTable,
  Link,
  Page,
  Pagination,
  Text,
  TextField,
  Toast,
  useIndexResourceState,
} from "@shopify/polaris";
import { isEmpty } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import env from "src/core/env";
import { useDebounceFn, useJob } from "src/core/hooks";
import useTable from "src/core/hooks/useTable";
import useAuth from "src/hooks/useAuth";
import { BaseListRequest } from "src/models/Request";
import { Customer } from "src/modules/customers/modal/Customer";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
export default function CustomerIndexPage() {
  const param = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("user", user);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState<Customer>(customers);

  const rowMarkup = customers.map(
    ({ _id, firstName, lastName, email, storeId }, index) => (
      <IndexTable.Row
        id={_id}
        key={_id}
        selected={selectedResources.includes(_id)}
        position={index}
      >
        <IndexTable.Cell>
          <Link dataPrimaryLink onClick={() => navigateShowDetails(_id)}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {`${firstName} ${lastName}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{email}</IndexTable.Cell>
        <IndexTable.Cell>{storeId}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const handleSearchChange = (value: string) => {
    setFilterData(() => ({
      ...filterData,
      query: value,
    }));
  };
  const navigateCreate = () => {
    return navigate(CustomersRoutePaths.Create);
  };
  const navigateShowDetails = useCallback((id: string) => {
    navigate(generatePath(CustomersRoutePaths.Details, { id }));
  }, []);
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
          page: page ? Number(page) : 1,
          limit: rowsPerPage ? Number(rowsPerPage) : env.DEFAULT_PAGE_SIZE,
          query: "",
        }
      : {
          page: 1,
          limit: env.DEFAULT_PAGE_SIZE,
        }
  );

  const toast = active ? (
    <Toast
      content={message}
      duration={1000}
      onDismiss={() => {
        setActive(false);
      }}
      error={error}
    />
  ) : null;

  const { run: handleRemoveCustomer } = useJob((dataDelete: string[]) => {
    return CustomerRepository.delete({ ids: dataDelete }).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          setMessage("Delete customer success");
          setActive(true);
        } else {
          setMessage("Delete customer failed");
          setError(true);
          setActive(true);
        }
      }),
      catchError((error) => {
        setMessage("Delete customer failed");
        setError(true);
        setActive(true);
        return of(error);
      })
    );
  });
  const { run: fetchListStaticPosts, result } = useJob(
    () => {
      return CustomerRepository.getList(filterData).pipe(
        map(({ data }) => {
          setCustomers(
            data.data.map((item) => ({
              ...item,
              id: item._id,
            }))
          );
          return data;
        })
      );
    },
    { showLoading: false }
  );
  const { run: callAPI } = useDebounceFn(() => fetchListStaticPosts(), {
    wait: 300,
  });

  useEffect(() => {
    setPage(0);
    callAPI();
  }, [filterData]);

  return (
    <>
      <Page title="Customer" subtitle="List of customer" compactTitle fullWidth>
        <Card sectioned>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="w-3/4 relative">
                <TextField
                  value={filterData.query}
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
          {customers.length > 10 ? (
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
                  (result
                    ? result.metadata.totalCount / env.DEFAULT_PAGE_SIZE
                    : 1)
                ) {
                  setPage(page + 1);
                }
              }}
              label={`${page} / ${customers.length / env.DEFAULT_PAGE_SIZE}`}
              nextTooltip={"Next"}
            />
          ) : null}
        </div>
      </Page>
      {toast}
    </>
  );
}
