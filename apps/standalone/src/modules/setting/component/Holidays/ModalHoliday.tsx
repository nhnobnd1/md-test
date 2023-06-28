import { AutoReply, Holidays } from "@moose-desk/repo";
import { ModalProps } from "antd";
import dayjs from "dayjs";
import { FormikValues } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MDModalUI } from "src/components/MDModalUI";
import { Form } from "src/components/UI/Form";
import { MDInput } from "src/components/UI/Input";
import useViewport from "src/hooks/useViewport";
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
  const { isMobile } = useViewport();
  const [valueDate, setValueDate] = useState<
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined
  >();

  const initialValues = useMemo(() => {
    return (
      dataForm?.value || {
        name: "",
        date: "",
        autoReplyCode: "",
      }
    );
  }, [dataForm?.value]);

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
      onClose && onClose();
      setValueDate(undefined);
      form.resetFields();
    },
    [valueDate]
  );

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
    <MDModalUI
      {...props}
      open={open}
      onCancel={() => {
        form.resetFields();
        setValueDate(undefined);
        onClose && onClose();
      }}
      onOk={() => form.submit()}
      cancelText="Cancel"
      okText="Save"
      cancelButtonProps={{ size: isMobile ? "middle" : "large" }}
      okButtonProps={{ size: isMobile ? "middle" : "large" }}
    >
      <div className="mt-4">
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          onFinish={handleSubmitValue}
          enableLoadForm
          enableReinitialize
        >
          <Form.Item
            name="name"
            label="Name:"
            rules={[
              { required: true, message: "Name is required", whitespace: true },
            ]}
          >
            <MDInput placeholder="Enter name holiday" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date:"
            rules={[{ required: true, message: "Date is required" }]}
          >
            <SelectDateHolidays
              valueDate={valueDate}
              onChangeValueDate={(value) => setValueDate(value)}
            />
          </Form.Item>

          <Form.Item
            name="autoReplyCode"
            label="Auto-Reply:"
            rules={[{ required: true, message: "Auto-Reply is required" }]}
          >
            <BoxSelectAutoReply dataAutoReply={dataAutoReply} />
          </Form.Item>
        </Form>
      </div>
    </MDModalUI>
  );
};

export default ModalHoliday;
