import { DeleteOutlined } from "@ant-design/icons";
import { Button, ButtonProps, ModalProps } from "antd";
import { useState } from "react";
import { ModalDelete } from "src/components/UI/Modal/ModalDelete";
import "./ButtonModalDelete.scss";
interface ButtonModalDeleteProps {
  onlyIcon?: boolean;
  title: string;
  description: string;
  onClick?: () => void;
  onConfirm?: () => void;
  onClosePopup?: () => void;
  loading?: boolean;
  children?: any;
  buttonProps?: Omit<ButtonProps, "onClick">;
  modalProps?: Omit<ModalProps, "title" | "description" | "onCancel" | "onOk">;
  textDelete?: string;
  okeText?: string;
}

export const ButtonModalDelete = ({
  onlyIcon = false,
  title,
  description,
  loading = false,
  buttonProps = {},
  modalProps = {},
  onClick,
  onConfirm,
  onClosePopup,
  textDelete,
  okeText,
}: ButtonModalDeleteProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        danger
        type="primary"
        onClick={() => {
          onClick && onClick();
          setOpenModal(true);
        }}
        icon={<DeleteOutlined />}
        {...buttonProps}
      >
        {textDelete && !onlyIcon ? textDelete : undefined}
      </Button>
      <ModalDelete
        open={openModal}
        onCancel={() => {
          onClosePopup && onClosePopup();
          setOpenModal(false);
        }}
        loading={loading}
        centered
        title={title}
        description={description}
        destroyOnClose
        onOk={() => {
          setOpenModal(false);
          onConfirm && onConfirm();
        }}
        okText={okeText ?? textDelete}
        {...modalProps}
      />
    </>
  );
};
