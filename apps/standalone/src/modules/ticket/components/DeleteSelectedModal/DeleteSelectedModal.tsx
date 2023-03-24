import { Button, Modal } from "antd";
import { FC, useState } from "react";
import RemoveIcon from "~icons/material-symbols/delete-outline";

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
      <Button type="text" onClick={showModal}>
        <div className="flex items-center">
          <RemoveIcon fontSize={20} />
          <span>Remove Selected</span>
        </div>
      </Button>
      <Modal
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
      </Modal>
    </>
  );
};