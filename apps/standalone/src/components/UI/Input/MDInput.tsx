import { Input, InputProps } from "antd";
import classNames from "classnames";
import useViewport from "src/hooks/useViewport";
import styles from "./style.module.scss";
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
