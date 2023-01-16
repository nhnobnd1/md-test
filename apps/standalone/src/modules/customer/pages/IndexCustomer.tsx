import {
  PageComponent,
  useDebounceFn,
  useJob,
  usePrevious,
  useToggle,
} from "@moose-desk/core";
import {
  BaseListCustomerRequest,
  BaseMetaDataListResponse,
  Customer,
  CustomerRepository,
  GetListCustomerRequest,
} from "@moose-desk/repo";
import { Input, TableProps } from "antd";
import { SorterResult } from "antd/es/table/interface";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { ButtonAdd } from "src/components/UI/Button/ButtonAdd";
import { Header } from "src/components/UI/Header";
import Pagination from "src/components/UI/Pagination/Pagination";
import { Table } from "src/components/UI/Table";
import TableAction from "src/components/UI/Table/TableAction/TableAction";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { CustomerFormValues } from "src/modules/customer/component/CustomerForm";
import PopupCustomer from "src/modules/customer/component/PopupCustomer";

interface CustomerIndexPageProps {}

const CustomerIndexPage: PageComponent<CustomerIndexPageProps> = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const message = useMessage();
  const notification = useNotification();
  const {
    state: popupCustomer,
    on: openPopupCustomer,
    off: closePopupCustomer,
  } = useToggle();
  const [dataPopup, setDataPopup] = useState<CustomerFormValues | undefined>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const defaultFilter: () => GetListCustomerRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    sortBy: undefined,
    sortOrder: undefined,
  });

  const [filterData, setFilterData] =
    useState<BaseListCustomerRequest>(defaultFilter);

  const handleChangeValueInput = useCallback((value: string) => {
    setFilterData(() => ({
      page: 1,
      ...filterData,
      query: value,
    }));
  }, []);
  const [meta, setMeta] = useState<BaseMetaDataListResponse>();

  const prevFilter = usePrevious<GetListCustomerRequest>(filterData);

  const { run: getListCustomerApi, processing: loadingList } = useJob(
    (payload: GetListCustomerRequest) => {
      return CustomerRepository()
        .getList(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              const listCustomer = data.data.map((item) => ({
                ...item,
                id: item._id,
              }));
              setCustomers(listCustomer);
              setMeta(data.metadata);
            } else {
              message.error("Get data customer failed");
            }
          })
        );
    }
  );

  const { run: getListDebounce } = useDebounceFn(
    (payload: GetListCustomerRequest) => {
      getListCustomerApi(payload);
    },
    { wait: 300 }
  );

  const handleEdit = (record: Customer) => {
    setDataPopup(record);
    openPopupCustomer();
  };

  const onPagination = useCallback(
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

  const handleChangePopup = useCallback(() => {
    getListCustomerApi(filterData);
    closePopupCustomer();
  }, []);
  const { run: deleteCustomerApi } = useJob((id: string[]) => {
    message.loading.show("Removing customer");
    return CustomerRepository()
      .delete({
        ids: id,
      })
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(
              "The selected customer has been removed from the system."
            );
            getListCustomerApi({
              page: 1,
              limit: env.DEFAULT_PAGE_SIZE,
            });
          } else {
            notification.error("There is an error with remove customer", {
              description: "Remove customer failed",
              style: {
                width: 450,
              },
            });
          }
        }),
        catchError((err) => {
          notification.error("There is an error with remove customer", {
            description: "Remove customer failed",
            style: {
              width: 450,
            },
          });
          return of(err);
        })
      );
  });

  const handleDeleteCustomer = useCallback((customer: Customer) => {
    deleteCustomerApi([customer._id]);
  }, []);
  useEffect(() => {
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListCustomerApi(filterData);
    }
  }, [filterData]);
  const onChangeTable = useCallback(
    (pagination: any, filters: any, sorter: SorterResult<Customer>) => {
      if (sorter.order && sorter.columnKey) {
        setFilterData((value) => ({
          ...value,
          sortBy: sorter.columnKey as string,
          sortOrder: sorter.order === "ascend" ? 1 : -1,
        }));
      }
    },
    [setFilterData]
  ) as TableProps<Customer>["onChange"];
  return (
    <div>
      <PopupCustomer
        open={popupCustomer}
        dataForm={dataPopup as Customer}
        onCancel={closePopupCustomer}
        onChange={handleChangePopup}
      />
      <Header title="Customer">
        <div className="flex-1 flex justify-end">
          <ButtonAdd
            onClick={() => {
              openPopupCustomer();
              setDataPopup(undefined);
            }}
          >
            Add customer
          </ButtonAdd>
        </div>
      </Header>
      <div className="pb-2">
        <Input.Search
          placeholder="Search"
          className="mr-2"
          onSearch={handleChangeValueInput}
          allowClear
          enterButton
        />
      </div>
      <div>
        {customers && (
          <>
            <Table
              dataSource={customers}
              loading={loadingList}
              onChange={onChangeTable}
            >
              <Table.Column
                key="lastName"
                title="Customer name"
                render={(_, record: Customer) => (
                  <span>{`${record.firstName} ${record.lastName}`}</span>
                )}
                sorter={{
                  compare: (a: any, b: any) => a.lastName - b.lastName,
                }}
              />
              <Table.Column
                key="email"
                title="Email address"
                dataIndex="email"
                sorter={{
                  compare: (a: any, b: any) => a.email - b.email,
                }}
              ></Table.Column>
              <Table.Column
                key="numberOfTicket"
                title="Number of tickets"
                dataIndex="storeId"
              ></Table.Column>
              <Table.Column
                align="center"
                title="Action"
                render={(_, record: Customer) => (
                  <TableAction
                    record={record}
                    edit
                    showDelete
                    onlyIcon
                    onEdit={handleEdit}
                    onDelete={handleDeleteCustomer}
                  />
                )}
              />
            </Table>
            {meta && (
              <Pagination
                className="mt-4 flex justify-end"
                currentPage={filterData.page ?? 1}
                total={meta?.totalCount}
                pageSize={filterData.limit ?? env.DEFAULT_PAGE_SIZE}
                onChange={onPagination}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerIndexPage;
