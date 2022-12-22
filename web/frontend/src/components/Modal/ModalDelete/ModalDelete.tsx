import { Modal, ModalProps, TextContainer } from "@shopify/polaris";

export interface ModalDelete extends ModalProps {
  content?: string;
  textConfirm?: string;
  deleteAction: () => void;
}
export const ModalDelete = ({
  textConfirm = "Delete",
  content,
  deleteAction,
  ...props
}: ModalDelete) => {
  return (
    <Modal
      {...props}
      fullScreen={true}
      primaryAction={{
        content: textConfirm,
        onAction: () => {
          deleteAction();
          props.onClose();
        },
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: props.onClose,
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
