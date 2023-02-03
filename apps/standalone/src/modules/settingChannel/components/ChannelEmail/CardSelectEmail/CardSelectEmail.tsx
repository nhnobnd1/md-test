import { Button, Card, Checkbox, FormInstance, Radio } from "antd";
import { Form } from "src/components/UI/Form";
import CardSettingExternalMail, {
  TypePort,
} from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail/CardSettingExternalMail";
import EntypoMail from "~icons/entypo/mail";
import LogosGoogleIcon from "~icons/logos/google-icon";
import LogosMicrosoftWindows from "~icons/logos/microsoft-windows";

interface CardSelectEmailProps {
  form: FormInstance<any>;
  className?: string;
}

export const CardSelectEmail = ({ form, className }: CardSelectEmailProps) => {
  const SettingUpMail = (props: any) => {
    return (
      <>
        <div className="pb-6">
          The Email you just signed in is:{" "}
          <span className="font-bold">abc@gmail.com</span>
          <span className="ml-4 link">Change email address</span>
        </div>
        <Form.Item name="emailFor">
          <Radio.Group>
            <Radio className="mr-4" value="both">
              Both
            </Radio>
            <Radio className="mr-4" value="outMail">
              Outgoing mails
            </Radio>
            <Radio className="mr-4" value="inMail">
              Incoming mails
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item valuePropName="checked">
          <Checkbox>Delete from server after fetching</Checkbox>
        </Form.Item>
      </>
    );
  };

  return (
    <Card className={className} type="inner" title="Mail Server">
      <Form.Item className="mb-[40px]" name="mailServer">
        <Radio.Group>
          <Radio className="mr-4" value="gmail">
            <LogosGoogleIcon className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>Gmail</span>
          </Radio>
          <Radio className="mr-4" value="microsoft">
            <LogosMicrosoftWindows className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>Microsoft</span>
          </Radio>
          <Radio value="externalEmail">
            <EntypoMail className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>External Email</span>
          </Radio>
        </Radio.Group>
      </Form.Item>
      <div>
        {/* gmail */}
        {form.getFieldValue("mailServer") === "gmail" && (
          <>
            {!form.getFieldValue("isLoggedServer") ? (
              <Button
                className="flex items-center mb-4"
                size="middle"
                icon={
                  <span className="flex items-center mr-2 text-[16px]">
                    <LogosGoogleIcon />
                  </span>
                }
              >
                Sign In Gmail
              </Button>
            ) : (
              <SettingUpMail />
            )}
          </>
        )}

        {/* microsoft */}
        {form.getFieldValue("mailServer") === "microsoft" && (
          <>
            {!form.getFieldValue("isLoggedServer") ? (
              <Button
                className="flex items-center mb-4"
                size="middle"
                icon={
                  <span className="flex items-center mr-2 text-[16px]">
                    <LogosMicrosoftWindows />
                  </span>
                }
              >
                Sign In Microsoft Live Email
              </Button>
            ) : (
              <SettingUpMail />
            )}
          </>
        )}

        {/* external mail */}
        {form.getFieldValue("mailServer") === "externalEmail" && (
          <>
            <Form.Item name="imap">
              <CardSettingExternalMail
                className="mb-6"
                title="Incoming Mail Configuration"
                typePort={TypePort.IMAP}
                testConnection={() => {}}
              />
            </Form.Item>
            <Form.Item>
              <CardSettingExternalMail
                title="Outgoing Mail Configuration"
                typePort={TypePort.SMTP}
                testConnection={() => {}}
              />
            </Form.Item>
          </>
        )}
      </div>
    </Card>
  );
};

export default CardSelectEmail;
