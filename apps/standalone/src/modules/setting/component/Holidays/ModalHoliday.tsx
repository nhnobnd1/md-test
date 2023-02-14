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
  const [valueDate, setValueDate] = useState<{
    startDate: Date;
    endDate: Date;
  }>();
  const handleSubmitValue = useCallback(
    (values: FormikValues) => {
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
  // handle Validate regex
  // const validateObject = object().shape({
  //   name: string().required("Required!"),
  //   autoReplyCode: string().required("Required!"),
  //   date: string().required("Required!"),
  // });
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
          initialValues={
            dataForm?.value || {
              name: "",
              date: "",
              autoReplyCode: "",
            }
          }
          form={form}
          enableReinitialize
          onFinish={handleSubmitValue}
          layout="vertical"
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
