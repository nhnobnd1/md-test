import { Input, InputProps } from "antd";
import useViewport from "src/hooks/useViewport";
import styles from "./style.module.scss";
interface IMDInput extends InputProps {}
export const MDInput = ({ ...props }: IMDInput) => {
  const { isMobile } = useViewport();
  return (
    <Input
      className={styles.MDInput}
      size={isMobile ? "middle" : "large"}
      {...props}
    />
  );
};
