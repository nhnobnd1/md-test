import { Role } from "@moose-desk/repo";
import { FormProps, Input } from "antd";
import { useMemo } from "react";
import Form from "src/components/UI/Form/Form";
import Select from "src/components/UI/Select/Select";
import "./AgentForm.scss";

export interface AgentFormValues {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: Role;
}
interface AgentFormProps extends FormProps {}

export const AgentForm = (props: AgentFormProps) => {
  const initialValues = useMemo(() => {
    return {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: Role.BasicAgent,
    };
  }, []);

  const options = [
    { label: "Super Admin", value: Role.Admin },
    { label: "Agent Leader", value: Role.AgentLeader },
    { label: "Basic Agent", value: Role.BasicAgent },
  ];

  return (
    <Form {...props} layout="vertical" initialValues={initialValues}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "You must enter your email!" },
          { type: "email", message: "Email is invalid!" },
        ]}
      >
        <Input />
      </Form.Item>

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
        <Input />
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
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone number"
        name="phoneNumber"
        rules={[
          {
            max: 255,
            message: "Last name up to 255 characters",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="User role"
        name="role"
        rules={[{ required: true, message: "You must enter your role!" }]}
      >
        <Select options={options} />
      </Form.Item>
    </Form>
  );
};

export default AgentForm;
