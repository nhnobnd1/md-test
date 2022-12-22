import { Modal, ModalProps, TextContainer } from "@shopify/polaris";

export interface ModalDelete extends ModalProps {
  title: string;
  content?: string;
  deleteAction: () => void;
}
const ModalDelete = ({
  open,
  onClose,
  title,
  content,
  deleteAction,
}: ModalDelete) => {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      primaryAction={{
        content: "Delete",
        onAction: () => {
          deleteAction();
          onClose();
        },
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>{content}</p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};
export default ModalDelete;
