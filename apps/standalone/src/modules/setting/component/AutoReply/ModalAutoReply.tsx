import { AutoReply } from "@moose-desk/repo";
import { ModalProps } from "antd";
import { FormikValues } from "formik";
import { memo, useCallback } from "react";
import { MDModalUI } from "src/components/MDModalUI";
import TextEditor from "src/components/UI/Editor/TextEditor";
import { Form } from "src/components/UI/Form";
import { MDInput } from "src/components/UI/Input";

interface ModalAutoReplyProps extends ModalProps {
  dataForm?: {
    value: AutoReply;
    index: number;
  };
  open: boolean;
  onChange?: (value?: AutoReply, isDetais?: boolean) => void;
  onClose?: () => void;
}

const ModalAutoReply = ({
  dataForm,
  onChange,
  open,
  onClose,
  ...props
}: ModalAutoReplyProps) => {
  const [form] = Form.useForm();
  const handleSubmitValue = useCallback(
    (values: FormikValues) => {
      onChange &&
        onChange(
          {
            name: values.name,
            code: values.code || self.crypto.randomUUID(),
            content: values.content,
            createAt: values.createAt || new Date(),
          },
          dataForm?.value ? true : undefined
        );
      onClose && onClose();
    },
    [dataForm?.value]
  );

  return (
    <div className="mt-4" style={{ width: "1000px" }}>
      <MDModalUI
        {...props}
        open={open}
        onOk={() => {
          console.log("hola", form.getFieldValue("content"));
          form.submit();
        }}
        onCancel={() => onClose && onClose()}
        okText="Save"
        cancelText="Cancel"
        width={1000}
      >
        <div className="mt-4">
          <Form
            initialValues={
              dataForm?.value || {
                name: "",
                content: "",
              }
            }
            layout="vertical"
            form={form}
            enableReinitialize
            onFinish={handleSubmitValue}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                  whitespace: true,
                },
              ]}
            >
              <MDInput placeholder="Enter name auto-reply" />
            </Form.Item>
            <Form.Item name="code" hidden />
            <Form.Item name="createAt" hidden></Form.Item>
            <Form.Item
              name="content"
              label="Content"
              rules={[
                {
                  required: true,
                  message: "Content is required",
                  whitespace: true,
                },
              ]}
            >
              <TextEditor
                form={form}
                init={{
                  toolbar:
                    "undo redo blocks fontfamily fontsizeinput bold italic underline strikethrough link image media table mergetags addcomment showcomments spellcheckdialog a11ycheck typography align lineheight ",
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </MDModalUI>
    </div>
  );
};

export default memo(ModalAutoReply);
