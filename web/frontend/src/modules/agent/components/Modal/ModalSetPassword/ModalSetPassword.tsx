import { useToast } from "@shopify/app-bridge-react";
import { FormLayout, Modal, ModalProps, Text } from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useRef } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import TextFieldPassword from "src/components/Input/TextFieldPassword/TextFieldPassword";
import "./ModalSetPassword.scss";

interface ModalSetPasswordProps extends Omit<ModalProps, "title"> {}

const ModalSetPassword = (props: ModalSetPasswordProps) => {
  const { show } = useToast();
  const formRef = useRef<FormikProps<any>>(null);
  const handleSubmit = useCallback((values: any) => {
    console.log(values);
  }, []);

  const handleSetPassword = useCallback(() => {
    formRef.current
      ?.submitForm()
      .then(() => {
        props.onClose();
      })
      .catch(() => {
        show("Set Password Failed", {
          isError: true,
        });
      });
  }, []);

  return (
    <Modal
      {...props}
      title="Set Password for this Agent"
      primaryAction={{
        content: "Set Password",
        onAction: handleSetPassword,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => props.onClose(),
        },
      ]}
    >
      <Modal.Section>
        <Form ref={formRef} initialValues={{}} onSubmit={handleSubmit}>
          <FormLayout>
            <FormItem name="password">
              <TextFieldPassword label="Password" autoComplete="off" />
            </FormItem>
            <FormItem name="confirmPassword">
              <TextFieldPassword label="ConfirmPassword" autoComplete="off" />
            </FormItem>
            <Text variant="bodyMd" as="p">
              Your password must be at least 8 characters long and includes a
              capital letter, a lowercase letter, a number, and a symbol
            </Text>
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
};

export default ModalSetPassword;
