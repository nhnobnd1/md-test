import { useToggle } from "@moose-desk/core";
import { Popover } from "@shopify/polaris";
import { useCallback } from "react";
import { Color, SketchPicker } from "react-color";
interface ButtonColorProps {
  value?: Color;
  onChange?: (value: string) => void;
}

export const ButtonColor = ({ value, onChange }: ButtonColorProps) => {
  const { toggle, state, off, on } = useToggle();
  const handleChange = useCallback(
    (value) => {
      onChange && onChange(value?.hex);
    },
    [onChange]
  );
  return (
    <Popover
      active={state}
      activator={
        <div
          className="w-[32px] h-[32px] rounded-md cursor-pointer border-[#d9d9d9]"
          style={{
            backgroundColor: value as any,
            border: "1px solid transparent",
            boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
          }}
          onClick={toggle}
        ></div>
      }
      onClose={toggle}
    >
      <div>
        <SketchPicker color={value} onChange={handleChange}></SketchPicker>;
      </div>
    </Popover>
  );
};

export default ButtonColor;
