import { Modal, ModalProps, TextContainer } from "@shopify/polaris";

export interface ModalDelete extends ModalProps {
  title: string;
  content?: string;
  dataDelete: string[];
  deleteAction: (dataDelete: string[]) => void;
}
const ModalDelete = ({
  open,
  onClose,
  title,
  content,
  deleteAction,
  dataDelete,
}: ModalDelete) => {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      primaryAction={{
        content: "Delete",
        onAction: () => {
          deleteAction(dataDelete);
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
