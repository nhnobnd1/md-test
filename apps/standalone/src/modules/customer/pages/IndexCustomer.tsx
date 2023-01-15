import { SearchOutlined, SortAscendingOutlined } from "@ant-design/icons";
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
import { Button, Input, Popover, Radio, Space } from "antd";
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
      sortBy: undefined,
      sortOrder: undefined,
    },
  ];
  const choices = [
    { label: "Sort by name A-Z", value: 0 },
    { label: "Sort by name Z-A", value: 1 },
    { label: "Sort by email A-Z", value: 2 },
    { label: "Sort by email Z-A", value: 3 },
  ];
  const [sortCustomer, setSortCustomer] = useState(4);
  const optionChoices = (
    <Radio.Group
      name="sortChoice"
      defaultValue={4}
      value={sortCustomer}
      onChange={(e) => setSortCustomer(e.target.value)}
    >
      <Space direction="vertical">
        {choices.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
  const [valueSortCustomer, setValueSortCustomer] = useState(
    sortTemplate[sortCustomer]
  );

  const defaultFilter: () => GetListCustomerRequest = () => ({
    page: 1,
    limit: env.DEFAULT_PAGE_SIZE,
    query: "",
    ...valueSortCustomer,
  });

  const [filterData, setFilterData] =
    useState<BaseListCustomerRequest>(defaultFilter);

  const handleChangeValueInput = useCallback((e) => {
    setFilterData(() => ({
      page: 1,
      ...filterData,
      query: e.target.value,
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
  const { run: deleteCustomerApi, processing: loadingDelete } = useJob(
    (id: string[]) => {
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
    }
  );

  const handleDeleteCustomer = useCallback((customer: Customer) => {
    deleteCustomerApi([customer._id]);
  }, []);
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
    if (prevFilter?.query !== filterData.query && filterData.query) {
      getListDebounce(filterData);
    } else {
      getListCustomerApi(filterData);
    }
  }, [filterData]);

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
        <div className="flex">
          <Input
            placeholder=""
            prefix={<SearchOutlined />}
            className="mr-2"
            value={filterData.query}
            onChange={handleChangeValueInput}
            allowClear
          />
          <Popover
            content={optionChoices}
            placement="bottomRight"
            trigger="click"
          >
            <Button icon={<SortAscendingOutlined />} className="pl-4 pr-4">
              Sort
            </Button>
          </Popover>
        </div>
      </div>
      <div>
        {customers && (
          <>
            <Table dataSource={customers} loading={loadingList}>
              <Table.Column
                key="customer"
                title="Customer name"
                render={(_, record: Customer) => (
                  <span>{`${record.firstName} ${record.lastName}`}</span>
                )}
              />
              <Table.Column
                key="email"
                title="Email address"
                dataIndex="email"
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
