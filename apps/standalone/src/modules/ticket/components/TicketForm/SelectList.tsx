import { Select, SelectProps } from "antd";
import { FC } from "react";
import useViewport from "src/hooks/useViewport";

interface SelectListProps extends SelectProps {}

export const SelectList: FC<SelectListProps> = ({ ...props }) => {
  const { isMobile } = useViewport();

  return <Select size={isMobile ? "middle" : "large"} {...props}></Select>;
};
