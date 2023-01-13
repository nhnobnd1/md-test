import { Input, Select } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import constaint from "src/constaint";
import { Country } from "src/constaint/country";
import "./InputPhone.scss";
interface InputPhoneProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: any) => void;
}

const InputPhone = (props: InputPhoneProps) => {
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
  const handleSearchChange = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  const choices = dataSelect.map((item) => ({
    label: (
      <div>
        <img width={40} height={30} src={item?.flagImage} />
        <span>
          {item.countryName} (+{item.phonePrefix})
        </span>
      </div>
    ),
    // `${item.countryName} (+${item.phonePrefix})`,
    value: item.code,
  }));

  // set flag and value

  const [flagValue, setFlagValue] = useState<string>("84");
  const [valueSelect, setValueSelect] = useState("VN");
  const [valueField, setValueField] = useState("");
  const handleChangeValueInput = useCallback(
    (value: string) => {
      setValueField(value);
      props.onChange && props.onChange(`${flagValue}-${value}`);
    },
    [flagValue]
  );
  const handleChangeValueSelect = useCallback(
    (value: string) => {
      setValueSelect(value);
      props.onChange &&
        props.onChange(
          `${
            dataSelect.find((option) => option.code === value)?.phonePrefix
          }-${valueField}`
        );
    },
    [valueField]
  );
  // handle Effect

  useEffect(() => {
    setDataSelect(
      optionSelectPhone.filter((option) =>
        option.countryName
          .toLocaleLowerCase()
          .match(filterValue.toLocaleLowerCase())
      )
    );
  }, [filterValue]);
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
    if (props.value) {
      setFlagValue(props.value?.slice(0, props.value?.indexOf("-")));
      setValueField(props.value?.slice(props.value?.indexOf("-") + 1));
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
        options={choices}
        style={{ maxWidth: "230px", maxHeight: "330px" }}
        className="flex mr-2"
      />
      <Input
        type="tel"
        placeholder={props.placeholder}
        autoComplete="tel"
        value={valueField}
        onChange={(e) => handleChangeValueInput(e.target.value)}
      />
    </div>
  );
};

export default memo(InputPhone);
