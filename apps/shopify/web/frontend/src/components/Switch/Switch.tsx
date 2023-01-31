import { memo, useCallback } from "react";
import "./Switch.scss";
export interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  onClick?: () => void;
}

const Switch = ({ value, onChange, onClick }: SwitchProps) => {
  const handleChange = useCallback((e: any) => {
    onChange && onChange(e.target.checked);
  }, []);
  return (
    <>
      <label className="switch small purple">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={value}
          onChange={handleChange}
          onClick={onClick}
        />
        <span className="slider round"></span>
      </label>
    </>
  );
};

export default memo(Switch);
