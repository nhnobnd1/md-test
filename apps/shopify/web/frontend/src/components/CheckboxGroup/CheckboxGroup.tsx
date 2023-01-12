import { Checkbox, CheckboxProps, Layout, Stack, Text } from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";

interface CheckboxGroupProps {
  title?: string;
  value?: string;
  error?: string;
  onChange?: (value: any) => void;
  options: CheckboxProps[];
  vertical?: boolean;
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const [titleHidden, setTitleHidden] = useState(false);
  const [value, setValue] = useState("");
  const optionCheckboxGroup = useCallback(() => {
    return props.options.map((option) => (
      <Checkbox
        label={option.label}
        labelHidden={option.labelHidden}
        helpText={option.helpText}
        checked={value === option.id}
        key={option.id}
        value={option.value}
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
          {optionCheckboxGroup()}
        </Stack>
      </Layout.Section>
    </Layout>
  );
};

export default memo(CheckboxGroup);
