import { Button, ButtonProps, Tooltip } from "antd";
import classNames from "classnames";
import Icon from "src/components/UI/Icon";
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
    <Tooltip placement="top" title={"View"}>
      <Button
        className={classNames([className])}
        type="text"
        {...props}
        icon={<Icon name="eye" />}
      >
        {!onlyIcon && <>{children ?? "Detail"}</>}
      </Button>
    </Tooltip>
  );
};

export default ButtonView;
