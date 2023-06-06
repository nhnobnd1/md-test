import { generatePath, useNavigate, useToggle } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { BaseListCustomerRequest } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  ButtonGroup,
  Card,
  EmptySearchResult,
  IndexTable,
  Link,
  Loading,
  Page,
  Text,
} from "@shopify/polaris";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search/Search";
import env from "src/core/env";
import { deleteCustomer, getListCustomer } from "src/modules/customers/api/api";
import { CustomModal } from "src/modules/customers/component/Modal";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
import styles from "./styles.module.scss";
const resourceName = {
  singular: "customer",
  plural: "customers",
};
const defaultFilter = () => ({
  page: 1,
  limit: env.DEFAULT_PAGE_SIZE,
  query: "",
});
export default function CustomerIndexPage() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { state: visible, on: openPopup, off: closePopup } = useToggle();
  const { show } = useToast();
  const [customerData, setCustomerData] = useState<any>();
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  // const [modalType, setModalType] = useState("create");
  const navigateShowDetails = useCallback((id: string) => {
    navigate(generatePath(CustomersRoutePaths.Details, { id }));
  }, []);

  const [filterData, setFilterData] =
    useState<BaseListCustomerRequest>(defaultFilter);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: listCustomers,
    refetch: refetchListCustomer,
    isLoading: loadingCustomer,
  }: any = useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER, filterData],
    queryFn: () => getListCustomer(filterData),
  });
  const { mutate: deleteCustomerMutate, isLoading: deleting } = useMutation({
    mutationFn: (payload: { ids: string[] }) => deleteCustomer(payload),
    onSuccess: () => {
      refetchListCustomer();
      customerData();
      show(t("messages:success.delete_customer"));
    },
    onError: () => {
      show(t("messages:error.delete_customer"), {
        isError: true,
      });
    },
  });
  const convertCustomerData = useMemo(() => {
    return listCustomers?.data;
  }, [listCustomers]);

  const rowMarkup = convertCustomerData?.data?.map(
    (records: any, index: number) => (
      <IndexTable.Row id={records?._id} key={records?._id} position={index}>
        <IndexTable.Cell className="py-3">
          <Link
            monochrome
            onClick={() => navigateShowDetails(records?._id)}
            removeUnderline
          >
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {`${records?.firstName} ${records?.lastName}`}
            </Text>
          </Link>
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">{records?.email}</IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          {records?.ticketsCount}
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          <ButtonGroup>
            <div className="flex gap-2">
              <ButtonEdit onClick={() => handleOpenPopup(records)}></ButtonEdit>
              <ButtonDelete
                onClick={() => handleOpenModalDelete(records)}
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
  const handleOpenModalDelete = (records: any) => {
    setIsOpen(true);
    setCustomerData(records);
  };
  const listSort = ["firstName", "email", "ticketsCount"];
  const handleSort = (
    headingIndex: number,
    direction: "descending" | "ascending"
  ) => {
    setIndexSort(Number(headingIndex));
    setDirection(direction);
    setFilterData((pre) => ({
      ...pre,
      sortBy: listSort[Number(headingIndex)],
      sortOrder: direction === "ascending" ? 1 : -1,
    }));
  };
  const handleSearch = (keyword: string) => {
    setFilterData((pre) => ({ ...pre, query: keyword }));
  };
  const handleOpenPopup = (records: any) => {
    setCustomerData(records);
    openPopup();
  };
  const handleClosePopup = () => {
    closePopup();
    setCustomerData(undefined);
  };

  return (
    <>
      <Page title="Customer" compactTitle fullWidth>
        <div className={classNames(styles.groupTopPage, "d-flex")}>
          <div className="md-input">
            <Search onTypeSearch={handleSearch} />
          </div>
          <div
            className={classNames(styles.buttonAdd, "md-btn md-btn-primary")}
          >
            <Button onClick={openPopup}>Add new</Button>
          </div>
        </div>
        <ModalDelete
          title="Are you sure that you want to remove this customer?"
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setCustomerData(undefined);
          }}
          content={
            "This customer will be removed permanently. All customer's tickets and his profile will no longer accessible."
          }
          deleteAction={() => {
            deleteCustomerMutate({ ids: [customerData?._id] });
          }}
        />
        <CustomModal
          title={
            customerData?._id
              ? `${customerData?.firstName} ${customerData?.lastName}`
              : "New Customer"
          }
          visible={visible}
          onClose={handleClosePopup}
          customerData={customerData}
          primaryButtonLabel="Save"
          secondaryButtonAction={handleClosePopup}
          secondaryButtonLabel="Discard"
        />

        <Card>
          {(loadingCustomer || deleting) && <Loading />}
          <IndexTable
            resourceName={resourceName}
            itemCount={convertCustomerData?.data?.length || 0}
            selectable={false}
            // selectedItemsCount={
            //   allResourcesSelected ? "All" : selectedResources.length
            // }
            // onSelectionChange={handleSelectionChange}
            headings={[
              { title: "Customer name" },
              { title: "Email address" },
              { title: "Number of tickets" },
              { title: "Action" },
            ]}
            sortDirection={direction}
            sortColumnIndex={indexSort}
            onSort={handleSort}
            sortable={[true, true, true, false]}
            loading={loadingCustomer}
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
        {convertCustomerData && convertCustomerData?.metadata?.totalCount ? (
          <div className="flex items-center justify-center mt-4">
            <Pagination
              total={
                convertCustomerData?.metadata
                  ? convertCustomerData?.metadata?.totalCount
                  : 1
              }
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
