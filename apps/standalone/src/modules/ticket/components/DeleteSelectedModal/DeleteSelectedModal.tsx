import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { FC, useState } from "react";
import { MDModalUI } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";

interface DeleteSelectedModalProps {
  handleDeleteSelected: () => void;
}

export const DeleteSelectedModal: FC<DeleteSelectedModalProps> = ({
  handleDeleteSelected,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleDeleteSelected();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <MDButton
        type="primary"
        onClick={showModal}
        danger
        icon={<DeleteOutlined />}
      >
        <span>Remove </span>
      </MDButton>
      <MDModalUI
        title="Are you sure that you want to remove these tickets ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        cancelText="Cancel"
        okText="Remove"
        width={700}
        okButtonProps={{
          type: "primary",
          danger: true,
        }}
      >
        <p>
          These tickets will be moved to Trash. You can no longer access to
          these tickets
        </p>
      </MDModalUI>
    </>
  );
};
