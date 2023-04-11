import { SearchOutlined } from "@ant-design/icons";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { Select } from "antd";
import { memo, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import shopifyLogo from "src/assets/images/shopifyIcon.png";
import { getListShopifyCustomer } from "src/modules/ticket/api/api";
import { ResultShopifySearch } from "src/modules/ticket/components/DrawerShopifySearch/ResultShopifySearch";
import ListShopifyCustomerRes from "src/modules/ticket/helper/interface";
import styles from "./styles.module.scss";
const ContentShopifySearch = () => {
  const queryClient = useQueryClient();
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
  const memoDataSearch: ListShopifyCustomerRes[] = useMemo(() => {
    const data = (listCustomerOrdered as any)?.data?.data;
    return data;
  }, [listCustomerOrdered]);

  const handleSearch = (value: any) => {
    setQuerySearch(value);
  };
  const handleSelectCustomer = (value: number) => {
    setSelectedId(value);
  };
  const handleClearSearch = () => {
    queryClient.cancelQueries([
      QUERY_KEY.LIST_CUSTOMER_SHOPIFY,
      debounceSearch,
    ]);
    setSelectedId(null);
    setQuerySearch("");
  };
  const _renderListOption = () => {
    return memoDataSearch?.map((item: ListShopifyCustomerRes) => (
      <Select.Option
        key={item.id}
        value={item.id}
      >{`${item.first_name} ${item.last_name}`}</Select.Option>
    ));
  };
  const _renderResultSearch = () => {
    return selectedId ? <ResultShopifySearch id={selectedId} /> : null;
  };
  return (
    <section>
      <div className="flex-center justify-between">
        <img className={styles.icon} src={shopifyLogo} alt="logo" />
        <div className={styles.wrapSearchInput}>
          <Select
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
          </Select>
        </div>
      </div>
      {_renderResultSearch()}
    </section>
  );
};
export default memo(ContentShopifySearch);
