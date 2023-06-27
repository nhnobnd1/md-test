import { Button, ButtonProps } from "antd";
import classNames from "classnames";
import { ReactNode } from "react";
import useViewport from "src/hooks/useViewport";
import styles from "./style.module.scss";
interface IMDButton extends ButtonProps {
  className?: string;
  children?: ReactNode;
}
export const MDButton = ({ className, children, ...props }: IMDButton) => {
  const { isMobile } = useViewport();
  console.log(isMobile);
  return (
    <Button
      className={classNames(styles.MDButton, className)}
      size={isMobile ? "middle" : "large"}
      {...props}
    >
      {children}
    </Button>
  );
};
