import { Link, Modal, Stack, Text, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

export default function EmailOPTModal() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("");
  const handleChange = useCallback(
    (value: string) => {
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
        content: "Confirm",
        onAction: () => console.log(1),
      }}
      secondaryActions={[
        {
          content: "Cancle",
          onAction: () => console.log(3),
        },
      ]}
    >
      <Modal.Section>
        <Stack vertical>
          <Text variant="bodyMd" as="p">
            Please enter the 6 digits OTP code that we send to your email
            address in order to enable 2FA with your email.
          </Text>
          <div className="flex items-center">
            <Text variant="bodyMd" as="span">
              OTP code
            </Text>
            <div className="w-20 ml-4">
              <TextField
                type="text"
                label="OTP code"
                labelHidden
                autoComplete="off"
                maxLength={6}
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center">
            <Text variant="bodyMd" as="span">
              Did not receive the code yet?
            </Text>
            <div className="ml-2">
              <Link onClick={() => console.log(2)}>Re-send OTP Code</Link>
            </div>
          </div>
        </Stack>
      </Modal.Section>
    </Modal>
  );
}
