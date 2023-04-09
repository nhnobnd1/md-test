import { Button, Modal, TextContainer } from "@shopify/polaris";
import { ReactElement, useCallback, useState } from "react";

export interface ModalDelete {
  action: () => void;
  text?: string;
  icon: ReactElement;
  title: string;
  content: string;
  primaryContent: string;
}
export const ButtonTrashTicket = ({
  action,
  text,
  icon,
  title,
  content,
  primaryContent,
}: ModalDelete) => {
  const [active, setActive] = useState(false);
  const activator = (
    <Button
      onClick={() => {
        setActive(true);
      }}
      icon={icon}
    >
      {text}
    </Button>
  );
  const handleChange = useCallback(() => setActive(!active), [active]);
  return (
    <Modal
      open={active}
      activator={activator}
      onClose={handleChange}
      title={title}
      primaryAction={{
        content: primaryContent,
        onAction: () => {
          handleChange();
          action();
        },
        destructive: primaryContent === "Remove",
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>{content}</TextContainer>
      </Modal.Section>
    </Modal>
  );
};
export default ButtonTrashTicket;
