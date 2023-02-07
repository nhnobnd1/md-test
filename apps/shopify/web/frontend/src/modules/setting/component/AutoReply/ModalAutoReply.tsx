import { FormLayout, Modal, ModalProps, TextField } from "@shopify/polaris";
import { FormikProps, FormikValues } from "formik";
import { useCallback, useRef } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";

interface ModalAutoReplyProps extends ModalProps {
  dataForm?: {
    name: string;
    content: any;
    index: number;
  };
  open: boolean;
  onChange?: (value: any) => void;
}

const ModalAutoReply = ({
  dataForm,
  onChange,
  open,
  ...props
}: ModalAutoReplyProps) => {
  const formRef = useRef<FormikProps<any>>(null);
  const handleSubmitValue = useCallback((values: FormikValues) => {
    onChange && onChange(values);
    props.onClose && props.onClose();
  }, []);

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
            initialValues={dataForm || {}}
            innerRef={formRef}
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
              <FormItem name="date">
                <TextField
                  autoComplete="off"
                  placeholder="Enter content"
                  label="Content"
                  multiline={10}
                />
              </FormItem>
            </FormLayout>
          </Form>
        </Modal.Section>
      </div>
    </Modal>
  );
};

export default ModalAutoReply;
