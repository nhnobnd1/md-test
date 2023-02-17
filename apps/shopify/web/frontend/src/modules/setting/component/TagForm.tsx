import { Card, FormLayout, TextField } from "@shopify/polaris";
import { FormikProps } from "formik";
import { ForwardedRef, forwardRef, useCallback } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { object, string } from "yup";
export interface RefProperties {
  save: () => Promise<void> | undefined;
  reset: () => void | undefined;
}

const TagForm = (
  { initialValues, submit, updateForm }: any,
  ref: ForwardedRef<FormikProps<any>>
) => {
  const handleSubmit = useCallback((data: any) => {
    submit(data);
  }, []);

  const validateObject = object().shape({
    name: string().required("Tag mane is required!"),
    description: string(),
  });
  return (
    <Card sectioned>
      <Form
        innerRef={ref}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validateObject}
        onValuesChange={updateForm}
        enableReinitialize
      >
        <FormLayout>
          <FormItem name="_id" />
          <FormItem name="name">
            <TextField
              type="text"
              placeholder="Tag name"
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
