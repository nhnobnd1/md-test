import { ButtonProps } from "antd";
import { FC, ReactNode, useState } from "react";
import { MDModalUI } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";

interface ButtonTicketProps extends Omit<ButtonProps, "icon"> {
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
  ...props
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
      <MDButton type="default" onClick={showModal} className="p-0" {...props}>
        <div className="flex items-center justify-center px-2">{icon}</div>
      </MDButton>
      <MDModalUI
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
          size: "large",
        }}
      >
        <p>{content}</p>
      </MDModalUI>
    </>
  );
};
