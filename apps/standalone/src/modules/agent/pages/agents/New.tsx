import { Button, Space } from "antd";
import Form from "src/components/UI/Form/Form";
import { Header } from "src/components/UI/Header";
import { AgentForm } from "src/modules/agent/components/AgentForm";

interface AgentsNewProps {}

const AgentsNew = (props: AgentsNewProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Header title="Create new agent" back></Header>
      <div className="w-[500px]">
        <AgentForm form={form} onFinish={handleFinish} />
        <Space>
          <Button onClick={() => form.resetFields()}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Send Invitation Email
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default AgentsNew;
