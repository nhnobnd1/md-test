import { Button, Modal } from "antd";
import { FC, ReactNode, useState } from "react";

interface ButtonTicketProps {
  action: () => void;
  icon: ReactNode;
  title: string;
  content: string;
  textAction: string;
}

export const ButtonTicket: FC<ButtonTicketProps> = ({
  action,
  icon,
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
      <Button type="text" onClick={showModal} className="p-1">
        <div className="flex items-center">{icon}</div>
      </Button>
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
