import { useNavigate } from "@moose-desk/core";
import { Customer, priorityOptions, statusOptions } from "@moose-desk/repo";
import { ModalProps } from "antd";
import { useMemo } from "react";
import { MDModalUI } from "src/components/MDModalUI";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Form } from "src/components/UI/Form";
import Select from "src/components/UI/Select/Select";
import { AgentSelect } from "src/modules/ticket/components/TicketForm/AgentSelect";
import { TagSelect } from "src/modules/ticket/components/TicketForm/TagSelect";

interface ModalFilterProps extends ModalProps {
  customers: Customer[];
  closeFilterModal: () => void;
  handleResetModal: () => void;
  handleApply: (values: any) => void;
}

const ModalFilter = ({
  customers,
  closeFilterModal,
  handleResetModal,
  handleApply,
  ...props
}: ModalFilterProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const customersOptions = useMemo(() => {
    const customersOption = customers.map((item: Customer) => {
      return {
        label: `${item.firstName} ${item.lastName} - ${item.email}`,
        value: item.email,
      };
    });
    return customersOption;
  }, [customers]);

  const handleApplySubmit = () => {
    handleApply(form.getFieldsValue());
  };
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
            <AgentSelect />
          </Form.Item>
          <Form.Item label="Customer" name="customer">
            <Select options={customersOptions} />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <TagSelect />
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
