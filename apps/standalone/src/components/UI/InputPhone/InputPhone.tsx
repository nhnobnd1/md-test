import { InputProps } from "antd";
import { memo, useEffect, useState } from "react";
import { InputTextNumber } from "src/components/UI/InputTextNumber";
import Select from "src/components/UI/Select/Select";
import constaint from "src/constaint";
import { Country } from "src/constaint/country";
import "./InputPhone.scss";
interface InputPhoneProps
  extends Omit<InputProps, "value" | "onChange" | "disabled"> {
  value?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
}
const optionSelectPhone = constaint.countryList.country.map((item: Country) => {
  return {
    countryName: item.name,
    code: item.code,
    phonePrefix: item.phoneNumberPrefix.toString(),
    flagImage: `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`,
  };
});
const InputPhone = ({
  value,
  disabled,
  onChange,
  ...props
}: InputPhoneProps) => {
  // init data
  // filter
  // const [dataSelect, setDataSelect] = useState(optionSelectPhone);
  // const [filterValue, setFilterValue] = useState("");

  // const handleSearchChange = useCallback(
  //   (value: string) => {
  //     // setFilterValue(value);
  //     // const filterRegex = new RegExp(value.toLowerCase(), "g");
  //     // setDataSelect(optionFilter);
  //   },
  //   [optionSelectPhone]
  // );

  // set flag and value
  const [flagValue, setFlagValue] = useState<string>("84");
  const [valueSelect, setValueSelect] = useState("VN");
  const [valueField, setValueField] = useState("");
  const handleChangeValueInput = (value: string) => {
    setValueField(value);
    if (onChange) {
      value ? onChange(`${flagValue}-${value}`) : onChange("");
    }
  };

  const handleChangeValueSelect = (value: string) => {
    const getPhonePrefix = optionSelectPhone.find(
      (option) => option.code === value
    );
    setFlagValue(getPhonePrefix?.phonePrefix || "");
    setValueSelect(value);
    if (valueField !== "") {
      onChange && onChange(`${getPhonePrefix?.phonePrefix}-${valueField}`);
    }
  };
  // handle Effect
  useEffect(() => {
    if (!value) return;
    const flag = value?.slice(0, value?.indexOf("-"));
    const phoneValue = value?.slice(value?.indexOf("-") + 1);
    const getDataByFlag = optionSelectPhone.find(
      (country) => country.phonePrefix === flag
    );
    setValueSelect(getDataByFlag?.code || "");
    setFlagValue(flag);
    setValueField(phoneValue);
  }, [value]);

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        showSearch
        // searchValue={filterValue}
        // onSearch={handleSearchChange}
        value={valueSelect}
        onChange={handleChangeValueSelect}
        disabled={disabled}
        style={{ maxWidth: "300px", maxHeight: "330px" }}
        className="flex"
        optionFilterProp="children"
      >
        {optionSelectPhone.map((item) => (
          <Select.Option
            value={item.code}
            label={`+${item.phonePrefix}${item.countryName}`}
            key={item.code}
          >
            <div>
              <img width={40} height={30} src={item?.flagImage} />
              <span>
                {item.countryName.length < 30
                  ? item.countryName
                  : item.countryName.slice(0, 24) + " ..."}{" "}
                (+{item.phonePrefix})
              </span>
            </div>
          </Select.Option>
        ))}
      </Select>
      <InputTextNumber
        style={{ flex: 1, flexBasis: 300 }}
        type="tel"
        {...props}
        autoComplete="tel"
        value={valueField}
        disabled={disabled}
        onChange={(value) => handleChangeValueInput(value)}
      />
    </div>
  );
};

export default memo(InputPhone);
