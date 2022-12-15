import { useToast } from "@shopify/app-bridge-react";
import {
  Card,
  Filters,
  IndexTable,
  Link,
  Page,
  Pagination,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { isEmpty } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import env from "src/core/env";
import { useDebounceFn, useJob } from "src/core/hooks";
import useTable from "src/core/hooks/useTable";
import { BaseListRequest } from "src/models/Request";
import { Customer } from "src/modules/customers/modal/Customer";
import CustomerRepository from "src/modules/customers/repositories/CustomerRepository";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
export default function CustomerIndexPage() {
  const param = useParams();
  const navigate = useNavigate();
  const { show } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState<Customer>(customers);

  const rowMarkup = customers.map(
    ({ id, firstName, lastName, email, storeId }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell className="py-3">
          <Link
            monochrome
            dataPrimaryLink
            onClick={() => navigateShowDetails(id)}
            removeUnderline
          >
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {`${firstName} ${lastName}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">{email}</IndexTable.Cell>
        <IndexTable.Cell className="py-3">{storeId}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

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
  const defaultFilter = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
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
  const handleSearchChange = (value: string) => {
    setFilterData(() => ({
      ...filterData,
      query: value,
    }));
  };
  const handleQueryValueRemove = useCallback(() => {
    setFilterData((old) => {
      return {
        ...old,
        query: "",
      };
    });
  }, []);
  const resetFilterData = useCallback(() => {
    setFilterData(defaultFilter());
  }, []);

  const { run: handleRemoveCustomer } = useJob((dataDelete: string[]) => {
    return CustomerRepository.delete({ ids: dataDelete }).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          show("Delete customer success");
          fetchListCustomer();
        } else {
          show("Delete customer failed", {
            isError: true,
          });
        }
      }),
      catchError((error) => {
        show("Delete customer failed", {
          isError: true,
        });
        return of(error);
      })
    );
  });
  const { run: fetchListCustomer, result } = useJob(
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
  const { run: callAPI } = useDebounceFn(() => fetchListCustomer(), {
    wait: 300,
  });

  useEffect(() => {
    setPage(0);
    callAPI();
  }, [filterData]);

  return (
    <>
      <Page
        title="Customer"
        subtitle="List of customer"
        primaryAction={{
          content: "Add new",
          onAction: navigateCreate,
        }}
        compactTitle
        fullWidth
      >
        <Card sectioned>
          <div className="mb-4">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleSearchChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search customer"
              filters={[]}
              onClearAll={resetFilterData}
            />
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
    </>
  );
}
