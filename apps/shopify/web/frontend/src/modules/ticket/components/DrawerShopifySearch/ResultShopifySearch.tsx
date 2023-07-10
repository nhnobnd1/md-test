import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { LegacyCard } from "@shopify/polaris";
import React, { useImperativeHandle } from "react";
import { useQuery } from "react-query";
import SkeletonCard from "src/components/Skelaton/SkeletonCard";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
// import { Table } from "src/components/UI/Table";
import { getDetailShopifyCustomer } from "src/modules/ticket/api/api";
import CollapseDetailOrder from "src/modules/ticket/components/DrawerShopifySearch/component/CollapseDetailOrder";
import OrderOverview from "src/modules/ticket/components/DrawerShopifySearch/component/OrderOverview";
import styles from "./styles.module.scss";
// import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
interface IProps {
  id: number;
}
const ResultShopifySearch = React.forwardRef(({ id }: IProps, ref) => {
  const { setDataSaved } = useSaveDataGlobal();
  // const [activePanel, setActivePanel] = useState<number>(999);
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
          // setDataOrder(undefined);
        },
      };
    },
    []
  );
  // const handleClickPanel = (panelIndex: number) => {
  //   setActivePanel(panelIndex);
  // };
  const _renderInfoCustomer = () => {
    return isLoading ? (
      <LegacyCard sectioned>
        <SkeletonCard />
        <SkeletonCard noHeading count={5} lines={1} />
      </LegacyCard>
    ) : (
      <LegacyCard sectioned>
        <OrderOverview detail={convertResult?.customerInfo} />
        {_renderTableOrDetailOrder()}
      </LegacyCard>
    );
  };
  const _renderTableOrDetailOrder = () => {
    return (
      <div className={styles.listCollapse}>
        <div className={styles.heading}>
          <span>#Order ID</span>
          <span>Amount</span>
        </div>
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
  return <div className={styles.wrapResult}>{_renderInfoCustomer()}</div>;
});
export default React.memo(ResultShopifySearch);
