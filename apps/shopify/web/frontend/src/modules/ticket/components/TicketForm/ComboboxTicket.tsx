import { Combobox, Listbox } from "@shopify/polaris";
import { FC, useCallback, useMemo, useState } from "react";
interface LabelValue {
  label: string;
  value: string;
}
interface ComboboxTicketProps {
  defaultOptions: LabelValue[];
  label: string;
}

export const ComboboxTicket: FC<ComboboxTicketProps> = ({
  defaultOptions,
  label,
}) => {
  const deselectedOptions = useMemo(() => {
    return defaultOptions || [];
  }, [defaultOptions]);

  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
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
    (selected: string) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || "");
    },
    [options]
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

  return (
    <div>
      <Combobox
        activator={
          <Combobox.TextField
            onChange={updateText}
            label={label}
            labelHidden
            value={inputValue}
            placeholder="From"
            autoComplete="off"
          />
        }
      >
        {options.length > 0 ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
    </div>
  );
};
