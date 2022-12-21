import { useToast } from "@shopify/app-bridge-react";
import {
  Card,
  EmptySearchResult,
  Filters,
  IndexTable,
  Link,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { isEmpty } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { catchError, map, of } from "rxjs";
import ModalDelete from "src/components/ModalDelete";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import { useDebounceFn, useJob, useMount } from "src/core/hooks";
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
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState<Customer>(customers);

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
      onAction: () => handleOpenModalDelete(),
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
    setPage(1);
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

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModalDelete = () => {
    setIsOpen(true);
  };
  const { run: handleRemoveCustomer } = useJob((dataDelete: string[]) => {
    return CustomerRepository.delete({ ids: dataDelete }).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          show("Delete customer success");
          fetchListCustomer();
          clearSelection();
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
  const {
    run: fetchListCustomer,
    result,
    processing: loadCustomer,
  } = useJob(
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
    setFilterData({
      ...filterData,
      page: page,
    });
  }, [page]);
  useEffect(() => {
    callAPI();
  }, [filterData]);
  useMount(() => setPage(1));
  return (
    <>
      <Page
        title="Customer"
        primaryAction={{
          content: "Add customer",
          onAction: navigateCreate,
        }}
        compactTitle
        fullWidth
      >
        <ModalDelete
          title="Are you sure that you want to remove this customer?"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          content={
            "This customer will be removed permanently. All customer's tickets and his profile will no longer accessible."
          }
          deleteAction={handleRemoveCustomer}
          dataDelete={selectedResources}
        />
        <Card sectioned>
          <div className="flex-1 px-4 pt-4 pb-2">
            <Filters
              queryValue={filterData.query}
              onQueryChange={handleSearchChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search"
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
              { title: "Email address" },
              { title: "Number of tickets" },
            ]}
            hasMoreItems
            promotedBulkActions={promotedBulkActions}
            loading={loadCustomer}
            emptyState={
              <EmptySearchResult
                title={"No customer yet"}
                description={"Try changing the filters or search term"}
                withIllustration
              />
            }
          >
            {rowMarkup}
          </IndexTable>
        </Card>
        <div className="flex items-center justify-center mt-4">
          <Pagination
            total={result ? result.metadata.totalCount : 1}
            pageSize={filterData.limit ?? 0}
            currentPage={page}
            hasPrevious
            onPrevious={() => {
              if (page > 1) {
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
            previousTooltip={"Previous"}
            nextTooltip={"Next"}
          />
        </div>
      </Page>
    </>
  );
}
