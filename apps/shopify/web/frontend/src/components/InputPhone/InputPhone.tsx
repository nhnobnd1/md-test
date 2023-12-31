import {
  Button,
  Filters,
  OptionList,
  Popover,
  Scrollable,
  TextField,
} from "@shopify/polaris";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import constaint from "src/constaint";
import { Country } from "src/constaint/country";

interface InputPhoneProps {
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

const InputPhone = (props: InputPhoneProps) => {
  // config UI

  const [labelHidden, setLabelHidden] = useState(false);

  // init data

  const optionSelectPhone = constaint.countryList.country.map(
    (item: Country | any) => {
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
  const handleQueryValueRemove = useCallback(() => {
    setFilterValue("");
  }, []);
  const resetFilterData = useCallback(() => {
    setFilterValue("");
  }, []);
  const choices = useMemo(() => {
    return dataSelect.map((item) => ({
      label: `${item.countryName} (+${item.phonePrefix})`,
      value: item.code,
      disabled: props.disabled,
    }));
  }, [props.disabled, dataSelect]);

  // set flag and value

  const [flagValue, setFlagValue] = useState<string>("1");
  const [valueInput, setValueInput] = useState<{
    countryName: string;
    code: string;
    phonePrefix: string;
    flagImage: string;
  }>({
    countryName: "Vietnam",
    code: "CA",
    phonePrefix: "1",
    flagImage: `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg`,
  });
  const [valueSelect, setValueSelect] = useState(["CA"]);
  const [valueField, setValueField] = useState("");
  const handleChangeValueInput = (value: string) => {
    setValueField(value);
    if (value === "") {
      props.onChange && props.onChange("");
    } else {
      props.onChange && props.onChange(`${flagValue}-${value}`);
    }
  };
  const handleChangeValueSelect = (value: string[]) => {
    setValueSelect([...value]);
    setValueInput(
      (dataSelect as any).find((option: any) => option.code === value[0])
    );
    setFlagValue(
      dataSelect.find((option) => option.code === value[0])?.phonePrefix || "1"
    );
    if (valueField !== "") {
      props.onChange &&
        props.onChange(
          `${
            dataSelect.find((option) => option.code === value[0])?.phonePrefix
          }-${valueField}`
        );
    } else {
      props.onChange && props.onChange("");
    }
    togglePopoverSelect();
  };
  // popup modal select
  const [popoverSelect, setPopoverSelect] = useState(false);
  const togglePopoverSelect = useCallback(
    () => setPopoverSelect((popoverSelect) => !popoverSelect),
    [popoverSelect]
  );
  const selectButton = (
    <Button
      onClick={togglePopoverSelect}
      icon={() => (
        <img
          alt={`${valueInput?.countryName} (+${valueInput?.phonePrefix})`}
          src={valueInput?.flagImage}
        />
      )}
    >
      {`+${valueInput?.phonePrefix}`}
    </Button>
  );

  // handle Effect

  useEffect(() => {
    const listFilter = optionSelectPhone.filter((option) => {
      const phone = "+" + option.phonePrefix;
      return (
        option.countryName.toLowerCase().includes(filterValue.toLowerCase()) ||
        phone.includes(filterValue)
      );
    });
    setDataSelect(listFilter);
  }, [filterValue]);

  // useEffect(() => {
  //   const x = dataSelect.find((option) => option.code === valueSelect[0]);
  //   console.log(x, "x");
  //   setValueInput(x);
  //   setFlagValue(
  //     dataSelect.find((option) => option.code === valueSelect[0])
  //       ?.phonePrefix || "84"
  //   );
  // }, [valueSelect]);

  useEffect(() => {
    if (!props.value) return;
    const flag = props.value?.slice(0, props.value?.indexOf("-"));
    const getDataByFlag: any = optionSelectPhone.find((country) => {
      return valueSelect[0]
        ? country.phonePrefix === flag && country.code === valueSelect[0]
        : country.phonePrefix === flag;
    });
    setValueInput(getDataByFlag);
    setValueSelect([getDataByFlag?.code]);
    setFlagValue(flag);
    setValueField(props.value?.slice(props.value?.indexOf("-") + 1) || "");
  }, [props.value, valueField]);
  // dep valueField for re render one more time
  useEffect(() => {
    if (props.label) {
      setLabelHidden(false);
    } else {
      setLabelHidden(true);
    }
  }, [props.label]);

  return (
    <TextField
      type="tel"
      placeholder={props.placeholder}
      label={props.label ?? "Label"}
      autoComplete="tel"
      labelHidden={labelHidden}
      connectedLeft={
        <Popover
          active={popoverSelect}
          activator={selectButton}
          autofocusTarget="first-node"
          onClose={togglePopoverSelect}
          preferredAlignment={"left"}
        >
          <div
            className="py-2"
            style={{ width: "calc(100% - 16px)", margin: "0 auto" }}
          >
            <Filters
              queryValue={filterValue}
              onQueryChange={handleSearchChange}
              onQueryClear={handleQueryValueRemove}
              queryPlaceholder="Search"
              filters={[]}
              onClearAll={resetFilterData}
            />
          </div>
          <Scrollable shadow style={{ height: "330px", width: "330px" }}>
            <OptionList
              onChange={handleChangeValueSelect}
              options={choices}
              selected={valueSelect}
              allowMultiple={false}
            />
          </Scrollable>
        </Popover>
      }
      value={valueField}
      onChange={handleChangeValueInput}
      error={props.error ?? false}
      disabled={props.disabled ?? props.disabled}
    />
  );
};

export default memo(InputPhone);
