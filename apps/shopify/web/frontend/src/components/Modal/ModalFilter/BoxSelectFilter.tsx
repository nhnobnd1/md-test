import { Combobox, Listbox } from "@shopify/polaris";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
interface Data {
  value: string;
  label: string;
}
interface BoxSelectAutoReplyProps {
  placeholder?: string;
  label?: string;
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
      activator={
        <Combobox.TextField
          onChange={updateText}
          label={<div className="mb-3">{props.label}</div>}
          labelHidden={!props.label}
          value={inputValue}
          //   placeholder=""
          autoComplete="off"
          error={props.error}
          {...props}
          // onBlur={handleResetValueText}
        />
      }
    >
      {options.length > 0 ? (
        <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
      ) : null}
    </Combobox>
  );
};

export default memo(BoxSelectFilter);
