import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import React from "react";
import { useQuery } from "react-query";
import { Table } from "src/components/UI/Table";
import { getDetailShopifyCustomer } from "src/modules/ticket/api/api";
import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import styles from "./styles.module.scss";
interface IProps {
  id: number;
}
export const ResultShopifySearch = React.memo(({ id }: IProps) => {
  const { data: resultData, isLoading } = useQuery({
    queryKey: [QUERY_KEY.CUSTOMER_SHOPIFY, id],
    queryFn: () => getDetailShopifyCustomer(String(id)),
    enabled: !!id,
    keepPreviousData: true,
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
      name: item?.name,
      total: item?.total_price,
    };
  });
  const columns = [
    {
      title: "",
      dataIndex: "name",
      width: "70%",
      render: (nameOrder: string) => <div>Order{nameOrder}</div>,
    },
    {
      title: "",
      dataIndex: "total",
      width: "30%",
      render: (price: string) => <div>${price}</div>,
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
  const _renderListOrder = () => {
    return isLoading ? (
      <div>Loading Orders...</div>
    ) : (
      <div className="mt-10">
        <Table
          columns={columns}
          dataSource={convertDataTable}
          rowKey={(record) => record.id}
          scroll={{ y: 500 }}
        />
      </div>
    );
  };
  return (
    <div className="mt-10">
      {_renderInfoCustomer()}
      {_renderListOrder()}
    </div>
  );
});
