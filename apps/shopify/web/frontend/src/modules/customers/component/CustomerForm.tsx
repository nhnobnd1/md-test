import { FormLayout, Grid, Select, TextField } from "@shopify/polaris";
import { FormikProps } from "formik";
import { ForwardedRef, forwardRef, useCallback } from "react";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import InputPhone from "src/components/InputPhone/InputPhone";
import { regexPhoneValidate } from "src/constaint/regex";
import { object, string } from "yup";
export interface RefProperties {
  save: () => Promise<void> | undefined;
  reset: () => void | undefined;
}
const LIST_HONORIFIC = [
  { label: "--", value: "" },
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },

  { label: "Miss", value: "Miss" },

  { label: "Ms", value: "Ms" },
];

const CustomerForm = (
  { initialValues, submit }: any,
  ref: ForwardedRef<FormikProps<any>>
) => {
  const handleSubmit = useCallback((data: any) => {
    submit(data);
  }, []);
  const validateObject = object().shape({
    firstName: string()
      .matches(/[^\s]/, "First name is required!")
      .required("First name is required!"),
    lastName: string()
      .matches(/[^\s]/, "Last name is required!")
      .required("Last name is required!"),
    email: string()
      .email("The email address is not valid")
      .required("Email address is required!"),
    phoneNumber: string().matches(
      regexPhoneValidate,
      "The input phone number is not valid"
    ),
  });
  return (
    <Form
      innerRef={ref}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validateObject}
      enableReinitialize
    >
      <FormLayout>
        <FormItem name="_id" />
        <Grid columns={{ xs: 1, sm: 5, lg: 5, xl: 5 }}>
          <Grid.Cell columnSpan={{ xs: 1, sm: 1, lg: 1, xl: 1 }}>
            <FormItem name="honorific">
              <Select
                label="Honorific"
                options={LIST_HONORIFIC}
                // onChange={handleSelectChange}
                // value={selected}
              />
            </FormItem>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 1, sm: 2, lg: 2, xl: 2 }}>
            <FormItem name="firstName">
              <TextField
                type="text"
                placeholder="Your first name"
                label="First name"
                autoComplete="cc-name"
              />
            </FormItem>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 1, sm: 2, lg: 2, xl: 2 }}>
            <FormItem name="lastName">
              <TextField
                type="text"
                placeholder="Your last name"
                label="Last name"
                autoComplete="cc-name"
              />
            </FormItem>
          </Grid.Cell>
        </Grid>

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
