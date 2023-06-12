import { AutoReply } from "@moose-desk/repo";
import { Select } from "antd";
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
    [deselectedOptions]
  );

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) => {
        return option.value === selected;
      });
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

          return { label, value };
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
    <div>
      <Select
        value={inputValue}
        onSearch={updateText}
        options={optionsMarkup || []}
        onChange={updateSelection}
        placeholder="Choose your auto-reply outside of business hours. You can set up new message in the “Auto-Reply” Tab"
        showSearch
        allowClear
      ></Select>
    </div>
  );
};

export default memo(BoxSelectAutoReply);
