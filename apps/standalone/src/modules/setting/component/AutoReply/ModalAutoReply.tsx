import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AutoReply } from "@moose-desk/repo";
import { Input, Modal, ModalProps } from "antd";
import { FormikValues } from "formik";
import { memo, useCallback } from "react";
import Editor from "src/components/UI/Editor/Editor";
import { Form } from "src/components/UI/Form";

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
  ClassicEditor.create(Editor, {
    extraPlugins: [],
    toolbar: [
      "bold",
      "italic",
      "heading",
      "bulletedList",
      "numberedList",
      "link",
      "undo",
      "redo",
      "InsertDropDown",
    ],
  });
  const day = new Date();
  const handleSubmitValue = useCallback(
    (values: FormikValues) => {
      onChange &&
        onChange(
          {
            name: values.name,
            code: values.code || self.crypto.randomUUID(),
            content: values.content,
            createAt: values.createAt || day,
          },
          dataForm?.value ? true : undefined
        );
      onClose && onClose();
    },
    [dataForm?.value]
  );
  // handle Validate regex
  // const validateObject = object().shape({
  //   name: string().required("Required!"),
  //   content: string().required("Required!"),
  // });
  return (
    <div className="mt-4" style={{ width: "1000px" }}>
      <Modal
        {...props}
        open={open}
        onOk={() => {
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
            <Form.Item name="name" label="Name">
              <Input placeholder="Enter name auto-reply" />
            </Form.Item>
            <Form.Item name="code" hidden />
            <Form.Item name="createAt" hidden></Form.Item>
            <Form.Item name="content" label="Content">
              <Editor />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default memo(ModalAutoReply);
