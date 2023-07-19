import { InfoCircleTwoTone, MoreOutlined } from "@ant-design/icons";
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
import { Popover, TableProps, Tooltip, Upload } from "antd";
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
  checkingSyncImport,
  deleteCustomer,
  getListCustomer,
  getOneCustomer,
  importCSV,
  syncShopifyCustomers,
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
  const { Dragger } = Upload;

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
  const { data: status, isLoading: checkingStatus }: any = useQuery({
    queryKey: ["StatusImportAndSync"],
    queryFn: () => checkingSyncImport(),
    // onError: () => {
    //   message.error("");
    // },
  });
  const syncStatus = status?.data?.data?.isProcessing;
  const { mutate: deleteCustomerMutate } = useMutation({
    mutationFn: (payload: { ids: string[] }) => deleteCustomer(payload),
    onSuccess: () => {
      refetchListCustomer();
      notification.success(t("messages:success.delete_customer"));
    },
    onError: () => {
      notification.error(t("messages:error.delete_customer"), {
        // description: t("messages:error.delete_customer"),
        style: {
          width: 450,
        },
      });
    },
  });
  const { mutate: syncCustomerMutate, isLoading: syncing } = useMutation({
    mutationFn: () => syncShopifyCustomers(),
    onSuccess: () => {
      notification.success(
        "The data synchronization process is currently underway",
        {
          description:
            "You will receive an email once the synchronization process is complete.",
        }
      );
    },
    onError: () => {
      notification.error("Failed to sync customers from shopify", {
        style: {
          width: 450,
        },
      });
    },
  });
  const { mutate: importMutate, isLoading: importing } = useMutation({
    mutationFn: (payload: any) => importCSV(payload),
    onSuccess: () => {
      notification.success(
        "Currently in the process of importing data from a file",
        {
          description:
            "You will receive an email once the import process is complete.",
        }
      );
    },
    onError: () => {
      notification.error("Failed to import from file", {
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
        if (customerData?.data && Object.keys(customerData?.data).length > 0) {
          handleEdit(customerData?.data);
        } else {
          notification.error("Customer not found");
          navigate("/customers");
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    getCustomerData();
  }, [querySearchCustomer, listCustomer]);
  const columns: any = [
    {
      title: t("common:customers.name"),
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
      title: t("common:customers.email_address"),
      dataIndex: "email",
      sorter: {
        compare: (a: any, b: any) => {
          return a.email - b.email;
        },
      },
      width: "45%",
    },
    {
      title: t("common:customers.ticket_count"),
      dataIndex: "ticketsCount",
      sorter: {
        compare: (a: any, b: any) => a.numberOfTicket - b.numberOfTicket,
      },
      width: "20%",
    },
    {
      title: t("common:table.action"),
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
                  title: t("common:customers.delete_popup_title"),
                  description: t("common:customers.delete_popup_warning"),
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
  const handleUploadFile = ({ file }: any) => {
    const listAcceptType = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    if (!listAcceptType?.includes(file?.type)) {
      notification.error("Please import a file in CSV or XLSX format.", {
        style: {
          width: 450,
        },
      });
      return;
    }
    importMutate(file);
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
  const popoverContent = (
    <div>
      <Dragger
        height={isMobile ? 32 : 40}
        className={styles.uploadBtn}
        name="file"
        accept=".csv, .xlsx"
        onChange={handleUploadFile}
        showUploadList={false}
        beforeUpload={(file: any) => {
          return false;
        }}
      >
        Import CSV
      </Dragger>
      <MDButton
        className={styles.syncBtn}
        onClick={() => {
          syncCustomerMutate();
        }}
        loading={syncing}
      >
        Sync Customers from Shopify
      </MDButton>
    </div>
  );
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
            <div className={styles.wrapMoreActions}>
              <Popover content={popoverContent} trigger="click">
                <MDButton
                  icon={isMobile ? <MoreOutlined /> : undefined}
                  loading={syncStatus}
                  className={syncStatus ? styles.syncingBtn : ""}
                >
                  {isMobile ? (
                    ""
                  ) : syncStatus ? (
                    <div className="d-flex align-center">
                      <span>Processing</span>
                      <Tooltip
                        title={
                          "Currently in the process of syncing Shopify customer data or importing data from a file."
                        }
                      >
                        <div className={styles.infoPicker}>
                          <InfoCircleTwoTone twoToneColor="#FA7D00" />
                        </div>
                      </Tooltip>
                    </div>
                  ) : (
                    "More actions"
                  )}
                </MDButton>
              </Popover>
            </div>
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
            // locale={{
            //   emptyText: (
            //     <div className={styles.wrapEmpty}>
            //       <Empty
            //         image={Empty.PRESENTED_IMAGE_SIMPLE}
            //         description="Sorry!, There is no records matched with your search
            //       criteria."
            //       />
            //       <div className={styles.groupButtonTableEmpty}>
            //         <Dragger
            //           height={isMobile ? 32 : 40}
            //           className={styles.uploadBtn}
            //           name="file"
            //           accept=".csv, .xlsx"
            //           onChange={handleUploadFile}
            //           showUploadList={false}
            //           beforeUpload={(file: any) => {
            //             return false;
            //           }}
            //           disabled={syncStatus}
            //         >
            //           {syncStatus ? (
            //             <div className="d-flex align-center">
            //               <span>Processing</span>
            //               <Tooltip
            //                 title={
            //                   "Currently in the process of syncing Shopify customer data or importing data from a file."
            //                 }
            //               >
            //                 <div className={styles.infoPicker}>
            //                   <InfoCircleTwoTone twoToneColor="#FA7D00" />
            //                 </div>
            //               </Tooltip>
            //             </div>
            //           ) : (
            //             <MDButton>Import CSV</MDButton>
            //           )}
            //         </Dragger>
            //         <div
            //           className={classNames(
            //             styles.buttonAdd,
            //             "md-btn md-btn-primary"
            //           )}
            //           style={{ marginLeft: 15 }}
            //         >
            //           <ButtonAdd onClick={handleAddCustomer}>
            //             Add customer
            //           </ButtonAdd>
            //         </div>
            //       </div>
            //     </div>
            //   ),
            // }}
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
