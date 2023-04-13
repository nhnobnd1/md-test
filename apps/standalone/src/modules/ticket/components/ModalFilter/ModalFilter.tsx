import { useNavigate } from "@moose-desk/core";
import {
  Customer,
  Tag,
  Ticket,
  priorityOptions,
  statusOptions,
} from "@moose-desk/repo";
import { Button, Modal, ModalProps } from "antd";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Form } from "src/components/UI/Form";
import Select from "src/components/UI/Select/Select";

interface ModalFilterProps extends ModalProps {
  tags: Tag[];
  customers: Customer[];
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
  closeFilterModal: () => void;
  handleResetModal: () => void;
  handleApply: (values: any) => void;
}

const ModalFilter = ({
  tags,
  customers,
  setTickets,
  closeFilterModal,
  handleResetModal,
  handleApply,
  ...props
}: ModalFilterProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const tagsOptions = useMemo(() => {
    const optionsTag = tags.map((item: Tag) => {
      return { label: item.name, value: item.name };
    });
    return optionsTag;
  }, [tags]);
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
    <Modal
      title="FILTER"
      {...props}
      onOk={handleApplySubmit}
      footer={[
        <Button
          key="back"
          onClick={() => {
            handleResetModal();
            navigate(location.pathname, {});

            form.resetFields();
          }}
        >
          Reset
        </Button>,
        <Button
          key="submit"
          type="primary"
          // loading={loading}
          onClick={handleApplySubmit}
        >
          Apply
        </Button>,
      ]}
      onCancel={() => {
        closeFilterModal();
      }}
    >
      <div className="pt-4">
        <Form layout="vertical" enableReinitialize form={form}>
          <Form.Item label="Customer" name="customer">
            <Select options={customersOptions} />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select mode="multiple" options={tagsOptions} listHeight={180} />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select options={priorityOptions} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select options={statusOptions} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalFilter;
