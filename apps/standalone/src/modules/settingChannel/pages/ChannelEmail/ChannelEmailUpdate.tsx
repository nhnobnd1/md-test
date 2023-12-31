import {
  generatePath,
  useJob,
  useNavigate,
  useParams,
  useToggle,
} from "@moose-desk/core";
import {
  AccessType,
  CreateEmailIntegrationRequest,
  EmailIntegration,
  EmailIntegrationRepository,
  MailBoxConfig,
  MailBoxType,
  MailSettingType,
} from "@moose-desk/repo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { ContextualSaveBar } from "src/components/ContextualSaveBar";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import useUpdated from "src/hooks/useUpdated";
import {
  ChannelEmailForm,
  ValuesForm,
} from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";
import { useFormChannelEmail } from "src/modules/settingChannel/hook/useFormChannelEmail";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import { useAppSelector } from "src/redux/hook";

const ChannelEmailUpdate = () => {
  const [form] = Form.useForm(undefined);
  const [email, setEmail] = useState<EmailIntegration>();
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const { id } = useParams();
  const { t } = useTranslation();
  // const resetCreateTicket = useFormCreateTicket((state) => state.resetState);
  const { toggle: updateForm } = useToggle();
  const signCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  const { isUpdated, setUpdated } = useUpdated();

  const initialForm = useMemo(() => {
    if (email && email.mailboxType) {
      const mailBoxConfig = email.mailboxConfig as MailBoxConfig;
      switch (email.mailboxType) {
        case MailBoxType.GMAIL:
          return {
            name: email.name,
            supportEmail: email.supportEmail || "",
            mailSettingType: MailSettingType.CUSTOM,
            mailboxType: email.mailboxType,
            isPrimaryEmail: email.isPrimaryEmail,
            accessType: AccessType.Both,
            deleteFromServer: mailBoxConfig.incoming.deleteFromServer,
            isLive: email.isLive,
            signature: email.signature,
          };

        case MailBoxType.MOOSEDESK:
          return {
            name: email.name,
            supportEmail: email.supportEmail || "",
            mailSettingType: MailSettingType.MOOSEDESK,
            mailboxType: email.mailboxType,
            isPrimaryEmail: email.isPrimaryEmail,
            signature: email.signature,
          };

        case MailBoxType.OTHER:
          return {
            name: email.name,
            supportEmail: email.supportEmail || "",
            mailSettingType: MailSettingType.FORWARD,
            mailboxType: email.mailboxType,
            isPrimaryEmail: email.isPrimaryEmail,
            incoming: mailBoxConfig.incoming,
            outgoing: mailBoxConfig.outgoing,
            signature: email.signature,
          };

        default:
          break;
      }
    } else {
      return undefined;
    }
  }, [email, signCallback]);

  const { run: getChannelEmail } = useJob(
    (id: string) => {
      return EmailIntegrationRepository()
        .getOneEmail(id)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setEmail(data.data);
            } else {
              message.error(t("messages:error.get_email"));
            }
          }),
          catchError((err) => {
            navigate("/404");
            message.error(t("messages:error.get_email"));

            return of(err);
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const { run: updateEmailIntegration } = useJob(
    (payload: CreateEmailIntegrationRequest) => {
      message.loading.show(t("messages:loading.updating_email"));

      return EmailIntegrationRepository()
        .updateEmailIntegration(id, payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              message.loading.hide().then(() => {
                notification.success(t("messages:success.update_email"));
                navigate(
                  generatePath(SettingChannelRoutePaths.ChannelEmail.Index)
                );
              });
            } else {
              message.loading.hide().then(() => {
                message.loading.hide().then(() => {
                  notification.error(t("messages:error.update_email"));
                });
              });
            }
          }),
          catchError((err) => {
            if (err.response.data.statusCode === 400) {
              message.loading.hide().then(() => {
                notification.error(err?.response?.data?.error[0]);
              });
              return of(err);
            }
            if (err.response.data.statusCode === 409) {
              message.loading.hide().then(() => {
                notification.error(`${payload.supportEmail} is exist`);
              });
              return of(err);
            }
            message.loading.hide().then(() => {
              notification.error(t("messages:error.something_went_wrong"));
            });
            return of(err);
          })
        );
    },
    {
      showLoading: true,
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
          updateMailGoogle(values);
        } else if (values.mailboxType === MailBoxType.OUTLOOK) {
          updateMailGoogle(values);
        } else {
          updateMailExternal(values);
        }
      } else if (values.mailSettingType === MailSettingType.FORWARD) {
        createMailOther(values);
      } else {
        createMailMooseDesk(values);
      }
      // resetCreateTicket();
    },
    [signCallback]
  );

  const {
    payloadEmailGoogle,
    payloadMailExternal,
    payloadMailMooseDesk,
    payloadMailOther,
  } = useFormChannelEmail();

  const updateMailGoogle = useCallback(
    (values: ValuesForm) => {
      updateEmailIntegration(payloadEmailGoogle(values));
    },
    [signCallback]
  );

  const updateMailExternal = useCallback(
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
  const createMailOther = useCallback((values: ValuesForm) => {
    updateEmailIntegration(payloadMailOther(values));
  }, []);

  const handleBack = () =>
    navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Index));
  useEffect(() => {
    setUpdated(true);

    return () => {
      setUpdated(false);
    };
  }, []);

  return (
    <>
      <Header
        className="xs:h-[32px] md:h-[40px] mb-5 md:w-[90%] lg:w-[80%]"
        title="Email Configuration"
        back
        backAction={handleBack}
      ></Header>
      {email && (
        <ChannelEmailForm
          form={form}
          initialValues={initialForm}
          type="update"
          onValuesChange={updateForm}
          onFinish={handleFinishForm}
        />
      )}
      {isUpdated && <ContextualSaveBar onSave={() => form.submit()} />}
    </>
  );
};

export default ChannelEmailUpdate;
