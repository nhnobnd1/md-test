import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useMemo } from "react";
import Form, { FormProps } from "src/components/UI/Form/Form";

export interface TagFormValues {
  _id?: string;
  description?: string;
  name?: string;
  isUpdate?: boolean;
  storeId?: string;
}
interface TagFormProps extends FormProps {
  disabled?: boolean;
}

export const TagForm = ({ ...props }: TagFormProps) => {
  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        name: "",
        description: "",
      }
    );
  }, [props.initialValues]);

  return (
    <Form {...props} layout="vertical" initialValues={initialValues}>
      <Form.Item name="_id" hidden />
      <Form.Item
        label="Tag name"
        name="name"
        rules={[
          { required: true, message: "The tag name is required!" },
          {
            max: 255,
            message: "First name up to 255 characters",
          },
          {
            pattern: /[^\s]/,
            message: "Tag name can't be all space",
          },
        ]}
      >
        <Input placeholder="Enter tag name" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={10} placeholder="Enter description" />
      </Form.Item>
    </Form>
  );
};

export default TagForm;
