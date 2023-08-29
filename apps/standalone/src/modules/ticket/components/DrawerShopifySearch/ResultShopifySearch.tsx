import { CaretRightOutlined, InfoCircleTwoTone } from "@ant-design/icons";
import { getOneCustomer } from "@moose-beta/profile/api/api";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Customer } from "@moose-desk/repo";
import { Collapse, Tooltip } from "antd";
import Link from "antd/es/typography/Link";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import {
  getDetailShopifyCustomer,
  getListShopifyCustomer,
} from "src/modules/ticket/api/api";
import { DetailOrderCustomer } from "src/modules/ticket/components/DrawerShopifySearch/DetailOrderCustomer";
import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import styles from "./styles.module.scss";
interface IProps {
  email?: string;
  id?: string;
}
const convertCustomerName = (customer: Customer) => {
  if (customer.honorific) {
    return `(${customer.honorific}.) ${customer.firstName} ${customer.lastName}`;
  }
  return `${customer.firstName} ${customer.lastName}`;
};
const { Panel } = Collapse;
const ResultShopifySearch = ({ email = "", id = "" }: IProps) => {
  const [idFromShopify, setIdFromShopify] = useState<number | null>(null);
  const { data: customer, isFetching: isLoadingCustomer }: any = useQuery({
    queryKey: ["one_customer", id],
    queryFn: () => getOneCustomer(id),
    enabled: !!id,
  });
  useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER_SHOPIFY, { query: email }],
    queryFn: () => getListShopifyCustomer({ query: email }),
    enabled: !!email,
    onSuccess: ({ data }) => {
      const customerData: any = data?.data;
      if (customerData?.length > 0) {
        setIdFromShopify(customerData[0]?.id);
      } else {
        setIdFromShopify(null);
      }
    },
  });
  const { data: resultData, isFetching: isLoading } = useQuery({
    queryKey: [QUERY_KEY.CUSTOMER_SHOPIFY, idFromShopify],
    queryFn: () => getDetailShopifyCustomer(String(idFromShopify)),
    enabled: !!idFromShopify,
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
  const customerInfo: Customer | any = useMemo(() => {
    return customer?.data?.data;
  }, [customer?.data?.data]);
  const customerFromShopify: ListShopifyCustomerRes =
    convertResult?.customerInfo;
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
      <div>
        <MDSkeleton lines={3} />
      </div>
    ) : (
      <div>{_renderTableOrDetailOrder()}</div>
    );
  };
  return (
    <div className={styles.wrapListOrder}>
      {customerInfo && (
        <div className={styles.info}>
          <div className={styles.detailInfo}>
            <div className={styles.basicInfo}>
              <span className={styles.label}>
                <MDAvatar
                  firstName={customerInfo?.firstName}
                  lastName={customerInfo?.lastName}
                  email={customerInfo?.email}
                  size="small"
                  skeleton={isLoadingCustomer}
                  source={customerInfo?.avatar}
                />
              </span>
              <span className={styles.result}>
                {isLoadingCustomer ? (
                  <MDSkeleton lines={1} width={100} />
                ) : (
                  convertCustomerName(customerInfo)
                )}
              </span>
            </div>
            <>
              {isLoadingCustomer ? (
                <MDSkeleton lines={4} />
              ) : (
                <>
                  <div className={styles.moreInfo}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.result}>
                      <Link href={`mailto:${customerInfo?.email}`}>
                        {customerInfo?.email}
                      </Link>
                    </span>
                  </div>
                  <div className={styles.moreInfo}>
                    <span className={styles.label}>Phone:</span>
                    <span className={styles.result}>
                      {customerInfo?.phoneNumber || "No Phone Number"}
                    </span>
                  </div>
                  <div className={styles.moreInfo}>
                    <span className={styles.label}>Orders:</span>
                    <span className={styles.result}>
                      {customerFromShopify?.orders_count}
                      {!!customerFromShopify?.orders_count &&
                        !convertDataTable?.length && (
                          <Tooltip
                            title={
                              "Only the last 60 days' worth of orders from a store"
                            }
                            className="ml-2"
                            style={{ marginTop: 5 }}
                          >
                            <div className={styles.infoPicker}>
                              <InfoCircleTwoTone twoToneColor="#FA7D00" />
                            </div>
                          </Tooltip>
                        )}
                    </span>
                  </div>
                  <div className={styles.moreInfo}>
                    <span className={styles.label}>Amount:</span>
                    <span className={styles.result}>
                      {customerFromShopify?.total_spent}
                      {customerFromShopify?.currency}
                    </span>
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      )}
      {!!convertDataTable?.length && (
        <div className={styles.tableHead}>
          {isLoading ? (
            <MDSkeleton lines={1} />
          ) : (
            <>
              <div>#Order ID</div>
              <div>Amount</div>
            </>
          )}
        </div>
      )}
      {_renderListOrder()}
    </div>
  );
};
export default React.memo(ResultShopifySearch);
