import {
  Layout,
  RadioButton,
  RadioButtonProps,
  Stack,
  Text,
} from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";

interface RadioGroupProps {
  title?: string;
  value?: string;
  error?: string;
  onChange?: (value: any) => void;
  options: RadioButtonProps[];
  vertical?: boolean;
}

const RadioGroup = (props: RadioGroupProps) => {
  const [titleHidden, setTitleHidden] = useState(false);
  const [value, setValue] = useState("");
  const optionRadioGroup = useCallback(() => {
    return props.options.map((option) => (
      <RadioButton
        label={option.label}
        labelHidden={option.labelHidden}
        helpText={option.helpText}
        name="radioGroup"
        checked={value === option.id}
        key={option.id}
        id={option.id}
        onChange={handleChangeValue}
      />
    ));
  }, [props.options]);
  const handleChangeValue = useCallback(
    (checked: boolean, newValue: string) => {
      props.onChange && props.onChange(newValue);
    },
    [value]
  );
  // handle Effect

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
    if (props.title) {
      setTitleHidden(false);
    } else {
      setTitleHidden(true);
    }
  }, [props]);
  return (
    <Layout>
      {titleHidden ? null : (
        <Text variant="headingMd" as="h6">
          {props.title}
        </Text>
      )}
      <Layout.Section>
        <Stack vertical={props.vertical !== undefined ? props.vertical : true}>
          {optionRadioGroup()}
        </Stack>
      </Layout.Section>
    </Layout>
  );
};

export default memo(RadioGroup);
