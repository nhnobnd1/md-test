import { priorityOptions } from "@moose-desk/repo";
import { Modal, ModalProps } from "antd";
import { Form } from "src/components/UI/Form";
import Select from "src/components/UI/Select/Select";

interface ModalFilterProps extends ModalProps {}

const ModalFilter = ({ ...props }: ModalFilterProps) => {
  return (
    <Modal title="FILTER" {...props}>
      <div className="pt-4">
        <Form layout="vertical" enableReinitialize>
          <Form.Item label="Customer" name="customer">
            <Select options={[]} />
          </Form.Item>
          <Form.Item label="Tags" name="tags">
            <Select options={[]} />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select options={priorityOptions} />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select options={[]} />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalFilter;
