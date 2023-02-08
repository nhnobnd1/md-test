import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import {
  AccessType,
  CreateEmailIntegrationRequest,
  EmailIntegrationRepository,
  MailBoxType,
  MailSettingType,
} from "@moose-desk/repo";
import { Button } from "antd";
import { useCallback, useRef } from "react";
import { map } from "rxjs";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import {
  ChannelEmailForm,
  ValuesForm,
} from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";
import {
  settingIncoming,
  settingOutgoing,
} from "src/modules/settingChannel/constant/setting";
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

  const formRef = useRef<{ submit: () => void }>(null);

  const { run: createMailAPI } = useJob(
    (payload: CreateEmailIntegrationRequest) => {
      message.loading.show("Creating new email");
      return EmailIntegrationRepository()
        .CreateEmailIntegration(payload)
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
          })
        );
    }
  );

  const handleFinishForm = useCallback(
    (values: ValuesForm) => {
      if (values.mailSettingType === MailSettingType.CUSTOM) {
        if (values.mailboxType === MailBoxType.GMAIL) {
          createMailGoogle(values);
        } else if (values.mailboxType === MailBoxType.OUTLOOK) {
          createMailOutLook(values);
        } else {
          createMailExternal(values);
        }
      } else {
        createMailMooseDesk(values);
      }
    },
    [signCallback]
  );

  const getSettingIncomingMail = useCallback(
    (values: ValuesForm) => {
      return {
        port: settingIncoming.port,
        mailServer: settingIncoming.mailServer,
        authentication: settingIncoming.authentication,
        useSsl: settingIncoming.useSsl,
        email: values.supportEmail,
        password: "",
        deleteFromServer: !!values.deleteFromServer,
      };
    },
    [settingIncoming]
  );

  const getSettingOutGoingMail = useCallback((values: ValuesForm) => {
    return {
      port: settingOutgoing.port,
      mailServer: settingOutgoing.mailServer,
      authentication: settingOutgoing.authentication,
      useSsl: settingOutgoing.useSsl,
      email: values.supportEmail,
      password: "",
    };
  }, []);

  const createMailGoogle = useCallback(
    (values: ValuesForm) => {
      const payload: CreateEmailIntegrationRequest = {
        name: values.name,
        supportEmail: values.supportEmail,
        isPrimaryEmail: values.isPrimaryEmail,
        mailboxType: values.mailboxType,
        mailboxConfig: {
          accessType: values.accessType ?? AccessType.Both,
          refKey: signCallback.refKey,
          incoming: getSettingIncomingMail(values),
          outgoing: getSettingOutGoingMail(values),
        },
      };

      createMailAPI(payload);
    },
    [signCallback]
  );

  const createMailOutLook = useCallback(
    (values: ValuesForm) => {},
    [signCallback]
  );

  const createMailExternal = useCallback(
    (values: ValuesForm) => {
      if (!!values.incoming && !!values.outgoing) {
        const payload: CreateEmailIntegrationRequest = {
          name: values.name,
          isPrimaryEmail: values.isPrimaryEmail,
          supportEmail: values.supportEmail,
          mailboxType: values.mailboxType,
          mailboxConfig: {
            incoming: values.incoming,
            outgoing: values.outgoing,
          },
        };
        createMailAPI(payload);
      }
    },
    [signCallback]
  );

  const createMailMooseDesk = useCallback((values: ValuesForm) => {
    const payload: CreateEmailIntegrationRequest = {
      name: values.name,
      supportEmail: values.supportEmail,
      isPrimaryEmail: values.isPrimaryEmail,
      mailboxType: MailBoxType.MOOSEDESK,
      mailboxConfig: {
        forwardEmail: values.supportEmail,
      },
    };
    createMailAPI(payload);
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
