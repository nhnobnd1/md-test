import { Input } from "antd";
import { useMemo } from "react";
import Form, { FormProps } from "src/components/UI/Form/Form";
import InputPhone from "src/components/UI/InputPhone/InputPhone";

export interface CustomerFormValues {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isUpdate?: boolean;
}
interface CustomerFormProps extends FormProps {
  disabled?: boolean;
}

export const CustomerForm = ({
  disabled = false,
  ...props
}: CustomerFormProps) => {
  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }
    );
  }, [props.initialValues]);

  return (
    <Form {...props} layout="vertical" initialValues={initialValues}>
      <Form.Item name="_id" hidden />
      <Form.Item
        label="First name"
        name="firstName"
        rules={[
          { required: true, message: "You must enter your first name!" },
          {
            max: 255,
            message: "First name up to 255 characters",
          },
        ]}
      >
        <Input disabled={disabled} placeholder="Enter first name" />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastName"
        rules={[
          { required: true, message: "You must enter your last name!" },
          {
            max: 255,
            message: "Last name up to 255 characters",
          },
        ]}
      >
        <Input disabled={disabled} placeholder="Enter last name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "You must enter your email!" },
          { type: "email", message: "Email is invalid!" },
        ]}
      >
        <Input disabled={disabled} placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="phoneNumber"
        rules={[
          {
            pattern: /^(?:[0-9]{1,4})+-(?:[0-9]{5,14})$/,
            message: "Invalid number phone format.",
          },
        ]}
      >
        <InputPhone placeholder="Enter phone number" />
      </Form.Item>
    </Form>
  );
};

export default CustomerForm;
