import {
  Button,
  OptionList,
  Popover,
  Scrollable,
  TextField,
} from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";
import constaint from "src/constaint";
import { Country } from "src/constaint/country";

interface InputPhoneProps {
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  onChange?: (value: any) => void;
}

const InputPhone = (props: InputPhoneProps) => {
  const [labelHidden, setLabelHidden] = useState(false);
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
  const choices = optionSelectPhone.map((item) => ({
    label: `${item.countryName} (+${item.phonePrefix})`,
    value: item.code,
  }));
  const [flagValue, setFlagValue] = useState<string>("84");
  const [valueInput, setValueInput] = useState<{
    countryName: string;
    code: string;
    phonePrefix: string;
    flagImage: string;
  }>();
  const [valueSelect, setValueSelect] = useState(["VN"]);
  const [valueField, setValueField] = useState(props.value);
  const handleChangeValueInput = useCallback(
    (value: string) => {
      setValueField(value);
      props.onChange && props.onChange(`${flagValue}-${value}`);
    },
    [valueField, flagValue]
  );

  const handleChangeValueSelect = useCallback(
    (value: string[]) => {
      setValueSelect([...value]);
      togglePopoverSelect();
    },
    [valueSelect]
  );

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
  useEffect(() => {
    setValueInput(
      optionSelectPhone.find((option) => option.code === valueSelect[0])
    );
    setFlagValue(
      optionSelectPhone.find((option) => option.code === valueSelect[0])
        ?.phonePrefix || "84"
    );
  }, [valueSelect]);
  useEffect(() => {
    console.log("flagValue", flagValue);
    setValueSelect([
      optionSelectPhone.find((option) => option.phonePrefix === flagValue)
        ?.code || "VN",
    ]);
  }, [flagValue]);
  useEffect(() => {
    if (props.value) {
      setFlagValue(props.value?.slice(0, props.value?.indexOf("-")) || "84");
      console.log("props value", props.value);

      setValueField(props.value?.slice(props.value?.indexOf("-") + 1) || "");
    }
    if (props.label) {
      setLabelHidden(false);
    } else {
      setLabelHidden(true);
    }
  }, [props]);
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
          preferredAlignment={"right"}
        >
          <Scrollable shadow style={{ height: "380px", width: "300px" }}>
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
    />
  );
};

export default memo(InputPhone);
