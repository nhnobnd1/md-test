import { Card, FormLayout, TextField } from "@shopify/polaris";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import Form, { RefProperties } from "src/components/Form";
import FormItem from "src/components/Form/Item";

const CustomerForm = ({ initialValues }: any, ref: any) => {
  const formRef = useRef<RefProperties>();
  const handleSubmit = useCallback((data: any) => {
    return data;
  }, []);
  useImperativeHandle(ref, () => ({
    save: () => formRef.current?.form.submitForm(),
    reset: () => formRef.current?.form.resetForm(),
    changeValue: () =>
      formRef.current?.form.handleChange((value: any) => value),
  }));

  return (
    <Card sectioned>
      <Form ref={formRef} initialValues={initialValues} onSubmit={handleSubmit}>
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
