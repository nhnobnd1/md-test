import { Button } from "antd";
import { useCallback } from "react";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import { ChannelEmailForm } from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";

interface ChannelEmailCreateProps {}

const ChannelEmailCreate = (props: ChannelEmailCreateProps) => {
  const form = Form.useForm(undefined);
  const handleFinishForm = useCallback((values: any) => {
    console.log("values:", values);
  }, []);

  return (
    <>
      <Header className="mb-[40px]" title="Email Configuration" back>
        <div className="flex-1 flex justify-end">
          <Button>Save</Button>
        </div>
      </Header>
      <ChannelEmailForm type="new" onFinish={handleFinishForm} />
    </>
  );
};

export default ChannelEmailCreate;
