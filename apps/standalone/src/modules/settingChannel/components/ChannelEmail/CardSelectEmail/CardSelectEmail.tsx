import { useJob } from "@moose-desk/core";
import { GetEmailGoogleAuthRequest } from "@moose-desk/repo";
import EmailIntegrationRepository from "@moose-desk/repo/emailIntegration/EmailIntegrationRepository";
import { Button, Card, Checkbox, FormInstance, Radio } from "antd";
import { useCallback } from "react";
import { map } from "rxjs";
import { Form } from "src/components/UI/Form";
import { useSubdomain } from "src/hooks/useSubdomain";
import CardSettingExternalMail, {
  TypePort,
} from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail/CardSettingExternalMail";
import { MailServer } from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";
import EntypoMail from "~icons/entypo/mail";
import LogosGoogleIcon from "~icons/logos/google-icon";
import LogosMicrosoftWindows from "~icons/logos/microsoft-windows";

interface CardSelectEmailProps {
  form: FormInstance<any>;
  className?: string;
  type: "new" | "update";
}

export const CardSelectEmail = ({
  form,
  className,
  type,
}: CardSelectEmailProps) => {
  const { getSubDomain } = useSubdomain();

  const { run: getEmailGoogleAuth } = useJob(
    (payload: GetEmailGoogleAuthRequest) => {
      return EmailIntegrationRepository()
        .getEmailGoogleAuth(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              window.location.href = data.data;
            }
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const handleSignInGoogle = useCallback(() => {
    const payload: GetEmailGoogleAuthRequest = {
      type: type,
      ...(import.meta.env.MODE === "development" && {
        subdomainForTest: "http://localhost:3580",
      }),
    };

    getEmailGoogleAuth(payload);
  }, [import.meta.env]);

  const SettingUpMail = (props: any) => {
    return (
      <>
        <div className="pb-6">
          The Email you just signed in is:{" "}
          <span className="font-bold">abc@gmail.com</span>
          <span className="ml-4 link">Change email address</span>
        </div>
        <Form.Item name="accessType">
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
          <Radio className="mr-4" value={MailServer.Gmail}>
            <LogosGoogleIcon className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>Gmail</span>
          </Radio>
          <Radio className="mr-4" value={MailServer.Microsoft}>
            <LogosMicrosoftWindows className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>Microsoft</span>
          </Radio>
          <Radio value={MailServer.ExternalEmail}>
            <EntypoMail className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>External Email</span>
          </Radio>
        </Radio.Group>
      </Form.Item>
      <div>
        {/* gmail */}
        {form.getFieldValue("mailServer") === MailServer.Gmail && (
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
                onClick={handleSignInGoogle}
              >
                Sign In Gmail
              </Button>
            ) : (
              <SettingUpMail />
            )}
          </>
        )}

        {/* microsoft */}
        {form.getFieldValue("mailServer") === MailServer.Microsoft && (
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
        {form.getFieldValue("mailServer") === MailServer.ExternalEmail && (
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
