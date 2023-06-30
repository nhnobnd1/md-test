import {
  PageComponent,
  useNavigate,
  useSearchParams,
  useToggle,
} from "@moose-desk/core";
import {
  BaseListCustomerRequest,
  Customer,
  GetListCustomerRequest,
} from "@moose-desk/repo";
import { TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Header } from "src/components/UI/Header";
import Icon from "src/components/UI/Icon";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import Pagination from "src/components/UI/Pagination/Pagination";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import useViewport from "src/hooks/useViewport";
import {
  deleteCustomer,
  getListCustomer,
  getOneCustomer,
} from "src/modules/customer/api/api";
import PopupCustomer from "src/modules/customer/component/PopupCustomer";
import { QUERY_KEY } from "src/modules/customer/helper/constant";
import styles from "./style.module.scss";
interface CustomerIndexPageProps {}

const defaultFilter: () => GetListCustomerRequest = () => ({
  page: 1,
  limit: env.DEFAULT_PAGE_SIZE,
  query: "",
  sortBy: undefined,
  sortOrder: undefined,
});
const CustomerIndexPage: PageComponent<CustomerIndexPageProps> = () => {
  const message = useMessage();
  const notification = useNotification();
  const navigate = useNavigate();
  const { state: isSearch, toggle: onToggleSearch } = useToggle(false);
  const { isMobile } = useViewport();
  const { t } = useTranslation();

  const {
    state: popupCustomer,
    on: openPopupCustomer,
    off: closePopupCustomer,
  } = useToggle();
  const { isAdmin } = usePermission();

  const [dataPopup, setDataPopup] = useState<
    | {
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
      }
    | undefined
  >({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [searchParams] = useSearchParams();
  const querySearchCustomer = searchParams.get("id");
  const [filterData, setFilterData] =
    useState<BaseListCustomerRequest>(defaultFilter);

  const {
    data: listCustomer,
    refetch: refetchListCustomer,
    isLoading: isFetchingListCustomer,
  }: any = useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER, filterData],
    queryFn: () => getListCustomer(filterData),
    keepPreviousData: true,
    onError: () => {
      message.error(t("messages:error.get_customer"));
    },
  });
  const { mutate: deleteCustomerMutate } = useMutation({
    mutationFn: (payload: { ids: string[] }) => deleteCustomer(payload),
    onSuccess: () => {
      refetchListCustomer();
      notification.success(t("messages:success.delete_customer"));
    },
    onError: () => {
      notification.error(t("messages:error.delete_customer"), {
        description: "Remove customer failed",
        style: {
          width: 450,
        },
      });
    },
  });
  useEffect(() => {
    if (!querySearchCustomer) return;
    const getCustomerData = async () => {
      try {
        const { data: customerData }: any = await getOneCustomer(
          querySearchCustomer
        );
        if (customerData) {
          handleEdit(customerData?.data);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    getCustomerData();
  }, [querySearchCustomer, listCustomer]);
  const columns: any = [
    {
      title: "Customer name",
      dataIndex: "name",
      width: "25%",
      sorter: {
        compare: (a: any, b: any) => a.lastName - b.lastName,
      },

      render: (_: string, record: Customer) => (
        <div
          className="cursor-pointer fit-content hover-text"
          onClick={() => handleEdit(record)}
        >{`${record.firstName} ${record.lastName}`}</div>
      ),
    },
    {
      title: "Email address",
      dataIndex: "email",
      sorter: {
        compare: (a: any, b: any) => {
          return a.email - b.email;
        },
      },
      width: "45%",
    },
    {
      title: "Number of tickets",
      dataIndex: "ticketsCount",
      sorter: {
        compare: (a: any, b: any) => a.numberOfTicket - b.numberOfTicket,
      },
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "",
      width: "10%",
      align: "center",
      render: (_: any, record: Customer) => (
        <TableAction
          record={record}
          edit
          onlyIcon
          onEdit={handleEdit}
          specialDelete={
            isAdmin
              ? {
                  title: "Are you sure that you want to remove this customer?",
                  description:
                    "This customer will be removed permanently. All customer's tickets and his profile will no longer accessible.",
                  textDelete: "Remove",
                }
              : null
          }
          onSpecialDelete={handleDeleteCustomer}
        />
      ),
    },
  ];
  const handleSearchInput = (query: string) => {
    setFilterData((pre) => ({ ...pre, query }));
  };
  const handleEdit = (record: Customer) => {
    setDataPopup(record);
    openPopupCustomer();
  };
  const handleAddCustomer = () => {
    openPopupCustomer();
    setDataPopup(undefined);
  };
  const handleChangePage = useCallback(
    ({ page, limit }: { page: number; limit: number }) => {
      setFilterData((value) => {
        return {
          ...value,
          page,
          limit,
        };
      });
    },
    []
  );

  const handleDeleteCustomer = (customer: Customer) => {
    deleteCustomerMutate({ ids: [customer._id] });
  };

  const handleChangeTable = useCallback(
    (_: any, __: any, sorter: SorterResult<Customer>) => {
      if (sorter.order && sorter.field) {
        setFilterData((pre) => ({
          ...pre,
          sortBy: sorter?.field as string,
          sortOrder: sorter?.order === "ascend" ? 1 : -1,
        }));
      } else {
        setFilterData((value) => ({
          ...value,
          sortBy: undefined,
          sortOrder: undefined,
        }));
      }
    },
    []
  ) as TableProps<Customer>["onChange"];
  return (
    <div>
      <PopupCustomer
        open={popupCustomer}
        dataForm={dataPopup as Customer}
        onCancel={() => {
          closePopupCustomer();
          navigate("/customers");
        }}
        querySearchCustomer={querySearchCustomer}
      />
      {!isSearch ? (
        <div className={styles.topPage}>
          <Header title="Customers" />
          <div className={classNames(styles.groupTopPage, "d-flex")}>
            {isMobile ? (
              <MDButton
                icon={<Icon name="search" />}
                onClick={onToggleSearch}
              ></MDButton>
            ) : (
              <div className={styles.searchInputWrap}>
                <MDSearchInput onTypeSearch={handleSearchInput} />
              </div>
            )}
            <div
              className={classNames(styles.buttonAdd, "md-btn md-btn-primary")}
            >
              <ButtonAdd onClick={handleAddCustomer}>Add customer</ButtonAdd>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.groupSearchOnMobile}>
          <MDButton
            onClick={onToggleSearch}
            icon={<Icon name="back" />}
            type="text"
          ></MDButton>
          <div className={styles.searchOnMobile}>
            <MDSearchInput onTypeSearch={handleSearchInput} />
          </div>
        </div>
      )}
      <div className={styles.wrapTable}>
        {isFetchingListCustomer ? (
          <div className="p-6">
            <MDSkeleton lines={15} />
          </div>
        ) : (
          <Table
            dataSource={(listCustomer as any)?.data?.data}
            loading={isFetchingListCustomer}
            onChange={handleChangeTable}
            columns={columns}
            scroll={{ x: 1024 }}
          />
        )}

        <div className={styles.pagination}>
          {isFetchingListCustomer ? (
            <MDSkeleton lines={1} width={300} />
          ) : (
            <Pagination
              currentPage={filterData.page ?? 1}
              total={(listCustomer as any)?.data?.metadata?.totalCount || 0}
              pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
              onChange={handleChangePage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerIndexPage;
