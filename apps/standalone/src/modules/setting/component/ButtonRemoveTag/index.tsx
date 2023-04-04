import { Modal } from "antd";
import { FC, useState } from "react";

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
      <span
        onClick={showModal}
        className="underline text-blue-500 hover:cursor-pointer"
      >
        Remove Tags from all Tickets
      </span>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        cancelText="Cancel"
        okText={textAction}
        width={700}
        okButtonProps={{
          type: "primary",
          danger: textAction === "Remove",
        }}
      >
        <p>{content}</p>
      </Modal>
    </>
  );
};
