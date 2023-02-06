import { Header } from "src/components/UI/Header";
import { ChannelEmailForm } from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";

interface ChannelEmailCreateProps {}

const ChannelEmailCreate = (props: ChannelEmailCreateProps) => {
  return (
    <>
      <Header className="mb-[40px]" title="Email Configuration" back />
      <ChannelEmailForm type="new" />
    </>
  );
};

export default ChannelEmailCreate;
