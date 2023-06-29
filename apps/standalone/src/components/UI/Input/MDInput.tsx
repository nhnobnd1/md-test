import { Input, InputProps } from "antd";
import useViewport from "src/hooks/useViewport";
import styles from "./style.module.scss";
import classNames from "classnames";
interface IMDInput extends InputProps {}
export const MDInput = ({ ...props }: IMDInput) => {
  const { isMobile } = useViewport();
  return (
    <Input
      className={classNames(styles.MDInput, `${!isMobile && "h-[40px]"}`)}
      size={isMobile ? "middle" : "large"}
      {...props}
    />
  );
};
