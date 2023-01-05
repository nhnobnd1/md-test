import { Modal, RadioButton, Stack } from "@shopify/polaris";
import { useCallback, useState } from "react";

export default function Enable2FAModal() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(1);
  const handleChange = useCallback(
    (value: any) => {
      setValue(value);
    },
    [value]
  );
  return (
    <Modal
      large
      open={open}
      onClose={() => setOpen(false)}
      title="Enable Two-Factor Authentication"
      primaryAction={{
        content: "Save",
        onAction: () => console.log(1),
      }}
    >
      <Modal.Section>
        <Stack vertical>
          <RadioButton
            label="Off"
            checked={value === 1}
            id="2"
            name="accounts"
            onChange={handleChange}
          />
          <RadioButton
            label="Use Email Address"
            helpText="When you login from a new computer or browser, system will send an OTP code to your email to verify your identity."
            id="2"
            name="accounts"
            checked={value === 2}
            onChange={handleChange}
          />
          <RadioButton
            label="Use external authenticator application."
            id="2"
            name="accounts"
            checked={value === 3}
            onChange={handleChange}
          />
        </Stack>
      </Modal.Section>
    </Modal>
  );
}
