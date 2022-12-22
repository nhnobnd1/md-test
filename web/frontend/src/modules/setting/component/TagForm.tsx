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

const TagForm = (
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
    name: string().required("Required!"),
    description: string(),
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
          <FormItem name="name">
            <TextField
              type="text"
              placeholder="Tags name"
              label="Tag name"
              autoComplete="off"
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
          <FormItem name="storeId" />
        </FormLayout>
      </Form>
    </Card>
  );
};
export default forwardRef(TagForm);
