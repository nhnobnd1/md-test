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
  const { data: dataAgents } = useQuery({
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

  return (
    <Combobox
      height={props.disabled ? "0" : ""}
      activator={
        <Combobox.TextField
          onChange={updateText}
          label={props.label}
          labelHidden={!props.label}
          // onFocus={() => {
          //   setSearch("");
          // }}
          onBlur={() => {
            if (agentsOptions.length === 0) {
              setInputValue("");
              setSearch("");
            }
          }}
          value={inputValue}
          autoComplete="off"
          error={props.error}
          placeholder={props.placeholder}
        />
      }
    >
      {agentsOptions.length > 0 && !props.disabled ? (
        <div className="min-h-[100px]">
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        </div>
      ) : null}
    </Combobox>
  );
};

export default memo(BoxSelectAssignee);
