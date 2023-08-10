import { emailRegex } from "@moose-desk/core";
import { Button, Combobox, Icon, Listbox } from "@shopify/polaris";
import { CustomerPlusMajor } from "@shopify/polaris-icons";
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
  openPopup?: any;
  onSearch?: (value: string) => any;
  loading?: boolean;
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
      props.onSearch && props.onSearch(value);
      props.form.current.setFieldValue("to", value);
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
    [options]
  );

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) => {
        return option.value === selected;
      });
      setSelectedOption(selected);

      setInputValue((matchedOption && matchedOption.value) || "");

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
  const loadingMarkup = props.loading ? (
    <Listbox.Loading accessibilityLabel="loading" />
  ) : null;
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
      ) : props.openPopup ? (
        <Listbox>
          <Button
            icon={
              <div className="mx-1">
                <Icon source={CustomerPlusMajor} color="base" />
              </div>
            }
            plain
            fullWidth
            textAlign="left"
            size="slim"
            onClick={() => {
              if (emailRegex.test(inputValue)) {
                props.openPopup();
              }
            }}
          >
            Add new contact
          </Button>
          {loadingMarkup}
        </Listbox>
      ) : null}
    </Combobox>
  );
};

export default memo(BoxSelectCustomer);
