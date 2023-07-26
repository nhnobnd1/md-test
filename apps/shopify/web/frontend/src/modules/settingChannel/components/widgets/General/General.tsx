import {
  Button,
  Checkbox,
  FormLayout,
  LegacyStack,
  Text,
  TextField,
} from "@shopify/polaris";
import { Crisp } from "crisp-sdk-web";
import FormItem from "src/components/Form/Item";
import "./General.scss";
interface GeneralProps {}

const General = (props: GeneralProps) => {
  const handleContactSupport = () => {
    Crisp.chat.open();
    Crisp.message.send("text", "Hi, I'd like to add logo to widget header");
  };
  return (
    <div className="General">
      <FormLayout>
        <FormLayout.Group>
          <FormItem name="titleText">
            <TextField label="Title text" autoComplete="off" />
          </FormItem>
          <FormItem name="widgetHeader">
            <TextField label="Widget Header" autoComplete="off" />
          </FormItem>
        </FormLayout.Group>
        <div className="card-contact mt-6">
          <div className="header">
            <Text as="h5" variant="headingMd">
              Contact Form
            </Text>
          </div>
          <div className="body">
            <FormLayout>
              <FormItem name="formTitle">
                <TextField label="Form Title" autoComplete="off" />
              </FormItem>
              <FormItem name="buttonText">
                <TextField label="Button Text" autoComplete="off" />
              </FormItem>
              <FormItem name="confirmMessage">
                <TextField label="Confirm Message" autoComplete="off" />
              </FormItem>
              <FormItem name="allowAttach" valuePropName="checked">
                <Checkbox label="Allow Attachments" />
              </FormItem>
              <FormItem name="allowCaptcha" valuePropName="checked">
                <Checkbox label="Enable captcha verification" />
              </FormItem>
            </FormLayout>
          </div>
        </div>
      </FormLayout>
      <div className="change-logo">
        <LegacyStack vertical>
          <Text variant="bodyMd" as="p">
            Add your brand logo into MooseDesk Widget
          </Text>
          <Button outline onClick={handleContactSupport}>
            Replace Logo
          </Button>
        </LegacyStack>
      </div>
      {/* <UploadLogo widget={widget} visible={visible} onClose={off} /> */}
    </div>
  );
};

export default General;
