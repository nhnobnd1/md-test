import { Modal, ModalProps } from "antd";
import "./ModalDelete.scss";
interface ModalDeleteProps extends Omit<ModalProps, "name"> {
  title: string;
  description: string;
}

export const ModalDelete = ({
  title,
  description,
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
      }}
      width={props.width ?? "700px"}
      cancelText={props.cancelText ?? "Cancel"}
    >
      <p>{description}</p>
    </Modal>
  );
};

export default ModalDelete;
