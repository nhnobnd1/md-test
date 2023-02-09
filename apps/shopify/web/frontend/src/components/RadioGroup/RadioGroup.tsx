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

const RadioGroup = ({
  title,
  value,
  error,
  onChange,
  options,
  vertical,
  ...props
}: RadioGroupProps) => {
  const [titleHidden, setTitleHidden] = useState(false);
  const [valueRadio, setValueRadio] = useState("");
  const optionRadioGroup = useCallback(() => {
    return options.map((option) => (
      <RadioButton
        key={option.id}
        label={option.label}
        labelHidden={option.labelHidden}
        helpText={option.helpText}
        name="radioGroup"
        id={option.id}
        checked={valueRadio === option.id}
        onChange={handleChangeValue}
        {...options}
      />
    ));
  }, [options, valueRadio]);
  const handleChangeValue = useCallback(
    (checked: boolean, newValue: string) => {
      setValueRadio(newValue);
      onChange && onChange(newValue);
    },
    []
  );
  // handle Effect

  useEffect(() => {
    if (value) {
      setValueRadio(value);
    }
    if (title) {
      setTitleHidden(false);
    } else {
      setTitleHidden(true);
    }
  }, [title, value]);
  return (
    <Layout>
      {titleHidden ? null : (
        <Text variant="headingMd" as="h6">
          {title}
        </Text>
      )}
      <Layout.Section>
        <Stack
          vertical={vertical !== undefined ? vertical : true}
          distribution={vertical === false ? "fill" : undefined}
        >
          {optionRadioGroup()}
        </Stack>
      </Layout.Section>
    </Layout>
  );
};

export default memo(RadioGroup);
