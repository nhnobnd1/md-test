import { Switch, SwitchProps } from "antd";
import { useCallback, useEffect } from "react";

interface SwitchFormProps {
  value?: boolean;
  onChange?: (value: any) => void;
  setDisabledInput?: (value: any) => void;
  props?: SwitchProps;
}

const SwitchForm = (props: SwitchFormProps) => {
  const handleChange = useCallback(() => {
    props.onChange && props.onChange(!props.value);
  }, [props.value]);
  useEffect(() => {
    props.setDisabledInput && props.setDisabledInput(!props.value);
  }, [props.value]);
  return (
    <>
      <Switch {...props.props} checked={props.value} onChange={handleChange} />
    </>
  );
};

export default SwitchForm;
