import { ButtonProps } from "antd";
import classNames from "classnames";
import { MDButton } from "src/components/UI/Button/MDButton";
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
    <MDButton
      className={classNames(styles.buttonAdd, className)}
      type="primary"
      icon={<Icon name="add" />}
      {...props}
    >
      {!onlyIcon && <>{children && children}</>}
    </MDButton>
  );
};

export default ButtonAdd;
