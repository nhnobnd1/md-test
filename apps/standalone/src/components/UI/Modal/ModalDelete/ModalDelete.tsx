import { Modal, ModalProps } from "antd";
import "./ModalDelete.scss";
interface ModalDeleteProps extends Omit<ModalProps, "name"> {
  name: string;
  description: string;
}

export const ModalDelete = ({
  name,
  description,
  ...props
}: ModalDeleteProps) => {
  return (
    <Modal
      {...props}
      title={`Are you sure that you want to remove ${name}`}
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
