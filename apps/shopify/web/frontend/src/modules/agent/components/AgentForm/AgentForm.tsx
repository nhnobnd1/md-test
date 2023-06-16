import { Role } from "@moose-desk/repo";
import { FormLayout, Select, TextField } from "@shopify/polaris";
import { useMemo } from "react";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import InputPhone from "src/components/InputPhone/InputPhone";
import { regexPhoneValidate } from "src/constaint/regex";
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
  phoneNumber: "";
  role: Role.BasicAgent;
}

const AgentForm = ({ disableForm = false, ...props }: AgentFormProps) => {
  const options = [
    { label: "System Admin", value: Role.Admin },
    { label: "Agent Leader", value: Role.AgentLeader },
    { label: "Basic Agent", value: Role.BasicAgent },
  ];

  const initialValuesForm = useMemo<AgentFormValues>(() => {
    return {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: Role.BasicAgent,
    };
  }, [Role]);

  const AgentFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("The email address is not valid")
      .required("Email address is required!"),
    firstName: Yup.string()
      .matches(/[^\s]/, "First name is required!")
      .required("First name is required!"),
    lastName: Yup.string()
      .matches(/[^\s]/, "Last name is required!")
      .required("Last name is required!"),
    phoneNumber: Yup.string()
      .matches(regexPhoneValidate, "The input phone number is not valid")
      .nullable(),
    role: Yup.string().required("User role is required!"),
  });

  return (
    <Form
      {...props}
      initialValues={props.initialValues ?? initialValuesForm}
      validationSchema={AgentFormSchema}
    >
      <FormLayout>
        <FormItem name="email">
          <TextField
            label={
              <div>
                <span className="mr-1 text-red-500">*</span>Email
              </div>
            }
            type="email"
            autoComplete="off"
            disabled={props.initialValues ?? false}
            placeholder="Enter email"
          />
        </FormItem>
        <FormItem name="firstName">
          <TextField
            label={
              <div>
                <span className="mr-1 text-red-500">*</span>First name
              </div>
            }
            type="text"
            autoComplete="off"
            disabled={disableForm}
            placeholder="Enter first name"
          />
        </FormItem>
        <FormItem name="lastName">
          <TextField
            label={
              <div>
                <span className="mr-1 text-red-500">*</span>Last name
              </div>
            }
            type="text"
            autoComplete="off"
            disabled={disableForm}
            placeholder="Enter last name"
          />
        </FormItem>
        <FormItem name="phoneNumber">
          <InputPhone
            disabled={disableForm}
            label="Phone number"
            placeholder="Enter phone number"
          />
        </FormItem>
        <FormItem name="role">
          <Select label="User role" disabled={disableForm} options={options} />
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
    </Form>
  );
};

export default AgentForm;
