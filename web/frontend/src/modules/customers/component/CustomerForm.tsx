import { Card, FormLayout, TextField } from "@shopify/polaris";
import { FormikProps } from "formik";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { object, string } from "yup";
export interface RefProperties {
  save: () => Promise<void> | undefined;
  reset: () => void | undefined;
}

const CustomerForm = (
  { initialValues, submit, change }: any,
  ref: ForwardedRef<RefProperties>
) => {
  const formRef = useRef<FormikProps<any>>(null);
  const handleSubmit = useCallback((data: any) => {
    submit(data);
  }, []);
  useImperativeHandle(ref, () => ({
    save: () => formRef.current?.submitForm(),
    reset: () => formRef.current?.resetForm(),
  }));
  const handleChange = useCallback(() => {
    change(false);
  }, []);
  const validateObject = object({
    firstName: string().required("Required!"),
    lastName: string().required("Required!"),
    email: string().email("Invalid email format ").required("Required!"),
  });
  return (
    <Card sectioned>
      <Form
        ref={formRef}
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
              placeholder="Your firstname"
              label="Firstname"
              autoComplete="cc-name"
            />
          </FormItem>
          <FormItem name="lastName">
            <TextField
              type="text"
              placeholder="Your lastname"
              label="Lastname"
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
            <TextField
              type="tel"
              placeholder="Your phone number"
              label="Phone"
              autoComplete="tel"
            />
          </FormItem>

          <FormItem name="storeId" />
        </FormLayout>
      </Form>
    </Card>
  );
};
export default forwardRef(CustomerForm);
