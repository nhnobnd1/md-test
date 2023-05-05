import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { IndexTable } from "@shopify/polaris";
import React, { useCallback, useImperativeHandle, useState } from "react";
import { useQuery } from "react-query";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
// import { Table } from "src/components/UI/Table";
import { getDetailShopifyCustomer } from "src/modules/ticket/api/api";
import { DetailOrderCustomer } from "src/modules/ticket/components/DrawerShopifySearch/DetailOrderCustomer";
// import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
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
  const convertResult: { customerInfo: any; orders: any } = (resultData as any)
    ?.data?.data;
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
  const _renderInfoCustomer = () => {
    return isLoading ? (
      <div>Loading Customer ...</div>
    ) : (
      <div className={styles.customerInfo}>
        {LIST_INFO.map((block, index) => (
          <div key={index} className="flex-center justify-between">
            <div className="">
              <span style={{ fontWeight: 700 }}>{block.title}: </span>:{" "}
              <span>{block.value}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const rowMarkup = convertDataTable?.map((item: any, index: number) => (
    <IndexTable.Row id={item?.id} key={index} position={index}>
      <IndexTable.Cell>
        <div className="pointer" onClick={() => handleClickRow(item)}>
          Order{item?.name}
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <div className="pointer" onClick={() => handleClickRow(item)}>
          {item?.total}
          {item?.currency}
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));
  const _renderTableOrDetailOrder = () => {
    return dataOrder?.name ? (
      <DetailOrderCustomer onBack={handleBack} dataOrder={dataOrder} />
    ) : (
      <IndexTable
        selectable={false}
        //       resourceName={const resourceName = {
        //   singular: 'order',
        //   plural: 'orders',
        // };}
        headings={[{ title: "" }, { title: "" }]}
        itemCount={convertDataTable?.length || 10}
      >
        {rowMarkup}
      </IndexTable>
    );
  };
  const _renderListOrder = () => {
    return isLoading ? (
      <div>Loading Orders...</div>
    ) : (
      <div className="mt-3">{_renderTableOrDetailOrder()}</div>
    );
  };
  return (
    <div className="mt-3">
      {_renderInfoCustomer()}
      {_renderListOrder()}
    </div>
  );
});
export default React.memo(ResultShopifySearch);
