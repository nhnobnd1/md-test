import { ButtonProps, ModalProps } from "antd";
import { useState } from "react";
import { ButtonDelete } from "src/components/UI/Button/ButtonDelete";
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
}

export const ButtonModalDelete = ({
  onlyIcon = false,
  title,
  description,
  children,
  loading = false,
  buttonProps = {},
  modalProps = {},
  onClick,
  onConfirm,
  onClosePopup,
}: ButtonModalDeleteProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ButtonDelete
        onlyIcon={onlyIcon}
        onClick={() => {
          onClick && onClick();
          setOpenModal(true);
        }}
        {...buttonProps}
      >
        {children}
      </ButtonDelete>
      <ModalDelete
        open={openModal}
        onCancel={() => {
          onClosePopup && onClosePopup();
          setOpenModal(false);
        }}
        loading={loading}
        title={title}
        description={description}
        destroyOnClose
        onOk={() => {
          setOpenModal(false);
          onConfirm && onConfirm();
        }}
        {...modalProps}
      />
    </>
  );
};
