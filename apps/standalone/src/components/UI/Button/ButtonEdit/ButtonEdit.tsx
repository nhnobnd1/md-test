import { EditOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Tooltip } from "antd";
import classNames from "classnames";
import "./ButtonEdit.scss";
interface ButtonEditProps extends Omit<ButtonProps, "icon"> {
  onlyIcon?: boolean;
  className?: string;
  children?: any;
}

export const ButtonEdit = ({
  onlyIcon = false,
  className = "",
  children,
  ...props
}: ButtonEditProps) => {
  return (
    <>
      {onlyIcon ? (
        <Tooltip placement="top" title={"Edit"}>
          <Button
            className={classNames([className, "btn-edit"])}
            type="primary"
            {...props}
            icon={<EditOutlined />}
          ></Button>
        </Tooltip>
      ) : (
        <Button
          className={classNames([className, "btn-edit"])}
          type="primary"
          {...props}
          icon={<EditOutlined />}
        >
          {children ?? "Edit"}
        </Button>
      )}
    </>
  );
};

export default ButtonEdit;
