import { useToggle } from "@moose-desk/core";
import { AutoReply } from "@moose-desk/repo";
import { FormLayout, Modal, ModalProps, TextField } from "@shopify/polaris";
import { FormikProps, FormikValues } from "formik";
import { useCallback, useRef } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { RichText } from "src/components/RichText";
import { object, string } from "yup";

interface ModalAutoReplyProps extends ModalProps {
  dataForm?: {
    value: AutoReply;
    index: number;
  };
  open: boolean;
  onChange?: (value?: AutoReply) => void;
}

const ModalAutoReply = ({
  dataForm,
  onChange,
  open,
  ...props
}: ModalAutoReplyProps) => {
  const formRef = useRef<FormikProps<any>>(null);
  const { toggle: updateForm } = useToggle();
  const handleSubmitValue = useCallback((values: FormikValues) => {
    onChange &&
      onChange({
        name: values.name,
        code: self.crypto.randomUUID(),
        content: values.content,
      });
    props.onClose && props.onClose();
  }, []);
  // handle Validate regex
  const validateObject = object().shape({
    name: string().required("Required!"),
    content: string().required("Required!"),
    // date: string().required("Required!"),
  });
  return (
    <Modal
      {...props}
      large
      open={open}
      primaryAction={{
        content: "Save",
        onAction: () => formRef.current?.submitForm(),
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => props.onClose(),
        },
      ]}
    >
      <div style={{ height: "500px" }}>
        <Modal.Section>
          <Form
            initialValues={
              dataForm?.value || {
                name: "",
                content: "",
              }
            }
            ref={formRef}
            validationSchema={validateObject}
            enableReinitialize
            onSubmit={handleSubmitValue}
          >
            <FormLayout>
              <FormItem name="name">
                <TextField
                  autoComplete="off"
                  placeholder="Enter name auto-reply"
                  label="Name"
                />
              </FormItem>
              <FormItem name="code"></FormItem>
              <FormItem name="content">
                <RichText />
              </FormItem>
            </FormLayout>
          </Form>
        </Modal.Section>
      </div>
    </Modal>
  );
};

export default ModalAutoReply;
