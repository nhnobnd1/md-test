import { Modal, ModalProps } from "antd";
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
      }}
      width={props.width ?? "700px"}
      cancelText={props.cancelText ?? "Cancel"}
    >
      <p>{description}</p>
    </Modal>
  );
};

export default ModalDelete;
