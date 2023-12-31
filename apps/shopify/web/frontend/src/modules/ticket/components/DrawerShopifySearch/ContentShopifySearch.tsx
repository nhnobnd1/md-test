import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Button, LegacyCard } from "@shopify/polaris";
// import { Select } from "antd";
import { memo, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Search } from "src/components/Search/Search";
import SkeletonCard from "src/components/Skelaton/SkeletonCard";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
import { getListShopifyCustomer } from "src/modules/ticket/api/api";
import OrderOverview from "src/modules/ticket/components/DrawerShopifySearch/component/OrderOverview";
import ResultShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ResultShopifySearch";
// import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import { MediaScreen } from "@moose-desk/core";
import { MobileBackArrowMajor } from "@shopify/polaris-icons";
import useScreenType from "src/hooks/useScreenType";
import useToggleGlobal from "src/hooks/useToggleGlobal";
import styles from "./styles.module.scss";
const ContentShopifySearch = () => {
  const { setVisible } = useToggleGlobal();
  const [screenType, screenWidth] = useScreenType();
  const isMobileOrTablet = Boolean(screenWidth <= MediaScreen.LG);
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
          <LegacyCard sectioned>
            <OrderOverview detail={item} />
          </LegacyCard>
        </div>
      ))
    );
  };
  const _renderResultSearch = () => {
    return selectedId ? (
      <ResultShopifySearch ref={parentRef} id={selectedId} />
    ) : null;
  };

  return isMobileOrTablet ? (
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
    <LegacyCard sectioned>
      <div className={styles.wrapSearchInput}>
        <Search onTypeSearch={handleSearch} />

        {!selectedId && _renderListOption()}
        {_renderResultSearch()}
      </div>
    </LegacyCard>
  );
};
export default memo(ContentShopifySearch);
