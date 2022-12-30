import { memo } from "react";
import "./Switch.scss";
export interface SwitchProps {
  value?: boolean;
  onChange?: () => void;
  onClick?: () => void;
}

const Switch = ({ value, onChange, onClick }: SwitchProps) => {
  return (
    <>
      <label className="switch small purple">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={value}
          onChange={onChange}
          onClick={onClick}
        />
        <span className="slider round"></span>
      </label>
    </>
  );
};

export default memo(Switch);
