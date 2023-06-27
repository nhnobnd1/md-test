import { Input, InputProps } from "antd";
import useViewport from "src/hooks/useViewport";

interface IMDInput extends InputProps {}
export const MDInput = ({ ...props }: IMDInput) => {
  const { isMobile } = useViewport();
  return <Input size={isMobile ? "middle" : "large"} {...props} />;
};
