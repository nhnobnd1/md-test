import { DeleteOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Popconfirm } from "antd";
import classNames from "classnames";
import "./ButtonDelete.scss";
interface ButtonDeleteProps extends Omit<ButtonProps, "icon"> {
  onlyIcon?: boolean;
  className?: string;
  confirmTitle?: string;
  onClick?: () => void;
}

export const ButtonDelete = ({
  onlyIcon = false,
  confirmTitle = "Are you sure to delete",
  onClick,
  className,
  ...props
}: ButtonDeleteProps) => {
  return (
    <>
      {onlyIcon ? (
        <Popconfirm title={confirmTitle} onConfirm={onClick}>
          <Button
            className={classNames([className, "btn-delete"])}
            danger
            type="primary"
            {...props}
            icon={<DeleteOutlined />}
          ></Button>
        </Popconfirm>
      ) : (
        <Button
          className={classNames([className, "btn-delete"])}
          danger
          type="primary"
          onClick={onClick}
          {...props}
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      )}
    </>
  );
};

export default ButtonDelete;
