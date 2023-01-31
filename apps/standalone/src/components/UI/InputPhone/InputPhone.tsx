import { Input, InputProps } from "antd";
import { useCallback, useEffect, useState } from "react";
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

const InputPhone = ({
  value,
  disabled,
  onChange,
  ...props
}: InputPhoneProps) => {
  // init data

  const optionSelectPhone = constaint.countryList.country.map(
    (item: Country) => {
      return {
        countryName: item.name,
        code: item.code,
        phonePrefix: item.phoneNumberPrefix.toString(),
        flagImage: `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${item.code}.svg`,
      };
    }
  );

  // filter

  const [dataSelect, setDataSelect] = useState(optionSelectPhone);
  const [filterValue, setFilterValue] = useState("");

  const handleSearchChange = useCallback(
    (value: string) => {
      setFilterValue(value);
      const filterRegex = new RegExp(value.toLowerCase(), "g");
      const optionFilter = optionSelectPhone.filter((option) =>
        option.countryName.toLowerCase().match(filterRegex)
      );
      setDataSelect(optionFilter);
    },
    [optionSelectPhone]
  );

  // set flag and value
  const [flagValue, setFlagValue] = useState<string>("84");
  const [valueSelect, setValueSelect] = useState("VN");
  const [valueField, setValueField] = useState("");
  const handleChangeValueInput = useCallback(
    (value: string) => {
      setValueField(value);
      if (onChange) {
        value ? onChange(`${flagValue}-${value}`) : onChange("");
      }
    },
    [flagValue]
  );
  const handleChangeValueSelect = useCallback(
    (value: string) => {
      setValueSelect(value);
      if (valueField !== "") {
        onChange &&
          onChange(
            `${
              dataSelect.find((option) => option.code === value)?.phonePrefix
            }-${valueField}`
          );
      }
    },
    [valueField]
  );

  // handle Effect
  useEffect(() => {
    setFlagValue(
      dataSelect.find((option) => option.code === valueSelect)?.phonePrefix ||
        "84"
    );
  }, [valueSelect]);

  useEffect(() => {
    setValueSelect(
      dataSelect.find((option) => option.phonePrefix === flagValue)?.code ||
        "VN"
    );
  }, [flagValue]);

  useEffect(() => {
    if (value) {
      setFlagValue(value?.slice(0, value?.indexOf("-")));
      setValueField(value?.slice(value?.indexOf("-") + 1));
    } else {
      setFlagValue("84");
      setValueField("");
    }
  }, [props]);

  return (
    <div className="flex">
      <Select
        showSearch
        searchValue={filterValue}
        onSearch={(value) => handleSearchChange(value)}
        value={valueSelect}
        onChange={(value) => handleChangeValueSelect(value)}
        disabled={disabled}
        style={{ maxWidth: "300px", maxHeight: "330px" }}
        className="flex mr-2"
      >
        {dataSelect.map((item) => (
          <Select.Option
            value={item.code}
            label={item.countryName}
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
      <Input
        type="tel"
        {...props}
        autoComplete="tel"
        value={valueField}
        disabled={disabled}
        onChange={(e) => handleChangeValueInput(e.target.value)}
      />
    </div>
  );
};

export default InputPhone;
