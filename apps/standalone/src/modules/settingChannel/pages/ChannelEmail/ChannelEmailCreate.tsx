import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import {
  CreateEmailIntegrationRequest,
  EmailIntegrationRepository,
  MailBoxType,
  MailSettingType,
} from "@moose-desk/repo";
import { Button } from "antd";
import { useCallback } from "react";
import { catchError, map } from "rxjs";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import {
  ChannelEmailForm,
  ValuesForm,
} from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";
import { useFormChannelEmail } from "src/modules/settingChannel/hook/useFormChannelEmail";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import { useAppSelector } from "src/redux/hook";

interface ChannelEmailCreateProps {}

const ChannelEmailCreate = (props: ChannelEmailCreateProps) => {
  const [form] = Form.useForm(undefined);
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const signCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  const { run: createMailAPI } = useJob(
    (payload: CreateEmailIntegrationRequest) => {
      message.loading.show("Creating new email");
      return EmailIntegrationRepository()
        .createEmailIntegration(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success("Create email successfully");
                navigate(
                  generatePath(SettingChannelRoutePaths.ChannelEmail.Index)
                );
              });
            } else {
              message.loading.hide().then(() => {
                message.loading.hide().then(() => {
                  notification.error("Create email failed");
                });
              });
            }
          }),
          catchError((err) => {
            if (err.response.data.statusCode === 409) {
              message.loading.hide().then(() => {
                notification.error(`${payload.supportEmail} is exist`);
              });
            }
            return err;
          })
        );
    }
  );

  const handleFinishForm = useCallback(
    (values: ValuesForm) => {
      if (values.mailSettingType === MailSettingType.CUSTOM) {
        if (values.mailboxType === MailBoxType.GMAIL) {
          createMail(values);
        } else if (values.mailboxType === MailBoxType.OUTLOOK) {
          createMail(values);
        } else {
          createMailExternal(values);
        }
      } else if (values.mailSettingType === MailSettingType.FORWARD) {
        console.log("hehe", values);
        createMailOther(values);
      } else {
        createMailMooseDesk(values);
      }
    },
    [signCallback]
  );

  const {
    payloadEmailGoogle,
    payloadMailExternal,
    payloadMailMooseDesk,
    payloadMailOther,
  } = useFormChannelEmail();

  const createMail = useCallback(
    (values: ValuesForm) => {
      createMailAPI(payloadEmailGoogle(values));
    },
    [signCallback]
  );

  const createMailExternal = useCallback(
    (values: ValuesForm) => {
      if (!!values.incoming && !!values.outgoing) {
        createMailAPI(payloadMailExternal(values as Required<ValuesForm>));
      }
    },
    [signCallback]
  );

  const createMailMooseDesk = useCallback((values: ValuesForm) => {
    createMailAPI(payloadMailMooseDesk(values));
  }, []);
  const createMailOther = useCallback((values: ValuesForm) => {
    createMailAPI(payloadMailOther(values));
  }, []);

  return (
    <>
      <Header
        className="mb-[40px]"
        title="Email Configuration"
        back
        backAction={() =>
          navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Index))
        }
      >
        <div className="flex-1 flex justify-end">
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        </div>
      </Header>

      <ChannelEmailForm form={form} type="new" onFinish={handleFinishForm} />
    </>
  );
};

export default ChannelEmailCreate;
