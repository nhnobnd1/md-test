import { priorityOptions } from "@moose-desk/repo";
import {
  Button,
  FormLayout,
  Icon,
  Select,
  SelectOption,
} from "@shopify/polaris";
import { useMemo } from "react";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import BoxReply from "src/modules/ticket/components/DetailTicketForm/BoxReply";
import * as Yup from "yup";
import FaMailReply from "~icons/gg/mail-reply";

interface DetailTicketFormProps extends Partial<FormProps> {}

export const DetailTicketForm = (props: DetailTicketFormProps) => {
  const DetailTicketFormSchema = Yup.object().shape({
    to: Yup.string()
      .required("Email address is required")
      .email("The email address is not valid"),
  });

  const statusOptions = useMemo<SelectOption[]>(() => {
    return [{ label: "Resolved", value: "resolved" }];
  }, []);

  const assigneeOptions = useMemo<SelectOption[]>(() => {
    return [{ label: "Minh Thức", value: "1" }];
  }, []);

  return (
    <Form
      {...props}
      initialValues={props.initialValues}
      enableReinitialize
      validationSchema={DetailTicketFormSchema}
      onSubmit={() => {}}
    >
      <FormLayout.Group condensed>
        <FormItem name="status">
          <Select label="Status" options={statusOptions} />
        </FormItem>
        <FormItem name="assignee">
          <Select label="Assignee" options={assigneeOptions} />
        </FormItem>

        <FormItem name="priority">
          <Select label="Priority" options={priorityOptions} />
        </FormItem>
      </FormLayout.Group>
      <div className="flex justify-end items-center gap-2 my-6">
        <Button
          icon={() => <Icon source={() => <FaMailReply />}></Icon>}
          primary
        >
          Reply
        </Button>
        <Button>Reply & Close Ticket</Button>
      </div>
      <BoxReply />
    </Form>
  );
};

export default DetailTicketForm;
