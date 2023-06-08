import { Button, Icon, Modal, TextContainer } from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

export interface ModalDelete {
  handleDeleteSelected: () => void;
}
export const ModalDeleteTicket = ({ handleDeleteSelected }: ModalDelete) => {
  const [active, setActive] = useState(false);
  const activator = (
    <Button
      size="medium"
      destructive
      onClick={() => {
        setActive(true);
      }}
      fullWidth
      icon={<Icon source={DeleteMinor} color="base" />}
    ></Button>
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
        onAction: () => {
          handleChange();
          handleDeleteSelected();
        },
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
