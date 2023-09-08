import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { Combobox, Listbox } from "@shopify/polaris";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getListAgentApi } from "src/modules/ticket/helper/api";
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
const BoxSelectAssignee = (props: BoxSelectAutoReplyProps) => {
  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState(props.value?.split(",")[1] || "");
  const debounceValue: string = useDebounce(search, 200);
  const { data: dataAgents, isLoading } = useQuery({
    queryKey: [
      "getAgents",
      {
        page: 1,
        limit: 10,
        isLive: 1,
        query: debounceValue,
      },
    ],
    queryFn: () =>
      getListAgentApi({
        page: 1,
        limit: 10,
        isLive: 1,
        query: debounceValue,
      }),
    // staleTime: 10000,
    onSuccess: () => {
      if (count === 0) {
        setCount(1);
      }
    },

    retry: 1,

    onError: () => {},
  });

  const agentsOptions = useMemo(() => {
    if (!dataAgents) return [];
    return dataAgents.map((item) => ({
      label: item.lastName.includes("admin")
        ? `${item.firstName} - ${item.email}`
        : `${item.firstName} ${item.lastName} - ${item.email}`,
      value: `${item._id},${item.email}`,
      obj: item,
    }));
  }, [dataAgents]);

  const updateText = useCallback((value) => {
    setSearch(value);
    setInputValue(value);
    props.onChange && props.onChange(value);
  }, []);

  useEffect(() => {
    if (count === 1) {
      updateSelection(props.value);
      setCount(2);
    }
  }, [dataAgents, count, props.value]);

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = agentsOptions.find((option) => {
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
    [agentsOptions, props.value, props.onChange]
  );

  const optionsMarkup =
    agentsOptions.length > 0
      ? agentsOptions.map((option) => {
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
    if (!props.value) {
      updateSelection("");
    }
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
          clearButton
          onClearButtonClick={() => {
            setSearch("");
            props.onChange && props.onChange(null);
          }}
          value={inputValue}
          autoComplete="off"
          error={props.error}
          placeholder={props.placeholder}
        />
      }
    >
      {(agentsOptions.length === 0 && !isLoading) || props.disabled ? null : (
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

export default memo(BoxSelectAssignee);
