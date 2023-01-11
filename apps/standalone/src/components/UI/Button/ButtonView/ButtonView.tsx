import { EyeOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import classNames from "classnames";
import "./ButtonView.scss";

interface ButtonViewProps extends Omit<ButtonProps, "icon"> {
  onlyIcon?: boolean;
  className?: string;
  children?: any;
}

export const ButtonView = ({
  onlyIcon = false,
  className = "",
  children,
  ...props
}: ButtonViewProps) => {
  return (
    <Button
      className={classNames([className])}
      type="default"
      {...props}
      icon={<EyeOutlined />}
    >
      {!onlyIcon && <>{children ?? "Detail"}</>}
    </Button>
  );
};

export default ButtonView;
