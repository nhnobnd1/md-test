import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Customer } from "@moose-desk/repo";
import { Icon, Link, SkeletonBodyText, Tooltip } from "@shopify/polaris";
import { CircleAlertMajor } from "@shopify/polaris-icons";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import MDAvatar from "src/components/MDAvatar/MDAvatar";
import { getOneCustomer } from "src/modules/customers/api/api";
// import { Table } from "src/components/UI/Table";
import {
  getDetailShopifyCustomer,
  getListShopifyCustomer,
} from "src/modules/ticket/api/api";
import CollapseDetailOrder from "src/modules/ticket/components/DrawerShopifySearch/component/CollapseDetailOrder";
import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import styles from "./styles.module.scss";
// import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
interface IProps {
  email: string;
  id: string;
}
const convertCustomerName = (customer: Customer) => {
  if (customer.honorific) {
    return `(${customer.honorific}.) ${customer.firstName} ${customer.lastName}`;
  }
  return `${customer.firstName} ${customer.lastName}`;
};
const ResultShopifySearch = ({ email = "", id = "" }: IProps) => {
  const [idFromShopify, setIdFromShopify] = useState<number | null>(null);
  const { data: customer, isFetching: isLoadingCustomer }: any = useQuery({
    queryKey: ["one_customer", id],
    queryFn: () => getOneCustomer(id),
    enabled: !!id,
  });
  const customerInfo: Customer | any = useMemo(() => {
    return customer?.data?.data;
  }, [customer?.data?.data]);
  useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER_SHOPIFY, { query: email }],
    queryFn: () => getListShopifyCustomer({ query: email }),
    enabled: !!email && !!customerInfo,
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
    queryKey: [QUERY_KEY.CUSTOMER_SHOPIFY, idFromShopify, id],
    queryFn: () => getDetailShopifyCustomer(String(idFromShopify)),
    enabled: !!idFromShopify && !!customerInfo,
  });

  const convertResult: {
    customerInfo: ListShopifyCustomerRes;
    orders: any;
  } = (resultData as any)?.data?.data;

  const convertDataTable = convertResult?.orders.map((item: any) => {
    return {
      ...item,
      name: item?.name,
      total: item?.current_total_price,
    };
  });

  const customerFromShopify: ListShopifyCustomerRes =
    convertResult?.customerInfo;
  const _renderTableOrDetailOrder = () => {
    return (
      <div className={styles.listCollapse}>
        <div>
          {convertDataTable?.map((order: any, index: number) => (
            <CollapseDetailOrder
              key={index}
              order={order}
              uniqueIndex={index}
            />
          ))}
        </div>
      </div>
    );
  };
  const _renderListOrder = () => {
    return isLoading || isLoadingCustomer ? (
      <div>
        <SkeletonBodyText lines={3} />
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
                  skeleton={isLoadingCustomer}
                  source={customerInfo?.avatar}
                />
              </span>
              <span className={styles.result}>
                {isLoadingCustomer ? (
                  <SkeletonBodyText lines={1} />
                ) : (
                  convertCustomerName(customerInfo)
                )}
              </span>
            </div>
            <>
              {isLoadingCustomer ? (
                <SkeletonBodyText lines={4} />
              ) : (
                <>
                  <div className={styles.moreInfo}>
                    <span className={styles.label}>Email</span>
                    <span className={styles.result}>
                      <Link url={`mailto:${customerInfo?.email}`}>
                        {customerInfo?.email}
                      </Link>
                    </span>
                  </div>
                  <div className={styles.moreInfo}>
                    <span className={styles.label}>Phone</span>
                    <span className={styles.result}>
                      {customerInfo?.phoneNumber || "-"}
                    </span>
                  </div>
                  <div className={styles.moreInfo}>
                    <span className={styles.label}>Orders</span>
                    <span className={styles.result}>
                      {!customerFromShopify && "-"}
                      {customerFromShopify?.orders_count}
                      {!!customerFromShopify?.orders_count &&
                        !convertDataTable?.length && (
                          <div className="ml-2">
                            <Tooltip content="Only the last 60 days' worth of orders from a store">
                              <Icon source={CircleAlertMajor} color="base" />
                            </Tooltip>
                          </div>
                        )}
                    </span>
                  </div>
                  <div className={styles.moreInfo}>
                    <span className={styles.label}>Amount</span>
                    <span className={styles.result}>
                      {!customerFromShopify && "-"}
                      {customerFromShopify?.total_spent}{" "}
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
          {isLoading || isLoadingCustomer ? (
            <SkeletonBodyText lines={1} />
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
