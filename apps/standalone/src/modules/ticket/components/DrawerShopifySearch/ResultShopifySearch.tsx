import { CaretRightOutlined } from "@ant-design/icons";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useSaveDataGlobal from "@moose-desk/core/hooks/useSaveDataGlobal";
import { Collapse } from "antd";
import React, { useImperativeHandle, useMemo } from "react";
import { useQuery } from "react-query";
import { getDetailShopifyCustomer } from "src/modules/ticket/api/api";
import { DetailOrderCustomer } from "src/modules/ticket/components/DrawerShopifySearch/DetailOrderCustomer";
import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import styles from "./styles.module.scss";
interface IProps {
  id: number;
}
const { Panel } = Collapse;
const ResultShopifySearch = React.forwardRef(({ id }: IProps, ref) => {
  const { setDataSaved } = useSaveDataGlobal();
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

  const convertDataTable = useMemo(() => {
    return convertResult?.orders.map((item: any) => {
      return {
        ...item,
        name: item?.name,
        total: item?.current_total_price,
      };
    });
  }, [convertResult?.orders]);
  useImperativeHandle(
    ref,
    () => {
      return {
        clearDataOrder() {},
      };
    },
    []
  );
  const _renderTableOrDetailOrder = () => {
    return (
      <Collapse
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            style={{ color: "#FA7D00" }}
            rotate={isActive ? 90 : 0}
          />
        )}
        accordion
      >
        {convertDataTable?.map((order: any, index: number) => (
          <Panel
            header={
              <div className={styles.collapseHeaderOrder}>
                <p className={styles.orderName}>{order?.name}</p>
                <p className={styles.total}>
                  {order?.total}
                  {order?.currency}
                </p>
              </div>
            }
            key={index}
          >
            <DetailOrderCustomer dataOrder={order} />
          </Panel>
        ))}
      </Collapse>
    );
  };
  const _renderListOrder = () => {
    return isLoading ? (
      <div>Loading Orders...</div>
    ) : (
      <div>{_renderTableOrDetailOrder()}</div>
    );
  };
  return (
    <div className={styles.wrapListOrder}>
      {!!convertDataTable?.length && (
        <div className={styles.tableHead}>
          <div>#Order ID</div>
          <div>Amount</div>
        </div>
      )}
      {_renderListOrder()}
    </div>
  );
});
export default React.memo(ResultShopifySearch);
