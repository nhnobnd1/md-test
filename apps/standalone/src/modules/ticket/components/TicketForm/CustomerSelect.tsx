import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { SelectProps } from "antd";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import useMessage from "src/hooks/useMessage";
import { AutoSelect } from "src/modules/ticket/components/TicketForm/AutoSelect";
import { getListCustomerApi } from "src/modules/ticket/helper/api";

interface SelectListProps extends SelectProps {}

export const CustomerSelect: FC<SelectListProps> = ({ ...props }) => {
  const message = useMessage();
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>(
    props.value?.split(",")[1] || ""
  );
  const debounceValue: string = useDebounce(search, 200);

  const { data: dataCustomers, isFetching: isFetchingCustomer } = useQuery({
    queryKey: ["getCustomers", { page: 1, limit: 10, query: debounceValue }],
    queryFn: () =>
      getListCustomerApi({ page: 1, limit: 10, query: debounceValue }),
    retry: 3,
    staleTime: 10000,
    onError: () => {
      message.error(t("messages:error.get_customer"));
    },
  });
  const customersOptions = useMemo(() => {
    if (!dataCustomers) return [];
    return dataCustomers.map((item) => {
      return {
        label: `${item.firstName} ${item.lastName} - ${item.email}`,
        value: item.email,
        obj: item,
      };
    });
  }, [dataCustomers]);
  return (
    <AutoSelect
      onSearch={(value) => {
        if (!value) {
          setSearch(value);
          return;
        }
        if (customersOptions?.find((item) => item.value.includes(value))) {
          return;
        }
        setSearch(value);
      }}
      allowClear
      showSearch
      onClear={() => {
        setSearch("");
      }}
      placeholder="Search customer"
      options={customersOptions}
      loading={isFetchingCustomer}
      filterOption={(input, option: any) => {
        return option?.label?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }}
      {...props}
    />
  );
};
