import { FormLayout } from "@shopify/polaris";
import Form, { FormProps } from "src/components/Form";
import * as Yup from "yup";

interface DetailTicketFormProps extends Partial<FormProps> {}

export const DetailTicketForm = (props: DetailTicketFormProps) => {
  const DetailTicketFormSchema = Yup.object().shape({
    to: Yup.string()
      .required("Email address is required")
      .email("The email address is not valid"),
  });
  return (
    <Form
      {...props}
      initialValues={props.initialValues}
      validationSchema={DetailTicketFormSchema}
      onSubmit={() => {}}
    >
      <FormLayout></FormLayout>
    </Form>
  );
};

export default DetailTicketForm;
