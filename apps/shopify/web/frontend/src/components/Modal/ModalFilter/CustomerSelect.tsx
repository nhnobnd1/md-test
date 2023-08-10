import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { Combobox, Listbox } from "@shopify/polaris";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getListCustomerApi } from "src/modules/ticket/helper/api";
import useSelectFrom from "src/modules/ticket/store/useSelectFrom";
interface Data {
  value: string;
  label: string;
}
interface BoxSelectAutoReplyProps {
  placeholder?: string;
  label?: any;
  value?: string;
  error?: string;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

const CustomerSelect = (props: BoxSelectAutoReplyProps) => {
  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState(props.value || "");
  const [search, setSearch] = useState("");
  const debounceValue: string = useDebounce(search, 200);
  const { data: dataCustomers, isLoading } = useQuery({
    queryKey: ["getCustomers", { page: 1, limit: 10, query: debounceValue }],
    queryFn: () =>
      getListCustomerApi({ page: 1, limit: 10, query: debounceValue }),
    retry: 3,
    // staleTime: 10000,
    onError: () => {
      //   message.error(t("messages:error.get_customer"));
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
  const changeSelected = useSelectFrom((state) => state.changeSelected);
  const updateText = useCallback((value) => {
    setSearch(value);
    setInputValue(value);
  }, []);

  const updateSelection = useCallback(
    (selected) => {
      changeSelected(selected);
      const matchedOption = customersOptions.find((option) => {
        return option.value === selected;
      });
      setSelectedOption(selected);

      setInputValue((matchedOption && matchedOption.label) || "");

      if (selected !== props.value) {
        props.onChange && props.onChange(selected);
      }
      if (selected === undefined) {
        props.onChange && props.onChange(null);
      }
    },
    [customersOptions, props.value, props.onChange]
  );

  const optionsMarkup =
    customersOptions.length > 0
      ? customersOptions.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;
  useEffect(() => {
    setInputValue(props.value || "");
  }, [props.value]);

  const loadingMarkup = isLoading ? (
    <Listbox.Loading accessibilityLabel="loading" />
  ) : null;

  return (
    <Combobox
      height={props.disabled ? "0" : ""}
      activator={
        <Combobox.TextField
          onChange={updateText}
          label={props.label}
          labelHidden={!props.label}
          //   onFocus={() => {
          //     setOptions(props.data);
          //   }}
          onBlur={() => {
            if (customersOptions.length === 0) {
              setInputValue("");
            }
          }}
          value={inputValue}
          autoComplete="off"
          error={props.error}
          placeholder={props.placeholder}
        />
      }
    >
      {(customersOptions.length === 0 && !isLoading) ||
      props.disabled ? null : (
        <div className="">
          <Listbox onSelect={updateSelection}>
            {optionsMarkup}
            {loadingMarkup}
          </Listbox>
        </div>
      )}
    </Combobox>
  );
};

export default memo(CustomerSelect);
