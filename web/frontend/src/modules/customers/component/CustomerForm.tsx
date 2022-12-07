import { Card, FormLayout, TextField } from "@shopify/polaris";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { FormProps } from "react-router-dom";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";

const CustomerForm = (props: any, ref: any) => {
  const formRef = useRef<FormProps>({});
  const handleSubmit = useCallback((data: any) => {
    console.log("dataaaaaaaaa", data);
  }, []);
  useImperativeHandle(ref, () => ({
    save: () => formRef.current?.onSubmit,
    reset: () => formRef.current?.onReset,
  }));

  return (
    <Card sectioned>
      <Form initialValues={formRef} onSubmit={handleSubmit}>
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
