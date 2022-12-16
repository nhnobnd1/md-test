import { FormLayout, Select, TextField } from "@shopify/polaris";
import { useMemo } from "react";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { Role } from "src/models/Rule";
import * as Yup from "yup";
import "./AgentForm.scss";

interface AgentFormProps extends FormProps {}

const AgentForm = (props: AgentFormProps) => {
  const options = [
    { label: "Super Admin", value: Role.Admin },
    { label: "Agent Leader", value: Role.AgentLeader },
    { label: "Basic Agent", value: Role.BasicAgent },
  ];

  const initialValuesForm = useMemo(() => {
    return {
      email: "",
      name: "",
      phone: "",
      role: Role.BasicAgent,
    };
  }, []);

  const AgentFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("You must enter your email"),
    name: Yup.string()
      .required("You must enter your name")
      .max(255, "Name up to 255 characters"),
    phone: Yup.string()
      .min(9, "Phone at least 9 characters")
      .max(12, "Name up to 12 characters"),
    role: Yup.string().required("You must enter your role"),
  });

  return (
    <Form
      {...props}
      initialValues={initialValuesForm}
      validationSchema={AgentFormSchema}
    >
      <FormLayout>
        <FormItem name="email">
          <TextField label="Email" type="email" autoComplete="off" />
        </FormItem>
        <FormItem name="name">
          <TextField label="Display name" type="text" autoComplete="off" />
        </FormItem>
        <FormItem name="phone">
          <TextField label="Phone number" type="tel" autoComplete="off" />
        </FormItem>
        <FormItem name="role">
          <Select label="User role" options={options} />
        </FormItem>
      </FormLayout>
    </Form>
  );
};

export default AgentForm;
