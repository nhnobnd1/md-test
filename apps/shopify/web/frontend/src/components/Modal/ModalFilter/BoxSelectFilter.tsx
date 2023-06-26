import { Combobox, EmptySearchResult, Listbox } from "@shopify/polaris";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
  data: Data[];
}

const BoxSelectFilter = (props: BoxSelectAutoReplyProps) => {
  // config UI

  // init data

  const deselectedOptions = useMemo(() => {
    return props.data;
  }, [props.data]);
  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions, props.onChange]
  );

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) => {
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
    [options, props.value, props.onChange]
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
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

  // handle Effect

  useEffect(() => {
    setOptions(props.data);
    updateSelection(props.value);
  }, [props.data, props.value, props.onChange]);
  return (
    <Combobox
      height={props.disabled ? "0" : ""}
      activator={
        <Combobox.TextField
          onChange={updateText}
          label={props.label}
          labelHidden={!props.label}
          onFocus={() => {
            setOptions(props.data);
          }}
          onBlur={() => {
            if (options.length === 0) {
              setInputValue("");
            }
          }}
          value={inputValue}
          autoComplete="off"
          error={props.error}
          placeholder={props.placeholder}
          // {...props} //for fix bug cannot search select by keyword => cannot detect event onchange
        />
      }
    >
      {options.length > 0 && !props.disabled ? (
        <div className="min-h-[100px]">
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        </div>
      ) : (
        <div className="p-3 h-[100px]">
          <EmptySearchResult
            title={
              "Sorry! There is no records matched with your search criteria"
            }
            description={"Try changing the filters or search term"}
          />
        </div>
      )}
    </Combobox>
  );
};

export default memo(BoxSelectFilter);
