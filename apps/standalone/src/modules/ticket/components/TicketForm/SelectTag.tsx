import { Select, SelectProps } from "antd";
import { FC } from "react";
import useViewport from "src/hooks/useViewport";

interface SelectTagProps extends SelectProps {}

export const SelectTag: FC<SelectTagProps> = ({ ...props }) => {
  const { isMobile } = useViewport();

  return <Select mode="tags" size={isMobile ? "middle" : "large"} {...props} />;
};
