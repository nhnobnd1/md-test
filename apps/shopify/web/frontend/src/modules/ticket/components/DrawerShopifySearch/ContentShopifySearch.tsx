import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
// import { Select } from "antd";
import { memo, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { MDTextField } from "src/components/Input/TextFieldPassword/MDTextField";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
import { getListShopifyCustomer } from "src/modules/ticket/api/api";
import ResultShopifySearch from "src/modules/ticket/components/DrawerShopifySearch/ResultShopifySearch";
// import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import styles from "./styles.module.scss";
const ContentShopifySearch = () => {
  const queryClient = useQueryClient();
  const parentRef: any = useRef(null);
  const { setDataSaved } = useSaveDataGlobal();
  const [querySearch, setQuerySearch] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const debounceSearch: string = useDebounce(querySearch, 300);
  const { data: listCustomerOrdered } = useQuery({
    queryKey: [QUERY_KEY.LIST_CUSTOMER_SHOPIFY, debounceSearch],
    queryFn: () => getListShopifyCustomer({ query: debounceSearch }),
    keepPreviousData: true,
    enabled: !!debounceSearch,
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
  const handleClearSearch = () => {
    queryClient.removeQueries([
      QUERY_KEY.LIST_CUSTOMER_SHOPIFY,
      debounceSearch,
    ]);
    setDataSaved("");
    setSelectedId(null);
    setQuerySearch("");
    parentRef?.current?.clearDataOrder();
  };
  const _renderListOption = () => {
    return memoDataSearch?.map((item: any, index: number) => (
      <div
        className={styles.itemSearched}
        key={index}
        onClick={() => handleSelectCustomer(item?.id)}
      >{`${item.first_name} ${item.last_name} - ${item.email}`}</div>
    ));
  };
  const _renderResultSearch = () => {
    return selectedId ? (
      <ResultShopifySearch ref={parentRef} id={selectedId} />
    ) : null;
  };

  return (
    <section className={styles.searchContainer}>
      {/* <img className={styles.icon} src={shopifyLogo} alt="logo" /> */}
      <div className={styles.wrapSearchInput}>
        <MDTextField
          value={querySearch}
          type="search"
          onChange={handleSearch}
        />
        {!selectedId && _renderListOption()}
        {_renderResultSearch()}
        {/* <Select
            className={styles.customizeSelect}
            allowClear={true}
            suffixIcon={<SearchOutlined />}
            placeholder="Search"
            onSearch={handleSearch}
            onChange={handleSelectCustomer}
            showSearch
            optionFilterProp="children"
            onClear={handleClearSearch}
          >
            {!!querySearch && _renderListOption()}
          </Select> */}
      </div>

      {/* {_renderResultSearch()} */}
    </section>
  );
};
export default memo(ContentShopifySearch);
