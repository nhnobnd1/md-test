import { AutoReply } from "@moose-desk/repo";
import { Combobox, Icon, Listbox } from "@shopify/polaris";
import { ChevronDownMinor } from "@shopify/polaris-icons";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

interface BoxSelectAutoReplyProps {
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  onChange?: (value: any) => void;
  disabled?: boolean;
  dataAutoReply: AutoReply[];
}

const BoxSelectAutoReply = (props: BoxSelectAutoReplyProps) => {
  // config UI

  // init data

  const deselectedOptions = useMemo(() => {
    return props.dataAutoReply.map((item) => ({
      label: item.name,
      value: item.code,
    }));
  }, [props.dataAutoReply]);

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
        props.onChange && props.onChange("");
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
      if (selected === undefined) {
        props.onChange && props.onChange(null);
      }
    },
    [options, props.value]
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
    setOptions(
      props.dataAutoReply.map((item) => ({
        label: item.name,
        value: item.code,
      }))
    );
    updateSelection(props.value);
  }, [props.dataAutoReply, props.value]);

  return (
    <Combobox
      activator={
        <Combobox.TextField
          onChange={updateText}
          label={
            <div>
              <span className="text-red">*</span> {props.label}
            </div>
          }
          labelHidden={!props.label}
          value={inputValue}
          placeholder={props.placeholder || "Search"}
          autoComplete="off"
          suffix={
            <Icon
              accessibilityLabel="select"
              source={() => <ChevronDownMinor />}
            />
          }
          error={props.error}

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

export default memo(BoxSelectAutoReply);
