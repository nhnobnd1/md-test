import { InputProps } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import Select from "src/components/UI/Select/Select";
import timeZoneList from "src/constaint/timeZone";
interface SelectTimeZoneProps
  extends Omit<InputProps, "value" | "onChange" | "disabled"> {
  value?: string;
  onChange?: (value: any) => void;
}

const SelectTimeZone = ({ value, onChange, ...props }: SelectTimeZoneProps) => {
  // init data

  const optionSelectTimeZone = timeZoneList.timeZone.map(
    (item: { olsonName: string; description: string }) => {
      return item;
    }
  );

  const deselectedOptions = useMemo(() => {
    return optionSelectTimeZone.map((item) => ({
      label: item.description,
      value: item.olsonName,
    }));
  }, []);

  //
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
      if (selected !== value) {
        onChange && onChange(selected);
      }
    },
    [options, value]
  );
  // handle Effect

  useEffect(() => {
    updateSelection(value);
  }, [value]);

  return (
    <Select
      showSearch
      searchValue={inputValue}
      onSearch={(value) => updateText(value)}
      value={selectedOption}
      onChange={(value) => updateSelection(value)}
      style={{ maxWidth: "400px", maxHeight: "330px" }}
      className="flex ml-2"
    >
      {options.map((item) => (
        <Select.Option value={item.value} label={item.label} key={item.value}>
          <div>{item.label}</div>
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectTimeZone;
