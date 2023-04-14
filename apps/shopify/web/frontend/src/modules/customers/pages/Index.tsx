import {
  generatePath,
  useDebounceFn,
  useJob,
  useNavigate,
} from "@moose-desk/core";
import {
  BaseListCustomerRequest,
  Customer,
  CustomerRepository,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  ButtonGroup,
  Card,
  ChoiceList,
  EmptySearchResult,
  Filters,
  Icon,
  IndexTable,
  Link,
  Page,
  Popover,
  Stack,
  Text,
} from "@shopify/polaris";
import { SortMinor } from "@shopify/polaris-icons";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import Pagination from "src/components/Pagination/Pagination";
import env from "src/core/env";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

export default function CustomerIndexPage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [deleteCustomer, setDeleteCustomer] = useState<string>("");
  const [popoverSort, setPopoverSort] = useState(false);

  const togglePopoverSort = useCallback(
    () => setPopoverSort((popoverSort) => !popoverSort),
    []
  );

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };
  const rowMarkup = customers.map(
    ({ id, firstName, lastName, email, storeId }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell className="py-3">
          <Link
            monochrome
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
        <IndexTable.Cell className="py-3">
          <ButtonGroup>
            <div className="flex gap-2">
              <ButtonEdit onClick={() => navigateShowDetails(id)}></ButtonEdit>
              <ButtonDelete
                onClick={() => handleOpenModalDelete(id)}
                destructive
              >
                Remove
              </ButtonDelete>
            </div>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const navigateCreate = () => {
    return navigate(CustomersRoutePaths.Create);
  };
  const navigateShowDetails = useCallback((id: string) => {
    navigate(generatePath(CustomersRoutePaths.Details, { id }));
  }, []);
  const sortTemplate = [
    {
      sortBy: "lastName",
      sortOrder: 1,
    },
    {
      sortBy: "lastName",
      sortOrder: -1,
    },
    {
      sortBy: "email",
      sortOrder: 1,
    },
    {
      sortBy: "email",
      sortOrder: -1,
    },
    {
      sortBy: "numberOfTicket",
      sortOrder: 1,
    },
    {
      sortBy: "numberOfTicket",
      sortOrder: -1,
    },
    {
      sortBy: undefined,
      sortOrder: undefined,
    },
  ];
  const [sortCustomer, setSortCustomer] = useState(6);
  const [valueSortCustomer, setValueSortCustomer] = useState(
    sortTemplate[Number(sortCustomer)]
  );

  const defaultFilter = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    ...valueSortCustomer,
  });
  const [filterData, setFilterData] =
    useState<BaseListCustomerRequest>(defaultFilter);
  const handleSearchChange = useCallback((value: string) => {
    setFilterData(() => ({
      page: 1,
      ...filterData,
      query: value,
    }));
  }, []);
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

  const choices = [
    { label: "Sort by name A-Z", value: "0" },
    { label: "Sort by name Z-A", value: "1" },
    { label: "Sort by email A-Z", value: "2" },
    { label: "Sort by email Z-A", value: "3" },
    { label: "Sort by number of Tickets A-Z", value: "4" },
    { label: "Sort by number of Tickets Z-A", value: "5" },
  ];
  const handleSortChange = useCallback((value) => {
    setSortCustomer(parseInt(value[0]));
  }, []);
  const sortButton = (
    <Button
      onClick={togglePopoverSort}
      icon={<Icon source={() => <SortMinor />} color="base" />}
    >
      Sort
    </Button>
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModalDelete = (id: string) => {
    setIsOpen(true);
    setDeleteCustomer(id);
  };
  const { run: handleRemoveCustomer } = useJob((dataDelete: string[]) => {
    return CustomerRepository()
      .delete({ ids: dataDelete })
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show("Customer and his tickets have been removed successfully!");
            fetchListCustomer();
            setDeleteCustomer("");
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
      return CustomerRepository()
        .getList(filterData)
        .pipe(
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
    setValueSortCustomer(sortTemplate[sortCustomer]);
  }, [sortCustomer]);
  useEffect(() => {
    setFilterData({
      ...filterData,
      ...valueSortCustomer,
    });
  }, [valueSortCustomer]);
  useEffect(() => {
    callAPI();
  }, [filterData]);
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
          deleteAction={() => handleRemoveCustomer([deleteCustomer])}
        />
        <Card>
          <div className="flex-1 px-4 pt-4 pb-2">
            <Stack distribution="trailing" spacing="loose">
              <Stack.Item fill={true}>
                <Filters
                  queryValue={filterData.query}
                  onQueryChange={handleSearchChange}
                  onQueryClear={handleQueryValueRemove}
                  queryPlaceholder="Search"
                  filters={[]}
                  onClearAll={resetFilterData}
                />
              </Stack.Item>
              <Stack.Item>
                <Popover
                  active={popoverSort}
                  activator={sortButton}
                  autofocusTarget="first-node"
                  onClose={togglePopoverSort}
                  preferredAlignment={"left"}
                  sectioned
                >
                  <ChoiceList
                    title="Sort customer"
                    titleHidden
                    choices={choices}
                    selected={[sortCustomer.toString()] || []}
                    onChange={handleSortChange}
                  />
                </Popover>
              </Stack.Item>
            </Stack>
          </div>
          <IndexTable
            resourceName={resourceName}
            itemCount={customers.length}
            selectable={false}
            headings={[
              { title: "Customer name" },
              { title: "Email address" },
              { title: "Number of tickets" },
              { title: "Action" },
            ]}
            hasMoreItems
            loading={loadCustomer}
            emptyState={
              <EmptySearchResult
                title={
                  "Sorry! There is no records matched with your search criteria"
                }
                description={"Try changing the filters or search term"}
                withIllustration
              />
            }
          >
            {rowMarkup}
          </IndexTable>
        </Card>
        {result && result.metadata.totalCount ? (
          <div className="flex items-center justify-center mt-4">
            <Pagination
              total={result?.metadata ? result.metadata.totalCount : 1}
              pageSize={filterData.limit ?? 0}
              currentPage={filterData.page ?? 1}
              onChangePage={(page) =>
                setFilterData((val) => ({ ...val, page }))
              }
              previousTooltip={"Previous"}
              nextTooltip={"Next"}
            />
          </div>
        ) : null}
      </Page>
    </>
  );
}
