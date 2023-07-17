import { Button, ButtonProps, Modal, TextContainer } from "@shopify/polaris";
import { ReactElement, useCallback, useState } from "react";

export interface ModalDelete extends ButtonProps {
  action: () => void;
  text?: string;
  icon?: ReactElement;
  title: string;
  content: string;
  primaryContent: string;
  destructive?: boolean;
}
export const ButtonTrashTicket = ({
  action,
  text,
  icon,
  title,
  content,
  primaryContent,
  destructive,
  ...props
}: ModalDelete) => {
  const [active, setActive] = useState(false);
  const activator = (
    <Button
      // primary
      destructive={destructive}
      onClick={() => {
        setActive(true);
      }}
      icon={icon}
      {...props}
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
