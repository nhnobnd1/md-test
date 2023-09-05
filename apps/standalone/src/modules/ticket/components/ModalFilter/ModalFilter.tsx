import { useNavigate } from "@moose-desk/core";
import { Agent, priorityOptions, statusOptions } from "@moose-desk/repo";
import { ModalProps } from "antd";
import { useState } from "react";
import { MDModalUI } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Form } from "src/components/UI/Form";
import Select from "src/components/UI/Select/Select";
import { AgentSelect } from "src/modules/ticket/components/TicketForm/AgentSelect";
import { CustomerSelect } from "src/modules/ticket/components/TicketForm/CustomerSelect";
import { TagSelect } from "src/modules/ticket/components/TicketForm/TagSelect";

interface ModalFilterProps extends ModalProps {
  closeFilterModal: () => void;
  handleResetModal: () => void;
  handleApply: (values: any) => void;
}

const ModalFilter = ({
  closeFilterModal,
  handleResetModal,
  handleApply,
  ...props
}: ModalFilterProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleApplySubmit = () => {
    handleApply({
      ...form.getFieldsValue(),
      agentObjectId: agentSelected?._id,
    });
  };
  const [agentSelected, setAgentSelected] = useState<Agent | undefined>();

  return (
    <MDModalUI
      title="Filter"
      {...props}
      onOk={handleApplySubmit}
      footer={[
        <MDButton
          key="back"
          onClick={() => {
            handleResetModal();
            navigate(location.pathname, {});

            form.resetFields();
            setAgentSelected(undefined);
          }}
        >
          Reset
        </MDButton>,
        <MDButton
          key="submit"
          type="primary"
          // loading={loading}
          onClick={handleApplySubmit}
        >
          Apply
        </MDButton>,
      ]}
      onCancel={() => {
        closeFilterModal();
      }}
    >
      <div>
        <Form layout="vertical" form={form}>
          <Form.Item label="Agent" name="agentObjectId">
            <AgentSelect setAgentSelected={setAgentSelected} />
          </Form.Item>
          <Form.Item label="Customer" name="customer">
            <CustomerSelect />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <TagSelect placeholder="Search" />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select options={priorityOptions} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select options={statusOptions} />
          </Form.Item>
        </Form>
      </div>
    </MDModalUI>
  );
};

export default ModalFilter;
