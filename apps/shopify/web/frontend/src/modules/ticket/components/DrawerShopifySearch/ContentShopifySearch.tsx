import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Button, Card } from "@shopify/polaris";
// import { Select } from "antd";
import { memo, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Search } from "src/components/Search/Search";
import SkeletonCard from "src/components/Skelaton/SkeletonCard";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
import { getListShopifyCustomer } from "src/modules/ticket/api/api";
import OrderOverview from "src/modules/ticket/components/DrawerShopifySearch/component/OrderOverview";
import ResultShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ResultShopifySearch";
// import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import { isMobile } from "react-device-detect";
import useToggleGlobal from "src/hooks/useToggleGlobal";
import styles from "./styles.module.scss";
const ContentShopifySearch = () => {
  const { visible, setVisible } = useToggleGlobal();

  const queryClient = useQueryClient();
  const parentRef: any = useRef(null);
  const { setDataSaved } = useSaveDataGlobal();
  const [querySearch, setQuerySearch] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: listCustomerOrdered, isFetching } = useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER_SHOPIFY, querySearch],
    queryFn: () => getListShopifyCustomer({ query: querySearch }),
    keepPreviousData: true,
    enabled: !!querySearch,
    cacheTime: 0,
    staleTime: 0,
  });
  const memoDataSearch: any[] = useMemo(() => {
    const data = (listCustomerOrdered as any)?.data?.data;
    return data;
  }, [listCustomerOrdered]);
  const handleSearch = (value: any) => {
    setQuerySearch(value);
    setSelectedId(null);
  };
  const handleSelectCustomer = (value: number) => {
    setSelectedId(value);
    parentRef?.current?.clearDataOrder();
  };
  // const handleClearSearch = () => {
  //   queryClient.removeQueries([QUERY_KEY.LIST_CUSTOMER_SHOPIFY, querySearch]);
  //   setDataSaved("");
  //   setSelectedId(null);
  //   setQuerySearch("");
  //   parentRef?.current?.clearDataOrder();
  // };
  // console.log(memoDataSearch, "memoDataSearch");
  const _renderListOption = () => {
    return isFetching ? (
      <div className={styles.itemSearched}>
        <SkeletonCard count={5} />
      </div>
    ) : (
      memoDataSearch?.map((item: any, index: number) => (
        <div
          className={styles.itemSearched}
          onClick={() => handleSelectCustomer(item?.id)}
          key={index}
        >
          <Card sectioned>
            <OrderOverview detail={item} />
          </Card>
        </div>
      ))
    );
  };
  const _renderResultSearch = () => {
    return selectedId ? (
      <ResultShopifySearch ref={parentRef} id={selectedId} />
    ) : null;
  };

  return isMobile ? (
    <div className={styles.wrapSearchInput}>
      <div className={styles.groupSearchOnMobile}>
        <Button
          icon={MobileBackArrowMajor}
          onClick={() => setVisible(false)}
        ></Button>
        <div className={styles.searchOnMobile}>
          <Search onTypeSearch={handleSearch} />
        </div>
      </div>
      <div className={styles.resultSearchContainer}>
        {!selectedId && _renderListOption()}
      </div>

      {_renderResultSearch()}
    </div>
  ) : (
    <Card sectioned>
      <div className={styles.wrapSearchInput}>
        <Search onTypeSearch={handleSearch} />

        {!selectedId && _renderListOption()}
        {_renderResultSearch()}
      </div>
    </Card>
  );
};
export default memo(ContentShopifySearch);
