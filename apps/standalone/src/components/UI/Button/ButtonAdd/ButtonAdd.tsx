import { PlusOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import classNames from "classnames";
import "./ButtonAdd.scss";
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
      className={classNames([className, "btn-add"])}
      type="primary"
      {...props}
      icon={<PlusOutlined style={{ color: "#fff" }} />}
    >
      {!onlyIcon && <>{children && children}</>}
    </Button>
  );
};

export default ButtonAdd;
