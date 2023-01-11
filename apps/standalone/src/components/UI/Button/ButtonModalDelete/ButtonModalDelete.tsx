import { useState } from "react";
import { ButtonDelete } from "src/components/UI/Button/ButtonDelete";
import { ModalDelete } from "src/components/UI/Modal/ModalDelete";
import "./ButtonModalDelete.scss";
interface ButtonModalDeleteProps {
  onlyIcon?: boolean;
  name: string;
  description: string;
  onConfirm?: () => void;
}

export const ButtonModalDelete = ({
  onlyIcon = false,
  name,
  description,
  onConfirm,
}: ButtonModalDeleteProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ButtonDelete onlyIcon={onlyIcon} onClick={() => setOpenModal(true)} />
      <ModalDelete
        open={openModal}
        onCancel={() => setOpenModal(false)}
        name={name}
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
