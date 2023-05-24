import { PageComponent, useToggle } from "@moose-desk/core";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import {
  BaseListCustomerRequest,
  Customer,
  GetListCustomerRequest,
} from "@moose-desk/repo";
import { TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import { deleteCustomer, getListCustomer } from "src/modules/customer/api/api";
import PopupCustomer from "src/modules/customer/component/PopupCustomer";
import { QUERY_KEY } from "src/modules/customer/helper/constant";

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
  const [querySearch, setQuerySearch] = useState<string>("");
  const debounceValue: string = useDebounce(querySearch, 500);

  const [filterData, setFilterData] =
    useState<BaseListCustomerRequest>(defaultFilter);
  const { t } = useTranslation();

  const {
    data: listCustomer,
    refetch: refetchListCustomer,
    isLoading: isFetchingListCustomer,
  } = useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER, filterData, debounceValue],
    queryFn: () => getListCustomer({ ...filterData, query: debounceValue }),
    // keepPreviousData: true,
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
      width: "25%",
    },
    {
      title: "Number of tickets",
      dataIndex: "ticketsCount",
      sorter: {
        compare: (a: any, b: any) => a.numberOfTicket - b.numberOfTicket,
      },
      width: "25%",
    },
    {
      title: "Action",
      dataIndex: "",
      width: "25%",
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
  const handleSearchInput = (e: any) => {
    const newQuery = e.target.value;
    setQuerySearch(newQuery);
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
        onCancel={closePopupCustomer}
      />
      <Header title="Customer">
        <div className="flex-1 flex justify-end">
          <ButtonAdd onClick={handleAddCustomer}>Add customer</ButtonAdd>
        </div>
      </Header>
      <div className="mb-10">
        <MDSearchInput onChange={handleSearchInput} value={querySearch} />
      </div>
      <div>
        <Table
          dataSource={(listCustomer as any)?.data?.data}
          loading={isFetchingListCustomer}
          onChange={handleChangeTable}
          columns={columns}
          scroll={{ x: 1024 }}
        />
        <Pagination
          className="mt-4 flex justify-end"
          currentPage={filterData.page ?? 1}
          total={(listCustomer as any)?.data?.metadata?.totalCount || 0}
          pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default CustomerIndexPage;
