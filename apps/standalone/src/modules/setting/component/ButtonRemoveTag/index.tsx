import { Button } from "antd";
import { FC, useState } from "react";
import { MDButton } from "src/components/UI/Button/MDButton";
import { ModalDelete } from "src/components/UI/Modal/ModalDelete";

interface ButtonTicketProps {
  action: () => void;
  title: string;
  content: string;
  textAction: string;
}

export const ButtonRemoveTag: FC<ButtonTicketProps> = ({
  action,
  title,
  content,
  textAction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    action();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <MDButton onClick={showModal} danger type="primary">
        Remove all
      </MDButton>
      <ModalDelete
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        cancelText="Cancel"
        okText={textAction}
        description={content}
      ></ModalDelete>
    </>
  );
};
