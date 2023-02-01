import { Card, FormProps, Input } from "antd";
import { useMemo } from "react";
import { Form } from "src/components/UI/Form";
import GroupFormMember from "src/modules/group/components/GroupForm/GroupFormMember";
import "./GroupForm.scss";

interface GroupFormProps extends FormProps {
  disableForm?: boolean;
  initialValues?: any;
  id?: string;
}

export interface GroupFormValues {
  name: string;
  description: string;
  groupMembers: string[];
}

export const GroupForm = ({
  disableForm = false,
  id,
  ...props
}: GroupFormProps) => {
  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        name: "",
        description: "",
        groupMembers: [],
      }
    );
  }, [props.initialValues]);

  return (
    <Form {...props} layout="vertical" initialValues={initialValues}>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <Form.Item name="name" label="Name">
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={10}
              placeholder="Enter description"
            ></Input.TextArea>
          </Form.Item>
        </Card>

        <Card>
          <Form.Item name="">
            <GroupFormMember id={id ?? undefined} />
          </Form.Item>
        </Card>
      </div>
    </Form>
  );
};

export default GroupForm;
