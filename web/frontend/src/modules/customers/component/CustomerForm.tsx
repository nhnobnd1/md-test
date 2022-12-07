import { Card, FormLayout, TextField } from "@shopify/polaris";
import { FormikProps } from "formik";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";

const CustomerForm = ({ initialValues, setShowSave }: any, ref: any) => {
  const formRef = useRef<FormikProps<any>>(null);
  const handleSubmit = useCallback((data: any) => {
    return data;
  }, []);
  useImperativeHandle(ref, () => ({
    save: () => formRef.current?.submitForm(),
    reset: () => formRef.current?.resetForm(),
  }));

  return (
    <Card sectioned>
      <Form
        ref={formRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onValuesChange={() => setShowSave(true)}
      >
        <FormLayout>
          <FormItem name="firstName">
            <TextField type="text" label="Firstname" autoComplete="cc-name" />
          </FormItem>
          <FormItem name="lastName">
            <TextField type="text" label="Lastname" autoComplete="cc-name" />
          </FormItem>
          <FormItem name="email">
            <TextField type="email" label="Email" autoComplete="email" />
          </FormItem>
          <FormItem name="phone">
            <TextField type="tel" label="Phone" autoComplete="tel" />
          </FormItem>
        </FormLayout>
      </Form>
    </Card>
  );
};
export default forwardRef(CustomerForm);
