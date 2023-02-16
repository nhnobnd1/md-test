import { useToggle } from "@moose-desk/core";
import { GetMembersGroupRequest } from "@moose-desk/repo";
import { Button, Card, Input } from "antd";
import classNames from "classnames";
import { useMemo, useState } from "react";
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

export const GroupForm = ({
  disableForm = false,
  id,
  ...props
}: GroupFormProps) => {
  const { state: viewAddMember, toggle: toggleViewAddMember } = useToggle(!!id);

  const defaultFilter: () => GetMembersGroupRequest = () => ({
    page: 1,
    limit: 5,
    query: "",
  });

  const [filterData, setFilterData] = useState<GetMembersGroupRequest>(
    defaultFilter()
  );

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
    <Form
      {...props}
      enableReinitialize
      layout="vertical"
      initialValues={initialValues}
    >
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
          <div className="flex items-baseline gap-4">
            <div className="label">Group members</div>
            <Button
              type="primary"
              danger={viewAddMember}
              onClick={toggleViewAddMember}
            >
              {!viewAddMember ? "Add group member" : "Close add group member"}
            </Button>
          </div>
        </Card>
        <Card className={classNames({ hidden: !viewAddMember })}>
          <Form.Item name="groupMembers" label="Add members">
            <GroupFormMember groupId={id} />
          </Form.Item>
        </Card>
      </div>
    </Form>
  );
};

export default GroupForm;
