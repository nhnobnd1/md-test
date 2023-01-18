import { Button, FormLayout, Text, TextField } from "@shopify/polaris";
import { useMemo, useState } from "react";
import Form, { FormProps } from "src/components/Form";
import FormItem from "src/components/Form/Item";
import GroupFormMembers from "src/modules/groups/components/GroupForm/GroupFormMembers";
import * as Yup from "yup";
import "./GroupForm.scss";

interface GroupFormProps extends Omit<FormProps, "initialValues"> {
  disableForm?: boolean;
  initialValues?: any;
  id?: string;
}

export interface GroupFormValues {
  name: string;
  description: string;
  groupMembers: number;
}

export const GroupForm = ({
  disableForm = false,
  id,
  ...props
}: GroupFormProps) => {
  const initialValuesForm = useMemo<GroupFormValues>(() => {
    return {
      name: "",
      description: "",
      groupMembers: 0,
    };
  }, []);

  const [viewAddGroup, setViewAddGroup] = useState(true);

  const GroupFormSchema = Yup.object().shape({
    name: Yup.string()
      .required("You must enter your group name")
      .max(255, "Group name up to 255 characters"),
    description: Yup.string()
      .required("You must enter your description")
      .max(255, "Description up to 255 characters"),
  });

  return (
    <Form
      {...props}
      initialValues={props.initialValues ?? initialValuesForm}
      validationSchema={GroupFormSchema}
    >
      <FormLayout>
        <FormItem name="name">
          <TextField
            label="Name"
            type="text"
            autoComplete="off"
            disabled={disableForm}
            placeholder="Enter name"
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
        <div className="pt-2">
          <div className="flex gap-2 items-center">
            <Text variant="bodyMd" as="p">
              Group members:
            </Text>
            {viewAddGroup ? (
              <Button
                size="slim"
                destructive
                onClick={() => setViewAddGroup(false)}
              >
                Close add group member
              </Button>
            ) : (
              <Button
                size="slim"
                dataPrimaryLink
                onClick={() => setViewAddGroup(true)}
              >
                Add group member
              </Button>
            )}
          </div>
          {viewAddGroup && (
            <div className="pt-6">
              <GroupFormMembers id={id} />
            </div>
          )}
        </div>
      </FormLayout>
    </Form>
  );
};

export default GroupForm;
