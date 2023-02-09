import { useDidUpdate } from "@moose-desk/core";
import { Input, InputProps } from "antd";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface InputTextNumberProps extends Omit<InputProps, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string) => void;
}

export const InputTextNumber = ({
  value,
  onChange,
  ...props
}: InputTextNumberProps) => {
  const [inputValue, setInputValue] = useState(value ?? "");

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const transformValue = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setInputValue(transformValue);
  }, []);

  useEffect(() => {
    onChange && onChange(inputValue);
  }, [inputValue]);

  useDidUpdate(() => {
    value && setInputValue(value);
  }, [value]);

  return <Input {...props} value={inputValue} onChange={handleChange} />;
};

export default InputTextNumber;
