import {
  RadioButton,
  RadioButtonProps,
  Stack,
  StackProps,
} from "@shopify/polaris";
import { useCallback } from "react";

interface RadioGroupProps {
  layout: "vertical" | "inline";
  gap?: StackProps["spacing"];
  options: Omit<RadioButtonProps, "onChange">[];
  value?: string;
  onChange?: (value: string) => void;
}

const RadioGroup = ({
  layout,
  gap,
  options,
  value,
  onChange,
}: RadioGroupProps) => {
  const handleChange = useCallback((value: boolean, id: string) => {
    onChange && onChange(id);
  }, []);

  return (
    <Stack spacing={gap} vertical={layout === "vertical"}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          {...option}
          id={option.value}
          checked={value === option.value}
          onChange={handleChange}
        />
      ))}
    </Stack>
  );
};

export default RadioGroup;
