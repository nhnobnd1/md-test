import { memo } from "react";
import "./Switch.scss";
export interface SwitchProps {
  value?: any;
  onChange?: () => void;
  onBlur?: () => void;
}

const Switch = ({ value, onChange, onBlur }: SwitchProps) => {
  return (
    <>
      <label className="switch small purple">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={value}
          onChange={onChange}
        />
        <span className="slider round"></span>
      </label>
    </>
  );
};

export default memo(Switch);
