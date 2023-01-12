import { useState } from "react";
import { ButtonDelete } from "src/components/UI/Button/ButtonDelete";
import { ModalDelete } from "src/components/UI/Modal/ModalDelete";
import "./ButtonModalDelete.scss";
interface ButtonModalDeleteProps {
  onlyIcon?: boolean;
  title: string;
  description: string;
  onConfirm?: () => void;
  children?: any;
}

export const ButtonModalDelete = ({
  onlyIcon = false,
  title,
  description,
  children,

  onConfirm,
}: ButtonModalDeleteProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ButtonDelete onlyIcon={onlyIcon} onClick={() => setOpenModal(true)}>
        {children}
      </ButtonDelete>
      <ModalDelete
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title={title}
        description={description}
        destroyOnClose
        onOk={() => {
          setOpenModal(false);
          onConfirm && onConfirm();
        }}
      />
    </>
  );
};
