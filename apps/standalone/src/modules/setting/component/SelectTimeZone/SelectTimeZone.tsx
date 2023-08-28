import { InputProps, Select } from "antd";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import timeZoneList from "src/constaint/timeZone";
import useViewport from "src/hooks/useViewport";
interface SelectTimeZoneProps
  extends Omit<InputProps, "value" | "onChange" | "disabled"> {
  value?: string;
  onChange?: (value: any) => void;
  form?: any;
}

const SelectTimeZone = ({ value, onChange }: SelectTimeZoneProps) => {
  // init data
  const optionSelectTimeZone = timeZoneList.timeZone;
  const { isMobile } = useViewport();

  const deselectedOptions = useMemo(() => {
    return optionSelectTimeZone.map((item) => ({
      label: item.description,
      value: item.description,
    }));
  }, []);
  //
  const [selectedOption, setSelectedOption] = useState();
  const [options] = useState(deselectedOptions);

  const updateSelection = useCallback(
    (selected) => {
      const findSelectedName = optionSelectTimeZone.find(
        (item) => item.olsonName === selected
      );

      findSelectedName
        ? setSelectedOption(findSelectedName?.description as any)
        : setSelectedOption(selected);
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
      size={isMobile ? "middle" : "large"}
      showSearch
      value={selectedOption}
      onChange={onChange}
      style={{ maxWidth: "400px", maxHeight: "330px" }}
      className="flex ml-2"
      options={options}
    />
  );
};

export default memo(SelectTimeZone);
