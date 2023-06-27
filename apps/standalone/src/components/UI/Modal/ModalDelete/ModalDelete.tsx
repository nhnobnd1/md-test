import { Modal, ModalProps } from "antd";
import Icon from "src/components/UI/Icon";
import "./ModalDelete.scss";
interface ModalDeleteProps extends Omit<ModalProps, "title"> {
  title: string;
  description: string;
  loading?: boolean;
}

export const ModalDelete = ({
  title,
  description,
  loading,
  ...props
}: ModalDeleteProps) => {
  return (
    <Modal
      {...props}
      title={title}
      okText={props.okText ?? "Delete"}
      okButtonProps={{
        type: "primary",
        danger: true,
        loading: loading,
        size: "large",
      }}
      cancelButtonProps={{
        size: "large",
      }}
      closeIcon={<Icon name="close" />}
      width={props.width ?? "700px"}
      cancelText={props.cancelText ?? "Cancel"}
    >
      <p>{description}</p>
    </Modal>
  );
};

export default ModalDelete;
