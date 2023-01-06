import { Stack } from "@shopify/polaris";
import { ReactNode, memo, useEffect, useState } from "react";
export interface RadioGroupProps {
  value?: any;
  onChange?: () => void;
  children?: ReactNode;
  name: string;
}

const RadioGroup = ({ value, onChange, children, name }: RadioGroupProps) => {
  const [radioGroupValue, setRadioGroupValue] = useState<any>(value);
  useEffect(() => {
    setRadioGroupValue(value);
  }, [value]);
  return (
    <>
      {/* <label className="switch small purple">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={value}
          onChange={onChange}
          onClick={onClick}
        />
        <span className="slider round"></span>
      </label> */}
      <Stack vertical>{children}</Stack>
    </>
  );
};

export default memo(RadioGroup);
