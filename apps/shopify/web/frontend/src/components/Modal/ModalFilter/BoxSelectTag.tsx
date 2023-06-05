import { Combobox, LegacyStack, Listbox, Tag } from "@shopify/polaris";
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

const BoxSelectTag = (props: BoxSelectAutoReplyProps) => {
  const deselectedOptions = useMemo(() => {
    return props.data;
  }, [props.data]);

  const [selectedOption, setSelectedOption] = useState<any>();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >(deselectedOptions);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const removeTag = useCallback(
    (tag: string) => () => {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag)
      );
    },
    []
  );

  const tagMarkup =
    selectedTags?.length > 0
      ? selectedTags.map((option) => (
          <Tag key={option} onRemove={removeTag(option)}>
            {option}
          </Tag>
        ))
      : null;

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
      if (selected?.length) {
        setSelectedTags((previousTags) => {
          if (previousTags.includes(selected)) return previousTags;
          return [...previousTags, ...selected.split(",")];
        });
      }

      setInputValue("");
      setSelectedOption("");
    },
    [options]
  );

  const optionsMarkup = (
    <>
      {options.map((option) => {
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
      })}
    </>
  );
  useEffect(() => {
    props.onChange && props.onChange(selectedTags);
  }, [selectedTags?.length]);
  useEffect(() => {
    setOptions(props.data);
    updateSelection(props.value);
  }, [props.data]);

  return (
    <>
      <Combobox
        activator={
          <Combobox.TextField
            onChange={updateText}
            label={<div className="mb-3">{props.label}</div>}
            labelHidden={!props.label}
            value={inputValue}
            autoComplete="off"
            error={props.error}
          />
        }
      >
        <>
          {" "}
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        </>
      </Combobox>
      {props.value?.length ? (
        <div className="mt-5">
          <LegacyStack spacing="tight">{tagMarkup}</LegacyStack>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(BoxSelectTag);
