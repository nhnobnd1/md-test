import { FormLayout, TextField } from "@shopify/polaris";
import { FormikProps } from "formik";
import { ForwardedRef, forwardRef, useCallback } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import InputPhone from "src/components/InputPhone/InputPhone";
import { regexPhoneValidate } from "src/constaint/country";
import { object, string } from "yup";
export interface RefProperties {
  save: () => Promise<void> | undefined;
  reset: () => void | undefined;
}

const CustomerForm = (
  { initialValues, submit, change }: any,
  ref: ForwardedRef<FormikProps<any>>
) => {
  const handleSubmit = useCallback((data: any) => {
    submit(data);
  }, []);

  const handleChange = useCallback(() => {
    change(false);
  }, []);
  const validateObject = object().shape({
    firstName: string().required("Required!"),
    lastName: string().required("Required!"),
    email: string().email("Invalid email format ").required("Required!"),
    phoneNumber: string().matches(
      regexPhoneValidate,
      "Invalid number phone format."
    ),
  });
  return (
    <Form
      ref={ref}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validateObject}
      onValuesChange={handleChange}
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
          />
        </FormItem>
        <FormItem name="phoneNumber">
          <InputPhone label="Phone" placeholder="Your phone number" />
        </FormItem>

        <FormItem name="storeId" />
      </FormLayout>
    </Form>
  );
};
export default forwardRef(CustomerForm);
