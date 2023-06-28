import { MediaScreen } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import useSaveDataGlobal from "@moose-desk/core/hooks/useSaveDataGlobal";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import { Collapse } from "antd";
import { memo, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import { MDSearchInput } from "src/components/UI/MDSearchInput";
import useViewport from "src/hooks/useViewport";
import { getListShopifyCustomer } from "src/modules/ticket/api/api";
import ResultShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ResultShopifySearch";
import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import styles from "./styles.module.scss";
const ContentShopifySearch = () => {
  const { Panel } = Collapse;
  const { visible, setVisible } = useToggleGlobal();

  const queryClient = useQueryClient();
  const { isMobile } = useViewport(MediaScreen.LG);
  const parentRef: any = useRef(null);
  const { setDataSaved } = useSaveDataGlobal();
  const [querySearch, setQuerySearch] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: listCustomerOrdered } = useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER_SHOPIFY, querySearch],
    queryFn: () => getListShopifyCustomer({ query: querySearch }),
    keepPreviousData: true,
    enabled: !!querySearch,
    // cacheTime: 0,
    // staleTime: 0,
  });
  const memoDataSearch: ListShopifyCustomerRes[] = useMemo(() => {
    const data = (listCustomerOrdered as any)?.data?.data;
    return data;
  }, [listCustomerOrdered]);
  const handleSearch = (value: any) => {
    setQuerySearch(value);
  };
  const handleSelectCustomer = (value: any) => {
    setSelectedId(Number(value[0] || null));
    // parentRef?.current?.clearDataOrder();
  };
  // const handleClearSearch = () => {
  //   queryClient.removeQueries([QUERY_KEY.LIST_CUSTOMER_SHOPIFY, querySearch]);
  //   setDataSaved("");
  //   setSelectedId(null);
  //   setQuerySearch("");
  //   parentRef?.current?.clearDataOrder();
  // };
  const _renderListSearchResult = () => {
    return (
      <Collapse
        ghost
        accordion
        onChange={handleSelectCustomer}
        className={styles.collapseItem}
        destroyInactivePanel
      >
        {memoDataSearch?.map((item: ListShopifyCustomerRes, index) => (
          <Panel
            key={item.id}
            showArrow={false}
            header={
              <div className={styles.searchItemHeader}>
                <h5>
                  {item.first_name} {item.last_name}
                </h5>
                <div className={styles.email}>
                  <Icon name="email" />
                  <span>{item.email}</span>
                </div>
                <div className={styles.phone}>
                  <Icon name="phone" />
                  <span>{item.phone || "No Phone Number"}</span>
                </div>
                <div className={styles.detailOrder}>
                  <div className={styles.item}>
                    Orders: <span>{item.orders_count}</span>
                  </div>

                  <div className={styles.item}>
                    Amount:{" "}
                    <span>
                      {item.total_spent}
                      {item.currency}
                    </span>
                  </div>
                </div>
              </div>
            }
          >
            {selectedId && selectedId === item.id ? (
              <ResultShopifySearch id={selectedId} ref={parentRef} />
            ) : (
              ""
            )}
          </Panel>
        ))}
      </Collapse>
    );
  };
  // const _renderResultSearch = () => {
  //   return selectedId ? (
  //     <ResultShopifySearch ref={parentRef} id={selectedId} />
  //   ) : null;
  // };
  const handleBack = () => {
    setVisible(false);
  };
  return (
    <section className={styles.searchContainer}>
      <div className="flex-center justify-between">
        <div className={styles.wrapSearchInput}>
          <div className={styles.searchGroup}>
            {isMobile && (
              <MDButton
                type="text"
                onClick={handleBack}
                icon={<Icon name="back" />}
              />
            )}
            <MDSearchInput placeholder="Search" onTypeSearch={handleSearch} />
          </div>
          <div>{_renderListSearchResult()}</div>
        </div>
      </div>
      {/* {_renderResultSearch()} */}
    </section>
  );
};
export default memo(ContentShopifySearch);
