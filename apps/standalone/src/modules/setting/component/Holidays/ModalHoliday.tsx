import { useToggle } from "@moose-desk/core";
import { AutoReply, Holidays } from "@moose-desk/repo";
import { Input, Modal, ModalProps } from "antd";
import dayjs from "dayjs";
import { FormikValues } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Form } from "src/components/UI/Form";
import BoxSelectAutoReply from "src/modules/setting/component/BoxSelectAutoReply/BoxSelectAutoReply";
import SelectDateHolidays from "src/modules/setting/component/Holidays/SelectDateHolidays";

interface ModalHolidayProps extends ModalProps {
  dataForm?: {
    value: Holidays;
    index: number;
  };
  open: boolean;
  onChange?: (value?: Holidays) => void;
  dataAutoReply: AutoReply[];
  onClose?: () => void;
}

const ModalHoliday = ({
  dataForm,
  onChange,
  open,
  dataAutoReply,
  onClose,
  ...props
}: ModalHolidayProps) => {
  const [form] = Form.useForm();
  const dateNow = new Date();
  const { toggle: update } = useToggle();
  const [valueDate, setValueDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>();
  const handleSubmitValue = useCallback(
    (values: FormikValues) => {
      console.log(1);
      onChange &&
        onChange({
          startDate: dayjs(valueDate ? valueDate.startDate : Date.now()).format(
            "DD-MM"
          ),
          endDate: dayjs(valueDate ? valueDate.endDate : Date.now()).format(
            "DD-MM"
          ),
          name: values.name,
          autoReplyCode: values.autoReplyCode,
        });
      onClose && onClose();
      setValueDate(undefined);
    },
    [valueDate]
  );
  // handleChangeValue

  const handleChangeValue = useCallback((value) => {
    console.log("value form change");
    console.log("value, ", form.getFieldsValue());
  }, []);
  // handle Effect
  useEffect(() => {
    if (dataForm) {
      setValueDate({
        startDate: dayjs(
          `${dataForm.value.startDate}-${dateNow.getFullYear()}`,
          "DD-MM-YYYY"
        ).toDate(),
        endDate: dayjs(
          `${dataForm.value.endDate}-${dateNow.getFullYear()}`,
          "DD-MM-YYYY"
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
      onCancel={() => {
        setValueDate(undefined);
        onClose && onClose();
      }}
      onOk={() => form.submit()}
      cancelText="Cancel"
      okText="Save"
    >
      <div className="mt-4">
        <Form
          layout="vertical"
          initialValues={
            dataForm?.value || {
              name: "",
              date: "",
              autoReplyCode: "",
            }
          }
          form={form}
          onValuesChange={handleChangeValue}
          enableLoadForm
          onFinish={handleSubmitValue}
          enableReinitialize
        >
          <Form.Item
            name="name"
            label="Name:"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input placeholder="Enter name holiday" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date:"
            rules={[{ required: true, message: "Required!" }]}
          >
            <SelectDateHolidays
              valueDate={valueDate}
              onChangeValueDate={(value) => setValueDate(value)}
            />
          </Form.Item>

          <Form.Item
            name="autoReplyCode"
            label="Auto-Reply:"
            rules={[{ required: true, message: "Required!" }]}
          >
            <BoxSelectAutoReply dataAutoReply={dataAutoReply} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalHoliday;
