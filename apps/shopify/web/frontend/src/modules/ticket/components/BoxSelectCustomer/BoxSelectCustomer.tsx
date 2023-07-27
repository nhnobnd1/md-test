import { Combobox, Listbox } from "@shopify/polaris";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useSaveDataGlobal from "src/hooks/useSaveDataGlobal";
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
  form: any;
}

const BoxSelectCustomer = (props: BoxSelectAutoReplyProps) => {
  // config UI

  // init data
  const { dataSaved }: any = useSaveDataGlobal();

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
  useEffect(() => {
    if (!dataSaved?.email) return;
    setInputValue(dataSaved?.email);
    props.form.current.setFieldValue("to", dataSaved?.email);
  }, [dataSaved?.email]);
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
      props.form.current.setFieldValue("to", value);
    },
    [options]
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

  useEffect(() => {
    setOptions(props.data);
    updateSelection(props.value);
    if (props.value) {
      setInputValue(props.value);
    }
  }, [props.data]);
  return (
    <Combobox
      activator={
        <Combobox.TextField
          label={props.label}
          labelHidden={!props.label}
          autoComplete="off"
          error={props.error}
          {...props}
          value={inputValue}
          onChange={updateText}
        />
      }
    >
      {options.length > 0 && !props.disabled ? (
        <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
      ) : null}
    </Combobox>
  );
};

export default memo(BoxSelectCustomer);
