import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import {
  CreateEmailIntegrationRequest,
  EmailIntegrationRepository,
  MailBoxType,
  MailSettingType,
} from "@moose-desk/repo";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { ContextualSaveBar } from "src/components/ContextualSaveBar";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { useSubdomain } from "src/hooks/useSubdomain";
import useUpdated from "src/hooks/useUpdated";
import {
  ChannelEmailForm,
  ValuesForm,
} from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";
import { useFormChannelEmail } from "src/modules/settingChannel/hook/useFormChannelEmail";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import useMailSetting from "src/modules/settingChannel/store/useMailSetting";
import { useAppSelector } from "src/redux/hook";

const ChannelEmailCreate = () => {
  const [form] = Form.useForm(undefined);
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const { t } = useTranslation();
  const { getSubDomain } = useSubdomain();
  const isForwardEmailCreated = useMailSetting(
    (state) => state.isForwardEmailCreated
  );

  const signCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );
  const { isUpdated, setUpdated } = useUpdated();

  const { run: createMailAPI } = useJob(
    (payload: CreateEmailIntegrationRequest) => {
      message.loading.show(t("messages:loading.creating_email"));

      return EmailIntegrationRepository()
        .createEmailIntegration(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              sessionStorage.setItem("gmail_id", data.data._id);
              message.loading.hide().then(() => {
                notification.success(t("messages:success.create_email"));
              });
              navigate(
                generatePath(SettingChannelRoutePaths.ChannelEmail.Update, {
                  id: data.data._id,
                })
              );
            } else {
              message.loading.hide().then(() => {
                message.loading.hide().then(() => {
                  notification.error(t("messages:error.create_email"));
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
            message.loading.hide().then(() => {
              notification.error(t("messages:error.something_went_wrong"));
            });
            return of(err);
          })
        );
    }
  );

  const { run: updateEmailIntegration } = useJob(
    (payload: CreateEmailIntegrationRequest) => {
      message.loading.show(t("messages:loading.updating_email"));
      return EmailIntegrationRepository()
        .updateEmailIntegration(sessionStorage.getItem("gmail_id"), payload)
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
                notification.error(`${payload.supportEmail} is exist`);
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
  const updateMailGoogle = useCallback(
    (values: ValuesForm) => {
      updateEmailIntegration(payloadEmailGoogle(values));
    },
    [signCallback]
  );

  const handleFinishForm = useCallback(
    (values: ValuesForm) => {
      if (values.name === "") {
        values.name = (getSubDomain() as string).toLowerCase();
      }

      switch (values.mailSettingType) {
        case MailSettingType.CUSTOM:
          if (values.mailboxType === MailBoxType.GMAIL) {
            updateMailGoogle(values);
          } else {
            createMailExternal(values);
          }
          break;
        case MailSettingType.FORWARD:
          updateEmailIntegration({
            isPrimaryEmail: values.isPrimaryEmail,
            mailboxConfig: { forwardEmail: values.supportEmail },
            mailboxType: MailBoxType.OTHER,
            name: values.name,
            signature: values.signature || "",
            supportEmail: values.supportEmail,
          });
          break;
        default:
          createMailMooseDesk(values);
          break;
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
  useEffect(() => {
    if (signCallback?.refKey) {
      setTimeout(() => {
        createMail(form.getFieldsValue());
      }, 100);
    }
  }, [signCallback]);

  useEffect(() => {
    if (isForwardEmailCreated) {
      createMailOther({
        ...form.getFieldsValue(),
        name:
          sessionStorage.getItem("forward_email_name") ||
          (getSubDomain() as string).toLowerCase(),
      });
    }
  }, [isForwardEmailCreated]);

  const createMailMooseDesk = useCallback((values: ValuesForm) => {
    createMailAPI(payloadMailMooseDesk(values));
  }, []);
  const createMailOther = useCallback((values: ValuesForm) => {
    createMailAPI(payloadMailOther(values));
  }, []);

  const handleBack = () =>
    navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Index));

  useEffect(() => {
    if (form.getFieldValue("supportEmail")) {
      setUpdated(true);
    }
    return () => {
      setUpdated(false);
    };
  }, [form.getFieldValue("supportEmail")]);

  return (
    <>
      <Header
        className="xs:h-[32px] md:h-[40px] mb-5 md:w-[90%] lg:w-[80%]"
        title="Email Configuration"
        back
        backAction={handleBack}
      ></Header>

      <ChannelEmailForm form={form} type="new" onFinish={handleFinishForm} />
      {isUpdated && <ContextualSaveBar onSave={() => form.submit()} />}
    </>
  );
};

export default ChannelEmailCreate;
