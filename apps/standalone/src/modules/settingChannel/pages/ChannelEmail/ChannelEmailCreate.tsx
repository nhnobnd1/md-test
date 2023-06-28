import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import {
  CreateEmailIntegrationRequest,
  EmailIntegrationRepository,
  MailBoxType,
  MailSettingType,
} from "@moose-desk/repo";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map } from "rxjs";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { useSubdomain } from "src/hooks/useSubdomain";
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
  const mailSettingType = useMailSetting((state) => state.mailSettingType);
  const isForwardEmailCreated = useMailSetting(
    (state) => state.isForwardEmailCreated
  );

  const signCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

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
            } else {
              message.loading.hide().then(() => {
                message.loading.hide().then(() => {
                  notification.error(t("messages:error.create_email"));
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
            if (err.response.data.statusCode === 409) {
              message.loading.hide().then(() => {
                notification.error(`${payload.supportEmail} is exist`);
              });
            }
            return err;
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
      // if (values.mailSettingType === MailSettingType.CUSTOM) {
      //   if (values.mailboxType === MailBoxType.GMAIL) {
      //     createMail(values);
      //   }
      //   // else if (values.mailboxType === MailBoxType.OUTLOOK) {
      //   //   createMail(values);
      //   // }
      //   else {
      //     createMailExternal(values);
      //   }
      // } else if (values.mailSettingType === MailSettingType.FORWARD) {
      //   createMailOther(values);
      // } else {
      //   createMailMooseDesk(values);
      // }
      switch (values.mailSettingType) {
        case MailSettingType.CUSTOM:
          if (values.mailboxType === MailBoxType.GMAIL) {
            updateMailGoogle(values);
          } else {
            createMailExternal(values);
          }
          break;
        case MailSettingType.FORWARD:
          createMailOther(values);
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
  const handleSubmit = () => form.submit();
  const handleBack = () =>
    navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Index));
  return (
    <>
      <Header
        className="xs:h-[32px] md:h-[40px] mb-5 "
        title="Email Configuration"
        back
        backAction={handleBack}
      >
        <div className="flex-1 flex justify-end">
          <MDButton
            className={
              mailSettingType === MailSettingType.FORWARD
                ? "opacity-0 pointer-events-none"
                : ""
            }
            type="primary"
            onClick={handleSubmit}
            disabled={
              mailSettingType === MailSettingType.CUSTOM &&
              signCallback?.refKey === ""
            }
          >
            Save
          </MDButton>
        </div>
      </Header>

      <ChannelEmailForm form={form} type="new" onFinish={handleFinishForm} />
    </>
  );
};

export default ChannelEmailCreate;
