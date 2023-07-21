import { InputProps } from "antd";
import classNames from "classnames";
import { memo, useEffect, useState } from "react";
import { InputTextNumber } from "src/components/UI/InputTextNumber";
import Select from "src/components/UI/Select/Select";
import constaint from "src/constaint";
import { Country } from "src/constaint/country";
import styles from "./style.module.scss";
interface InputPhoneProps
  extends Omit<InputProps, "value" | "onChange" | "disabled"> {
  value?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
}
// const DUPLICATE_PHONE_PREFIX = [1, 7, 39, 47, 61, 64, 212, 358, 500, 599];
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
  const [flagValue, setFlagValue] = useState<string>("1");
  const [valueSelect, setValueSelect] = useState("CA");
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
    const getDataByFlag = optionSelectPhone.find((country) => {
      return valueSelect
        ? country.phonePrefix === flag && country.code === valueSelect
        : country.phonePrefix === flag;
    });
    setValueSelect(getDataByFlag?.code || "");
    setFlagValue(flag);
    setValueField(phoneValue);
  }, [value]);

  return (
    <div className={classNames(styles.MDPhone, "flex")}>
      <Select
        showSearch
        value={valueSelect}
        onChange={handleChangeValueSelect}
        disabled={disabled}
        className={styles.phoneSelect}
        optionFilterProp="children"
      >
        {optionSelectPhone.map((item) => (
          <Select.Option
            value={item.code}
            label={`+${item.phonePrefix}${item.countryName}`}
            key={item.code}
          >
            <div className={classNames(styles.wrapPhoneFlag, "flex-center")}>
              <img
                className={styles.flagImg}
                width={40}
                height={30}
                src={item?.flagImage}
              />
              <span>
                {item.countryName.length < 30
                  ? item.countryName
                  : item.countryName.slice(0, 24) + " ..."}{" "}
                +{item.phonePrefix}
              </span>
            </div>
          </Select.Option>
        ))}
      </Select>
      <InputTextNumber
        className={styles.phoneInput}
        type="tel"
        {...props}
        autoComplete="tel"
        value={valueField}
        disabled={disabled}
        size="large"
        onChange={handleChangeValueInput}
      />
    </div>
  );
};

export default memo(InputPhone);
