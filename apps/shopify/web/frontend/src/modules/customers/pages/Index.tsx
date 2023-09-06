import {
  MediaScreen,
  useNavigate,
  useSearchParams,
  useToggle,
} from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { BaseListCustomerRequest } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Button,
  ButtonGroup,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Link,
  Loading,
  Text,
} from "@shopify/polaris";
import { MobileBackArrowMajor, SearchMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
// import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
import { ButtonEdit } from "src/components/Button/ButtonEdit";
import { ModalDelete } from "src/components/Modal/ModalDelete";
import { Pagination } from "src/components/Pagination";
import { Search } from "src/components/Search/Search";
import { SkeletonTable } from "src/components/Skelaton/SkeletonTable";
import env from "src/core/env";
import useScreenType from "src/hooks/useScreenType";
import { deleteCustomer, getListCustomer } from "src/modules/customers/api/api";
import { CustomModal } from "src/modules/customers/component/Modal";
import { MoreOption } from "src/modules/customers/component/MoreOption";
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
  const [screenType, screenWidth] = useScreenType();
  const isMobile = Boolean(screenWidth < MediaScreen.MD);
  const isTablet = Boolean(
    screenWidth >= MediaScreen.MD && screenWidth <= MediaScreen.LG
  );
  const { t } = useTranslation();
  const { show } = useToast();
  const [searchParams] = useSearchParams();
  const querySearchCustomer = searchParams.get("id");
  const { state: visible, on: openPopup, off: closePopup } = useToggle();
  const { state: isSearch, toggle: onToggleSearch } = useToggle(false);
  const [customerData, setCustomerData] = useState<any>();
  const [indexSort, setIndexSort] = useState<number | undefined>(undefined);
  const [direction, setDirection] = useState<"descending" | "ascending">(
    "descending"
  );
  const [filterData, setFilterData] =
    useState<BaseListCustomerRequest>(defaultFilter);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: listCustomers,
    refetch: refetchListCustomer,
    isFetching: loadingCustomer,
    isLoading,
  }: any = useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER, filterData],
    queryFn: () => getListCustomer({ ...filterData, getTicket: 1 }),
    keepPreviousData: true,
  });
  const { mutate: deleteCustomerMutate, isLoading: deleting } = useMutation({
    mutationFn: (payload: { ids: string[] }) => deleteCustomer(payload),
    onSuccess: () => {
      refetchListCustomer();
      customerData();
      show(t("messages:success.delete_customer"));
    },
    onError: () => {},
  });
  const convertCustomerData = useMemo(() => {
    return listCustomers?.data;
  }, [listCustomers]);
  const rowMarkup = convertCustomerData?.data?.map(
    (records: any, index: number) => (
      <IndexTable.Row id={records?._id} key={records?._id} position={index}>
        <IndexTable.Cell className={classNames("py-3", styles.honorific)}>
          {records?.honorific || ""}
        </IndexTable.Cell>
        <IndexTable.Cell className="py-3">
          <Link
            monochrome
            onClick={() => handleRedirectCustomerDetail(records)}
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
              <ButtonEdit
                isTable
                onClick={() => handleRedirectCustomerDetail(records)}
              ></ButtonEdit>
              <ButtonDelete
                isTable
                onClick={() => handleOpenModalDelete(records)}
                // destructive
              ></ButtonDelete>
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
  const listSort = ["honorific", "firstName", "email", "ticketsCount"];
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
  const handleRedirectCustomerDetail = (records: any) => {
    navigate(`/customers/detail?customer=${records?._id}`);
  };
  const handleClosePopup = () => {
    closePopup();
    setCustomerData(undefined);
    navigate("/customers");
  };
  const resetData = useCallback(() => {
    refetchListCustomer();
  }, []);
  return (
    <>
      <section className="page-wrap">
        {!isSearch ? (
          <div className={styles.topPage}>
            <Text variant="headingLg" as="h1">
              Customers
            </Text>
            <div className={classNames(styles.groupTopPage, "d-flex")}>
              {isMobile ? (
                <Button icon={SearchMinor} onClick={onToggleSearch}></Button>
              ) : (
                <div className={styles.searchInputWrap}>
                  <Search onTypeSearch={handleSearch} />
                </div>
              )}
              <div className={styles.moreOption}>
                <MoreOption onReset={resetData} />
              </div>
              <div
                className={classNames(
                  styles.buttonAdd,
                  "md-btn md-btn-primary"
                )}
              >
                <Button onClick={openPopup}>Add customer</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.groupSearchOnMobile}>
            <Button
              icon={MobileBackArrowMajor}
              onClick={onToggleSearch}
            ></Button>
            <div className={styles.searchOnMobile}>
              <Search onTypeSearch={handleSearch} />
            </div>
          </div>
        )}
        {/* {(isMobile || isTablet) && (
          <div className={styles.moreOption}>
            <MoreOption />
          </div>
        )} */}
        <ModalDelete
          title="Remove this customer?"
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
            setCustomerData(undefined);
          }}
          content={
            "This customer will be permanently deleted. All tickets and customer records will no longer be accessible."
          }
          deleteAction={() => {
            deleteCustomerMutate({ ids: [customerData?._id] });
          }}
          textConfirm="Remove"
          loading={deleting}
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
          querySearchCustomer={querySearchCustomer}
        />
        {isLoading ? (
          <SkeletonTable columnsCount={4} rowsCount={5} />
        ) : (
          <LegacyCard>
            {(loadingCustomer || deleting) && <Loading />}
            <IndexTable
              resourceName={resourceName}
              itemCount={convertCustomerData?.data?.length || 0}
              selectable={false}
              headings={[
                { title: "Honorific" },
                { title: "Customer name" },
                { title: "Email address" },
                { title: "Number of tickets" },
                { title: "Action" },
              ]}
              sortDirection={direction}
              sortColumnIndex={indexSort}
              onSort={handleSort}
              sortable={[true, true, true, true, false]}
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
            {convertCustomerData &&
            convertCustomerData?.metadata?.totalCount ? (
              <div className="flex items-center justify-center mt-12px pb-12px">
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
          </LegacyCard>
        )}
      </section>
    </>
  );
}
