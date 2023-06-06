import { Combobox, LegacyStack, Listbox, Tag } from "@shopify/polaris";
import { isEqual } from "lodash-es";
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

const SelectAddTag = (props: BoxSelectAutoReplyProps) => {
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
  const handleKeyPress = (event: any) => {
    const enterKeyPressed = event.keyCode === 13;

    if (enterKeyPressed && inputValue) {
      setSelectedTags((previousTags) => {
        if (previousTags.includes(inputValue)) return previousTags;
        return [...previousTags, inputValue];
      });
      event.preventDefault();
    }
  };

  const updateSelection = useCallback(
    (selected, init = false) => {
      if (selected?.length && inputValue === "") {
        setSelectedTags((previousTags) => {
          if (previousTags.includes(selected)) return previousTags;
          if (init) {
            return [...previousTags, ...selected];
          } else {
            return [...previousTags, selected];
          }
        });
        setInputValue("");
        setSelectedOption("");
      }
    },
    [options]
  );
  useEffect(() => {
    props.onChange && props.onChange(selectedTags);
  }, [selectedTags.length]);

  const optionsMarkup = (
    <>
      {/* <Listbox.Option key="add" value={inputValue}>
        Add tags
      </Listbox.Option> */}
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
    if (isEqual(selectedTags, props.value)) return;
    setOptions(props.data);
    updateSelection(props.value, true);
  }, [props.data]);

  return (
    <>
      <Combobox
        activator={
          <div onKeyDown={handleKeyPress}>
            <Combobox.TextField
              {...props}
              onChange={updateText}
              label={<div>{props.label}</div>}
              labelHidden={!props.label}
              value={inputValue}
              autoComplete="off"
              error={props.error}
            />
          </div>
        }
      >
        <>
          {props.disabled ? (
            <></>
          ) : (
            <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
          )}
        </>
      </Combobox>
      <div className="mt-2">
        <LegacyStack spacing="tight">{tagMarkup}</LegacyStack>
      </div>
    </>
  );
};

export default memo(SelectAddTag);
