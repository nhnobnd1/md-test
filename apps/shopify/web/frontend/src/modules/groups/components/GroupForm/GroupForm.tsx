import { FormLayout, TextField } from "@shopify/polaris";
import { useMemo } from "react";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import * as Yup from "yup";
import "./GroupForm.scss";

interface GroupFormProps extends Omit<FormProps, "initialValues"> {
  disableForm?: boolean;
  initialValues?: any;
}

export interface GroupFormValues {
  name: string;
  description: string;
  groupMembers: number;
}

export const GroupForm = ({
  disableForm = false,
  ...props
}: GroupFormProps) => {
  const initialValuesForm = useMemo<GroupFormValues>(() => {
    return {
      name: "",
      description: "",
      groupMembers: 0,
    };
  }, []);

  const GroupFormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is invalid")
      .required("You must enter your email"),
    firstName: Yup.string()
      .required("You must enter your first name")
      .max(255, "First name up to 255 characters"),
    lastName: Yup.string()
      .required("You must enter your last name")
      .max(255, "Last name up to 255 characters"),
  });

  return (
    <Form
      {...props}
      initialValues={props.initialValues ?? initialValuesForm}
      validationSchema={GroupFormSchema}
    >
      <FormLayout>
        <FormItem name="name">
          <TextField
            label="Name"
            type="text"
            autoComplete="off"
            disabled={disableForm}
            placeholder="Enter name"
          />
        </FormItem>
        <FormItem name="description">
          <TextField
            type="text"
            placeholder="Enter description"
            label="Description"
            autoComplete="off"
            multiline={10}
          />
        </FormItem>
        <FormItem name="groupMembers"></FormItem>
      </FormLayout>
    </Form>
  );
};

export default GroupForm;
