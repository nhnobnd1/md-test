import { Combobox, Listbox } from "@shopify/polaris";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import timeZoneList from "src/constaint/timeZone";

interface SelectTimeZoneProps {
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

const SelectTimeZone = (props: SelectTimeZoneProps) => {
  // config UI

  // init data

  const optionSelectTimeZone = timeZoneList.timeZone.map(
    (item: { olsonName: string; description: string }) => {
      return item;
    }
  );

  const deselectedOptions = useMemo(() => {
    return optionSelectTimeZone.map((item) => ({
      label: item.description,
      value: item.description,
    }));
  }, []);

  const [selectedOption, setSelectedOption] = useState();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

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
    [deselectedOptions]
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
    },
    [options, props.value]
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option, index) => {
          const { label, value } = option;
          return (
            <Listbox.Option
              key={index}
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
    updateSelection(props.value);
  }, [props.value]);
  return (
    <Combobox
      activator={
        <Combobox.TextField
          onChange={updateText}
          label="Search"
          labelHidden
          value={inputValue}
          placeholder="Search"
          autoComplete="off"
        />
      }
    >
      {options.length > 0 ? (
        <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
      ) : null}
    </Combobox>
  );
};

export default memo(SelectTimeZone);
