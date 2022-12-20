import { FormLayout, Select, TextField } from "@shopify/polaris";
import { useCallback, useMemo } from "react";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { Role } from "src/models/Rule";
import * as Yup from "yup";
import "./AgentForm.scss";

interface AgentFormProps extends Omit<FormProps, "initialValues"> {
  disableForm?: boolean;
  initialValues?: any;
}

export interface AgentFormValues {
  email: string;
  firstName: string;
  lastName: "";
  phone: "";
  role: Role.BasicAgent;
}

const AgentForm = ({ disableForm = false, ...props }: AgentFormProps) => {
  const options = [
    { label: "Super Admin", value: Role.Admin },
    { label: "Agent Leader", value: Role.AgentLeader },
    { label: "Basic Agent", value: Role.BasicAgent },
  ];

  const initialValuesForm = useMemo(() => {
    return {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: Role.BasicAgent,
    };
  }, []);

  const AgentFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("You must enter your email"),
    firstName: Yup.string()
      .required("You must enter your first name")
      .max(255, "First name up to 255 characters"),
    lastName: Yup.string()
      .required("You must enter your last name")
      .max(255, "Last name up to 255 characters"),
    phone: Yup.string()
      .min(9, "Phone at least 9 characters")
      .max(12, "Name up to 12 characters"),
    role: Yup.string().required("You must enter your role"),
  });

  const getLabelActive = useCallback((values: any) => {
    return values.isActive && values.emailConfirmed ? "Active" : "Invited";
  }, []);

  return (
    <Form
      {...props}
      initialValues={props.initialValues ?? initialValuesForm}
      validationSchema={AgentFormSchema}
    >
      {({ values }) => (
        <FormLayout>
          <FormItem name="email">
            <TextField
              label="Email"
              type="email"
              autoComplete="off"
              disabled={disableForm}
              placeholder="Enter email"
            />
          </FormItem>
          <FormItem name="firstName">
            <TextField
              label="First name"
              type="text"
              autoComplete="off"
              disabled={disableForm}
              placeholder="Enter first name"
            />
          </FormItem>
          <FormItem name="lastName">
            <TextField
              label="Last name"
              type="text"
              autoComplete="off"
              disabled={disableForm}
              placeholder="Enter last name"
            />
          </FormItem>
          <FormItem name="phoneNumber">
            <TextField
              label="Phone number"
              type="tel"
              autoComplete="off"
              disabled={disableForm}
              placeholder="Enter phone number"
            />
          </FormItem>
          <FormItem name="role">
            <Select
              label="User role"
              disabled={disableForm}
              options={options}
            />
          </FormItem>
          {/* {showStatus && (
            <Stack>
              <Stack.Item>Status:</Stack.Item>
              <Stack.Item>
                <Text variant="bodyLg" as="span">
                  {getLabelActive(values)}
                </Text>
              </Stack.Item>
            </Stack>
          )} */}
        </FormLayout>
      )}
    </Form>
  );
};

export default AgentForm;
