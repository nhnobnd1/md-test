import { Button, Modal, TextContainer } from "@shopify/polaris";
import { useCallback, useState } from "react";
import RemoveIcon from "~icons/material-symbols/delete-outline";

export interface ModalDelete {
  handleDeleteSelected: () => void;
}
export const ModalDeleteTicket = ({ handleDeleteSelected }: ModalDelete) => {
  const [active, setActive] = useState(false);
  const activator = (
    <Button
      onClick={() => {
        setActive(true);
      }}
      icon={<RemoveIcon fontSize={20} />}
    >
      Remove Selected
    </Button>
  );
  const handleChange = useCallback(() => setActive(!active), [active]);
  return (
    <Modal
      open={active}
      activator={activator}
      onClose={handleChange}
      title="Are you sure that you want to remove these tickets ?"
      primaryAction={{
        content: "Remove",
        onAction: handleDeleteSelected,
        destructive: true,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          These tickets will be moved to Trash. You can no longer access to
          these tickets
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
};
export default ModalDeleteTicket;
