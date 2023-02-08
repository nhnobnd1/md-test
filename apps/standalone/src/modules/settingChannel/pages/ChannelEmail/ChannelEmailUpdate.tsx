import { generatePath, useJob, useNavigate, useParams } from "@moose-desk/core";
import {
  CreateEmailIntegrationRequest,
  EmailIntegration,
  EmailIntegrationRepository,
  MailBoxType,
  MailSettingType,
} from "@moose-desk/repo";
import { Button } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
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

interface ChannelEmailUpdateProps {}

const ChannelEmailUpdate = (props: ChannelEmailUpdateProps) => {
  const [form] = Form.useForm(undefined);
  const [email, setEmail] = useState<EmailIntegration>();
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const { id } = useParams();
  const signCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  const initialForm = useMemo(() => {
    console.log(email);
    return email
      ? {
          name: email.name,
          supportEmail: email.supportEmail || "",
          mailSettingType:
            email.mailboxType === MailBoxType.MOOSEDESK
              ? MailSettingType.MOOSEDESK
              : MailSettingType.CUSTOM,
          mailboxType: email.mailboxType,
          isPrimaryEmail: email.isPrimaryEmail,
        }
      : undefined;
  }, [email]);

  const { run: getChannelEmail } = useJob(
    (id: string) => {
      return EmailIntegrationRepository()
        .getOneEmail(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setEmail(data.data);
            } else {
              message.error("Get email failed");
            }
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const { run: updateEmailIntegration } = useJob(
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
          })
        );
    }
  );

  useEffect(() => {
    if (id) {
      getChannelEmail(id);
    }
  }, [id]);

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

  const { payloadEmailGoogle, payloadMailExternal, payloadMailMooseDesk } =
    useFormChannelEmail();

  const createMailGoogle = useCallback(
    (values: ValuesForm) => {
      updateEmailIntegration(payloadEmailGoogle(values));
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
        updateEmailIntegration(
          payloadMailExternal(values as Required<ValuesForm>)
        );
      }
    },
    [signCallback]
  );

  const createMailMooseDesk = useCallback((values: ValuesForm) => {
    updateEmailIntegration(payloadMailMooseDesk(values));
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
      {email && (
        <ChannelEmailForm
          form={form}
          initialValues={initialForm}
          type="update"
          onFinish={handleFinishForm}
        />
      )}
    </>
  );
};

export default ChannelEmailUpdate;
