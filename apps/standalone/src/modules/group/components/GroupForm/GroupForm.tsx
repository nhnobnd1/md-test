import { useToggle } from "@moose-desk/core";
import { Card, Checkbox, Input } from "antd";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Form, FormProps } from "src/components/UI/Form";
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

export const GroupForm = ({ id, ...props }: GroupFormProps) => {
  const [form] = Form.useForm(props.form);
  const { toggle: updateForm } = useToggle();
  const { state: viewAddMember, toggle: toggleViewAddMember } = useToggle(!!id);
  const [valueGroupMembers, setValueGroupMembers] = useState<
    string[] | undefined
  >();

  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        name: "",
        description: "",
        groupMembers: [],
      }
    );
  }, [props.initialValues]);

  const handleChangeGroupMember = useCallback(
    (value) => {
      setValueGroupMembers(value);
      form.setFieldValue("groupMembers", value);
    },
    [form]
  );

  useEffect(() => {
    if (props.initialValues) {
      form.setFieldValue("groupMembers", props.initialValues.groupMembers);
      setValueGroupMembers(props.initialValues.groupMembers);
    }
  }, [props.initialValues]);

  const handleUpdateForm = useCallback((changedValue: any, value: any) => {
    props.onValuesChange && props.onValuesChange(changedValue, value);
    updateForm();
  }, []);

  return (
    <Form
      {...props}
      enableReinitialize
      layout="vertical"
      onValuesChange={handleUpdateForm}
      initialValues={initialValues}
    >
      <div className="flex flex-col gap-4">
        <Card className="w-full">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Group name is required!" },
              {
                pattern: /[^\s]/,
                message: "Group name is required!",
              },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={10}
              placeholder="Enter description"
            ></Input.TextArea>
          </Form.Item>
          <div className="flex items-baseline gap-4">
            {/* <div className="label">Group members</div> */}
            {/* <Button
              type="primary"
              danger={viewAddMember}
              onClick={toggleViewAddMember}
            >
              {!viewAddMember ? "Add group member" : "Close add group member"}
            </Button> */}
            <Checkbox checked={viewAddMember} onChange={toggleViewAddMember}>
              Add group member
            </Checkbox>
          </div>
        </Card>
        <Card className={classNames({ hidden: !viewAddMember })}>
          <Form.Item name="groupMembers" label="Add members" hidden></Form.Item>
          <div>
            <GroupFormMember
              groupId={id}
              value={valueGroupMembers}
              onChange={handleChangeGroupMember}
            />
          </div>
        </Card>
      </div>
    </Form>
  );
};

export default GroupForm;
