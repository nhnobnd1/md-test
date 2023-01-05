import { FormLayout, TextField } from "@shopify/polaris";
import { FormikProps } from "formik";
import { ForwardedRef, forwardRef, useCallback } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { object, string } from "yup";
export interface RefProperties {
  save: () => Promise<void> | undefined;
  reset: () => void | undefined;
}

const ProfileForm = (
  { initialValues, submit }: any,
  ref: ForwardedRef<FormikProps<any>>
) => {
  const handleSubmit = useCallback((data: any) => {
    submit(data);
  }, []);

  const validateObject = object().shape({
    firstName: string().required("Required!"),
    lastName: string().required("Required!"),
    email: string().email("Invalid email format ").required("Required!"),
  });
  return (
    <Form
      ref={ref}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validateObject}
      enableReinitialize
    >
      <FormLayout>
        <FormItem name="_id" />
        <FormItem name="firstName">
          <TextField
            type="text"
            placeholder="Your first name"
            label="First name"
            autoComplete="cc-name"
          />
        </FormItem>
        <FormItem name="lastName">
          <TextField
            type="text"
            placeholder="Your last name"
            label="Last name"
            autoComplete="cc-name"
          />
        </FormItem>
        <FormItem name="email">
          <TextField
            type="email"
            placeholder="Your email"
            label="Email"
            autoComplete="email"
            disabled
          />
        </FormItem>
        <FormItem name="phoneNumber">
          <TextField
            type="tel"
            placeholder="Your phone number"
            label="Phone No."
            autoComplete="tel"
          />
        </FormItem>

        <FormItem name="storeId" />
      </FormLayout>
    </Form>
  );
};
export default forwardRef(ProfileForm);