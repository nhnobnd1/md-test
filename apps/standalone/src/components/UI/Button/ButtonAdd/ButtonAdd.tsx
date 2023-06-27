import { Button, ButtonProps } from "antd";
import classNames from "classnames";
import Icon from "src/components/UI/Icon";
import styles from "./style.module.scss";
interface ButtonAddProps extends Omit<ButtonProps, "icon"> {
  onlyIcon?: boolean;
  className?: string;
  children?: any;
}

export const ButtonAdd = ({
  onlyIcon = false,
  className = "",
  children,
  ...props
}: ButtonAddProps) => {
  return (
    <Button
      className={classNames(styles.buttonAdd, className)}
      type="primary"
      icon={<Icon name="add" />}
      size="large"
      {...props}
    >
      {!onlyIcon && <>{children && children}</>}
    </Button>
  );
};

export default ButtonAdd;
