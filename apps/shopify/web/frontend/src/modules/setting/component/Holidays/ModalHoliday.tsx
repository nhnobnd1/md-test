import { FormLayout, Modal, ModalProps, TextField } from "@shopify/polaris";
import { FormikProps, FormikValues } from "formik";
import { useCallback, useEffect, useRef } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectAutoReply from "src/modules/setting/component/BusinessHours/BoxSelectAutoReply";
import SelectDateHolidays from "src/modules/setting/component/Holidays/SelectDateHolidays";

interface ModalHolidayProps extends ModalProps {
  dataForm?: {
    name: string;
    date: {
      start: Date | Range | undefined;
      end: Date | Range | undefined;
    };
    autoReply: string;
    index: number;
  };
  open: boolean;
  onChange?: (value: any) => void;
}

const ModalHoliday = ({
  dataForm,
  onChange,
  open,
  ...props
}: ModalHolidayProps) => {
  const formRef = useRef<FormikProps<any>>(null);
  const handleSubmitValue = useCallback((values: FormikValues) => {
    onChange && onChange(values);
    props.onClose && props.onClose();
  }, []);

  useEffect(() => {
    console.log("dataForm", dataForm);
  }, [dataForm]);

  return (
    <Modal
      {...props}
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
      <div style={{ height: "400px" }}>
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
                  placeholder="Enter name holiday"
                  label="Name:"
                />
              </FormItem>
              <FormItem name="date">
                <SelectDateHolidays />
              </FormItem>
              <FormItem name="autoReply">
                <BoxSelectAutoReply label="Auto-Reply:" />
              </FormItem>
            </FormLayout>
          </Form>
        </Modal.Section>
      </div>
    </Modal>
  );
};

export default ModalHoliday;
