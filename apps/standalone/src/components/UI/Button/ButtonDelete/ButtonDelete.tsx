import { DeleteOutlined } from "@ant-design/icons";
import { Button, ButtonProps, Popconfirm } from "antd";
import classNames from "classnames";
import Icon from "src/components/UI/Icon";
import "./ButtonDelete.scss";
interface ButtonDeleteProps extends Omit<ButtonProps, "icon"> {
  onlyIcon?: boolean;
  className?: string;
  confirmTitle?: string;
  children?: any;
  onClick?: () => void;
}

export const ButtonDelete = ({
  onlyIcon = false,
  confirmTitle = "Are you sure to delete",
  children,
  onClick,
  className = "",
  ...props
}: ButtonDeleteProps) => {
  return (
    <>
      {onlyIcon ? (
        <Popconfirm
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{
            danger: true,
          }}
          title={confirmTitle}
          onConfirm={onClick}
        >
          <Button
            // className={classNames([className, "btn-delete"])}
            // danger
            type="text"
            icon={<Icon name="delete" />}
            {...props}
          ></Button>
        </Popconfirm>
      ) : (
        <Button
          className={classNames([className, "btn-delete"])}
          danger
          type="primary"
          onClick={onClick}
          icon={<DeleteOutlined />}
          {...props}
        >
          {children ?? "Delete"}
        </Button>
      )}
    </>
  );
};

export default ButtonDelete;
