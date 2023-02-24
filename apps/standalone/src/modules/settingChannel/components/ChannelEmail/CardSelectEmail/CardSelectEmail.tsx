import { useJob } from "@moose-desk/core";
import {
  AccessType,
  GetEmailGoogleAuthRequest,
  GetEmailMicrosoftAuthRequest,
  MailBoxType,
} from "@moose-desk/repo";
import EmailIntegrationRepository from "@moose-desk/repo/emailIntegration/EmailIntegrationRepository";
import { Button, Card, Checkbox, FormInstance, Radio } from "antd";
import { useCallback } from "react";
import { map } from "rxjs";
import { Form } from "src/components/UI/Form";
import { useSubdomain } from "src/hooks/useSubdomain";
import CardSettingExternalMail, {
  TypePort,
} from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail/CardSettingExternalMail";
import { IsLoggedServer } from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";
import { useAppSelector } from "src/redux/hook";
import EntypoMail from "~icons/entypo/mail";
import LogosGoogleIcon from "~icons/logos/google-icon";
import LogosMicrosoftWindows from "~icons/logos/microsoft-windows";

interface CardSelectEmailProps {
  form: FormInstance<any>;
  className?: string;
  type: "new" | "update";
  loggedServer: IsLoggedServer | null;
}

export const CardSelectEmail = ({
  form,
  className,
  loggedServer,
  type,
}: CardSelectEmailProps) => {
  const { getSubDomain } = useSubdomain();

  const signCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

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

  const { run: getEmailMicrosoftAuth } = useJob(
    (payload: GetEmailMicrosoftAuthRequest) => {
      return EmailIntegrationRepository()
        .getEmailMicrosoftAuth(payload)
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

  const handleSignInSocial = useCallback(
    (social: "google" | "microsoft") => {
      const payload: GetEmailGoogleAuthRequest = {
        type: type,
        ...(import.meta.env.MODE === "development" && {
          subdomainForTest: "http://localhost:3580",
        }),
      };

      if (social === "google") {
        getEmailGoogleAuth(payload);
      } else if (social === "microsoft") {
        getEmailMicrosoftAuth(payload);
      }
    },
    [import.meta.env]
  );

  const onChangeEmail = useCallback(() => {
    if (form.getFieldValue("mailboxType") === MailBoxType.GMAIL) {
      handleSignInSocial("google");
    }
    if (form.getFieldValue("mailboxType") === MailBoxType.OUTLOOK) {
      handleSignInSocial("microsoft");
    }
  }, [form]);

  const SettingUpMail = (props: any) => {
    return (
      <>
        <div className="pb-6">
          The Email you just signed in is:{" "}
          <span className="font-bold">
            {signCallback.supportEmail || form.getFieldValue("supportEmail")}
          </span>
          <span className="ml-4 link" onClick={onChangeEmail}>
            Change email address
          </span>
        </div>
        <Form.Item name="accessType">
          <Radio.Group>
            <Radio className="mr-4" value={AccessType.Both}>
              Both
            </Radio>
            <Radio className="mr-4" value={AccessType.Outgoing}>
              Outgoing mails
            </Radio>
            <Radio className="mr-4" value={AccessType.Incoming}>
              Incoming mails
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="deleteFromServer" valuePropName="checked">
          <Checkbox>Delete from server after fetching</Checkbox>
        </Form.Item>
      </>
    );
  };

  return (
    <Card className={className} type="inner" title="Mail Server">
      <Form.Item className="mb-[40px]" name="mailboxType">
        <Radio.Group>
          <Radio className="mr-4" value={MailBoxType.GMAIL}>
            <LogosGoogleIcon className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>Gmail</span>
          </Radio>
          <Radio className="mr-4" value={MailBoxType.OUTLOOK}>
            <LogosMicrosoftWindows className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>Microsoft</span>
          </Radio>
          <Radio value={MailBoxType.OTHER}>
            <EntypoMail className="text-[16px] mr-1 ml-[4px] translate-y-1" />
            <span>External Email</span>
          </Radio>
        </Radio.Group>
      </Form.Item>
      <div>
        {/* gmail and logged */}
        {form.getFieldValue("mailboxType") === MailBoxType.GMAIL && (
          <>
            {loggedServer?.success && loggedServer?.callBackName === "gmail" ? (
              <SettingUpMail />
            ) : (
              <Button
                className="flex items-center mb-4"
                size="middle"
                icon={
                  <span className="flex items-center mr-2 text-[16px]">
                    <LogosGoogleIcon />
                  </span>
                }
                onClick={() => handleSignInSocial("google")}
              >
                Sign In Gmail
              </Button>
            )}
          </>
        )}

        {/* microsoft and logged */}
        {form.getFieldValue("mailboxType") === MailBoxType.OUTLOOK && (
          <>
            {loggedServer?.success &&
            loggedServer?.callBackName === "microsoft" ? (
              <SettingUpMail />
            ) : (
              <Button
                className="flex items-center mb-4"
                size="middle"
                icon={
                  <span className="flex items-center mr-2 text-[16px]">
                    <LogosMicrosoftWindows />
                  </span>
                }
                onClick={() => handleSignInSocial("microsoft")}
              >
                Sign In Microsoft Live Email
              </Button>
            )}
          </>
        )}

        {/* external mail */}
        {form.getFieldValue("mailboxType") === MailBoxType.OTHER && (
          <>
            <CardSettingExternalMail
              className="mb-6"
              title="Incoming Mail Configuration"
              typePort={TypePort.IMAP}
              nameForm="incoming"
              testConnection={() => {}}
            />

            <CardSettingExternalMail
              title="Outgoing Mail Configuration"
              nameForm="outgoing"
              typePort={TypePort.SMTP}
              testConnection={() => {}}
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default CardSelectEmail;
