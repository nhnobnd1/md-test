import { Role } from "@moose-desk/repo";
import { useMemo } from "react";
import Form, { FormProps } from "src/components/UI/Form/Form";
import { MDInput } from "src/components/UI/Input";
import InputPhone from "src/components/UI/InputPhone/InputPhone";
import Select from "src/components/UI/Select/Select";
import { usePermission } from "src/hooks/usePerrmisson";
import {
  ROLE_OPTIONS_FULL,
  ROLE_OPTIONS_LEAD,
} from "src/modules/agent/helper/constant";
import "./AgentForm.scss";

export interface AgentFormValues {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: Role;
}
interface AgentFormProps extends FormProps {
  disabled?: boolean;
  disabledEmail?: boolean;
  disabledForm?: boolean;
}

export const AgentForm = ({
  disabled = false,
  disabledEmail = false,
  disabledForm = false,
  ...props
}: AgentFormProps) => {
  const { isLead } = usePermission();
  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: Role.BasicAgent,
      }
    );
  }, [props.initialValues]);

  return (
    <Form {...props} layout="vertical" initialValues={initialValues}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email address is required!" },
          { type: "email", message: "The input email domain is not valid" },
        ]}
      >
        <MDInput
          disabled={disabled || disabledEmail}
          placeholder="Enter email"
        />
      </Form.Item>

      <Form.Item
        label="First name"
        name="firstName"
        rules={[
          { required: true, message: "First name is required!" },
          {
            max: 255,
            message: "First name up to 255 characters",
          },
          {
            pattern: /[^\s]/,
            message: "First name is required!",
          },
        ]}
      >
        <MDInput disabled={disabled} placeholder="Enter first name" />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastName"
        rules={[
          { required: true, message: "Last name is required!" },
          {
            max: 255,
            message: "Last name up to 255 characters",
          },
          {
            pattern: /[^\s]/,
            message: "Last name is required!",
          },
        ]}
      >
        <MDInput disabled={disabled} placeholder="Enter last name" />
      </Form.Item>
      <Form.Item
        label="Phone number"
        name="phoneNumber"
        rules={[
          {
            pattern: /^(?:[0-9]{1,4})+-(?:[0-9]{3,15})$/g,
            message: "The input phone number is not valid",
          },
        ]}
      >
        <InputPhone disabled={disabled} placeholder="Enter phone number" />
      </Form.Item>
      <Form.Item
        label="User role"
        name="role"
        rules={[{ required: true, message: "User role is required!" }]}
      >
        <Select
          options={isLead ? ROLE_OPTIONS_LEAD : ROLE_OPTIONS_FULL}
          disabled={disabled}
        />
      </Form.Item>
    </Form>
  );
};

export default AgentForm;
