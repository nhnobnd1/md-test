import { Modal, ModalProps, TextContainer } from "@shopify/polaris";

export interface ModalDelete extends ModalProps {
  content?: string;
  textConfirm?: string;
  deleteAction: () => void;
  closePopupAction?: boolean;
  loadingConfirm?: boolean;
}
export const ModalDelete = ({
  textConfirm = "Delete",
  content,
  deleteAction,
  closePopupAction = true,
  loadingConfirm = false,
  ...props
}: ModalDelete) => {
  return (
    <Modal
      {...props}
      primaryAction={{
        content: textConfirm,
        onAction: () => {
          deleteAction();
          closePopupAction && props.onClose();
        },
        loading: loadingConfirm,
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
