import { Input } from "antd";
import { useCallback, useEffect } from "react";

interface InputDisableSubmitProps {
  value?: string;
  valueInput?: string;
  onChange?: (value: any) => void;
  setValueInput?: (value: string) => void;
  handleSubmitDomain?: (value: any) => void;
  disabled?: boolean;
  setStateErrorInput?: (value: boolean) => void;
  "aria-invalid"?: boolean;
}

const InputDisableSubmit = (props: InputDisableSubmitProps) => {
  const handleChange = useCallback((value: string) => {
    props.setValueInput && props.setValueInput(value);
    props.onChange && props.onChange(value);
  }, []);
  useEffect(() => {
    if (props["aria-invalid"]) {
      props.setStateErrorInput && props.setStateErrorInput(true);
    } else {
      props.setStateErrorInput && props.setStateErrorInput(false);
    }
  }, [props]);
  return (
    <Input
      value={props.value ?? props.valueInput}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={props.handleSubmitDomain}
      disabled={props.disabled}
    />
  );
};

export default InputDisableSubmit;
