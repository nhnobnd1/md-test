import { AutoReply, Holidays } from "@moose-desk/repo";
import { FormLayout, Modal, ModalProps, TextField } from "@shopify/polaris";
import dayjs from "dayjs";
import { FormikProps, FormikValues } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxSelectAutoReply from "src/modules/setting/component/BusinessHours/BoxSelectAutoReply";
import SelectDateHolidays from "src/modules/setting/component/Holidays/SelectDateHolidays";
import { object, string } from "yup";

interface ModalHolidayProps extends ModalProps {
  dataForm?: {
    value: Holidays;
    index: number;
  };
  open: boolean;
  onChange?: (value?: Holidays) => void;
  dataAutoReply: AutoReply[];
}

const ModalHoliday = ({
  dataForm,
  onChange,
  open,
  dataAutoReply,
  ...props
}: ModalHolidayProps) => {
  const formRef = useRef<FormikProps<any>>(null);
  const dateNow = new Date();
  const [valueDate, setValueDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>();
  const handleSubmitValue = useCallback(
    (values: FormikValues) => {
      onChange &&
        onChange({
          startDate: dayjs(valueDate ? valueDate.startDate : Date.now()).format(
            "MM/DD"
          ),
          endDate: dayjs(valueDate ? valueDate.endDate : Date.now()).format(
            "MM/DD"
          ),
          name: values.name,
          autoReplyCode: values.autoReplyCode,
        });
      props.onClose && props.onClose();
      setValueDate(undefined);
    },
    [valueDate]
  );
  // handle Validate regex
  const validateObject = object().shape({
    name: string()
      .required("Name is required!")
      .matches(/[^\s]/, "Name is required!"),
    autoReplyCode: string().required("Auto-Reply is required!"),
    date: string().required("Date is required!"),
  });
  // handle Effect
  useEffect(() => {
    if (dataForm) {
      setValueDate({
        startDate: dayjs(
          `${dataForm.value.startDate}-${dateNow.getFullYear()}`,
          "MM/DD/YYYY"
        ).toDate(),
        endDate: dayjs(
          `${dataForm.value.endDate}-${dateNow.getFullYear()}`,
          "MM/DD/YYYY"
        ).toDate(),
      });
    } else {
      setValueDate(undefined);
    }
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

          onAction: () => {
            setValueDate(undefined);
            props.onClose();
          },
        },
      ]}
      onClose={() => {
        props.onClose();
        setValueDate(undefined);
      }}
    >
      <Modal.Section>
        <Form
          initialValues={
            dataForm?.value || {
              name: "",
              date: "",
              autoReplyCode: "",
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
                placeholder="Enter name holiday"
                label={
                  <div>
                    <span className="text-red">*</span> Name:
                  </div>
                }
              />
            </FormItem>
            <FormItem name="date">
              <SelectDateHolidays
                valueDate={valueDate}
                onChangeValueDate={(value) => setValueDate(value)}
              />
            </FormItem>
            <FormItem name="autoReplyCode">
              <BoxSelectAutoReply
                dataAutoReply={dataAutoReply}
                label="Auto-Reply:"
              />
            </FormItem>
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
};

export default ModalHoliday;
