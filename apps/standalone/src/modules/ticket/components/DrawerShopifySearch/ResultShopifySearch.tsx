import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useSaveDataGlobal from "@moose-desk/core/hooks/useSaveDataGlobal";
import React, { useCallback, useImperativeHandle, useState } from "react";
import { useQuery } from "react-query";
import { Table } from "src/components/UI/Table";
import { getDetailShopifyCustomer } from "src/modules/ticket/api/api";
import { DetailOrderCustomer } from "src/modules/ticket/components/DrawerShopifySearch/DetailOrderCustomer";
import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import styles from "./styles.module.scss";
interface IProps {
  id: number;
}
const ResultShopifySearch = React.forwardRef(({ id }: IProps, ref) => {
  const { setDataSaved } = useSaveDataGlobal();
  const [dataOrder, setDataOrder] = useState<any>();
  const { data: resultData, isLoading } = useQuery({
    queryKey: [QUERY_KEY.CUSTOMER_SHOPIFY, id],
    queryFn: () => getDetailShopifyCustomer(String(id)),
    enabled: !!id,
    keepPreviousData: false,
    onSuccess: ({ data }) => {
      setDataSaved({ email: data?.data?.customerInfo?.email });
    },
  });
  const convertResult: { customerInfo: ListShopifyCustomerRes; orders: any } = (
    resultData as any
  )?.data?.data;
  const LIST_INFO = [
    {
      title: "Customer Name",
      value: `${convertResult?.customerInfo.first_name} ${convertResult?.customerInfo.last_name}`,
    },
    {
      title: "Email Address",
      value: convertResult?.customerInfo.email,
    },
    {
      title: "Phone Numbers",
      value: convertResult?.customerInfo?.phone || "",
    },
    {
      title: "Amount spent",
      value: convertResult?.customerInfo.total_spent,
    },
    {
      title: "Total Orders",
      value: convertResult?.customerInfo.orders_count,
    },
  ];
  const convertDataTable = convertResult?.orders.map((item: any) => {
    return {
      ...item,
      name: item?.name,
      total: item?.current_total_price,
    };
  });
  useImperativeHandle(
    ref,
    () => {
      return {
        clearDataOrder() {
          setDataOrder(undefined);
        },
      };
    },
    []
  );
  const handleClickRow = (record: any) => {
    setDataOrder(record);
  };
  const handleBack = useCallback(() => {
    setDataOrder(undefined);
  }, []);
  const columns = [
    {
      title: "",
      dataIndex: "name",
      width: "50%",
      render: (nameOrder: string) => <div>Order{nameOrder}</div>,
    },
    {
      title: "",
      dataIndex: "total",
      width: "50%",
      render: (price: string, record: any) => (
        <div>
          {price}
          {record?.currency}
        </div>
      ),
    },
  ];
  const _renderInfoCustomer = () => {
    return isLoading ? (
      <div>Loading Customer ...</div>
    ) : (
      <div className={styles.customerInfo}>
        {LIST_INFO.map((block, index) => (
          <div key={index} className="flex-center justify-between">
            <div className="w-40">{block.title}: </div>
            <div className="w-60">{block.value}</div>
          </div>
        ))}
      </div>
    );
  };
  const _renderTableOrDetailOrder = () => {
    return dataOrder?.name ? (
      <DetailOrderCustomer onBack={handleBack} dataOrder={dataOrder} />
    ) : (
      <Table
        className={styles.tableListOrder}
        columns={columns}
        dataSource={convertDataTable}
        rowKey={(record) => record.id}
        onRow={(record, _) => {
          return {
            onClick: () => handleClickRow(record),
          };
        }}
        scroll={{ y: 500 }}
      />
    );
  };
  const _renderListOrder = () => {
    return isLoading ? (
      <div>Loading Orders...</div>
    ) : (
      <div className="mt-10">{_renderTableOrDetailOrder()}</div>
    );
  };
  return (
    <div className="mt-10">
      {_renderInfoCustomer()}
      {_renderListOrder()}
    </div>
  );
});
export default React.memo(ResultShopifySearch);
