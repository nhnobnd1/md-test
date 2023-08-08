import { useJob, useMount, useParams, useToggle } from "@moose-desk/core";
import {
  AccessType,
  EmailIntegrationRepository,
  MailBoxType,
  MailSetting,
  MailSettingType,
} from "@moose-desk/repo";
import { Checkbox, Radio, RadioChangeEvent, Tooltip } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import TextEditor from "src/components/UI/Editor/TextEditor";
import { Form, FormProps } from "src/components/UI/Form";
import { MDInput } from "src/components/UI/Input";
import useMessage from "src/hooks/useMessage";
import { useSubdomain } from "src/hooks/useSubdomain";
import { CardForwardEmail } from "src/modules/settingChannel/components/ChannelEmail/CardForwardEmail";
import {
  CardSelectEmail,
  CardSelectMailRefProperties,
} from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail";
import {
  initialState,
  setSignInCallback,
} from "src/modules/settingChannel/redux/channelEmail";
import useMailSetting from "src/modules/settingChannel/store/useMailSetting";
import { useAppDispatch, useAppSelector } from "src/redux/hook";

interface ChannelEmailFormProps extends FormProps {
  type: "new" | "update";
}

export interface ValuesForm {
  name: string;
  supportEmail: string;
  mailSettingType: MailSettingType;
  isPrimaryEmail: boolean;
  mailboxType: MailBoxType;
  accessType?: AccessType;
  deleteFromServer?: boolean;
  incoming?: MailSetting;
  outgoing?: MailSetting;
  signature?: string;
}

export interface IsLoggedServer {
  callBackName: "gmail" | "microsoft";
  success: boolean;
}

export const ChannelEmailForm = ({ type, ...props }: ChannelEmailFormProps) => {
  const [form] = Form.useForm(props.form);
  const { toggle: updateForm } = useToggle();
  const { getSubDomain } = useSubdomain();
  const cardSelectMail = useRef<CardSelectMailRefProperties>(null);
  const { id } = useParams();
  const [isLoggedServer, setIsLoggedServer] = useState<IsLoggedServer | null>(
    null
  );
  const { t } = useTranslation();
  const message = useMessage();
  const handleChangeMailSetting = useMailSetting((state) => state.changeUpdate);
  const mailSettingType = useMailSetting((state) => state.mailSettingType);
  const isForwardEmailCreated = useMailSetting(
    (state) => state.isForwardEmailCreated
  );
  const changeUpdateMooseDeskEmail = useMailSetting(
    (state) => state.changeUpdateMooseDeskEmail
  );

  const signInCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  const haveMooseDeskEmail = useMailSetting(
    (state) => state.haveMooseDeskEmail
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSignInCallback(initialState.signInCallback));
    };
  }, []);

  useEffect(() => {
    if (signInCallback.callbackName && signInCallback.oauthStatus) {
      setIsLoggedServer({
        callBackName: signInCallback.callbackName,
        success: signInCallback.oauthStatus === "success",
      });
    }
  }, [signInCallback]);

  useEffect(() => {
    if (type === "update" && props.initialValues?.mailboxType) {
      const mailBoxType = props.initialValues.mailboxType;
      if ([MailBoxType.GMAIL, MailBoxType.OUTLOOK].includes(mailBoxType)) {
        setIsLoggedServer({
          callBackName:
            mailBoxType === MailBoxType.GMAIL ? "gmail" : "microsoft",
          success: true,
        });
      }
    }
  }, [props.initialValues]);

  const initialValues = useMemo(() => {
    return props.initialValues
      ? {
          ...props.initialValues,
        }
      : {
          name: signInCallback.name || (getSubDomain() as string).toLowerCase(),
          mailSettingType: MailSettingType.CUSTOM,
          mailboxType: MailBoxType.GMAIL,
          accessType: AccessType.Both,
          refKey: signInCallback.refKey || undefined,
          supportEmail: signInCallback.supportEmail || "",
          isPrimaryEmail: false,
          deleteFromServer: false,
          signature: "",
        };
  }, [props.initialValues, signInCallback]);

  useMount(() => {
    updateForm();
  });

  const handleFormChange = useCallback(
    (changedValue: any, values: any) => {
      props.onValuesChange && props.onValuesChange(changedValue, values);
      if (changedValue.incoming) {
        cardSelectMail.current?.resetConnectionImap();
      }

      if (changedValue.outgoing) {
        cardSelectMail.current?.resetConnectionSmtp();
      }

      if (changedValue.mailSettingType) {
        if (changedValue.mailSettingType === MailSettingType.MOOSEDESK) {
          const supportEmailDefault =
            import.meta.env.MODE === "production"
              ? `${getSubDomain()}@email.moosedesk.com`
              : `${getSubDomain()}@email.moosedesk.net`;
          // form.setFieldValue("name", "");
          form.setFieldValue("supportEmail", supportEmailDefault);
        } else if (changedValue.mailSettingType === MailSettingType.FORWARD) {
          form.setFieldValue(
            "supportEmail",
            props.initialValues?.mailboxType === MailBoxType.OTHER
              ? props.initialValues?.supportEmail
              : ""
          );
        } else {
          if (type === "new") {
            form.setFieldValue("name", signInCallback.name);
            form.setFieldValue("supportEmail", signInCallback.supportEmail);
          } else if (type === "update") {
            form.setFieldValue("name", props.initialValues?.name ?? "");
            form.setFieldValue(
              "supportEmail",
              props.initialValues?.mailboxType === MailBoxType.GMAIL
                ? props.initialValues?.supportEmail
                : ""
            );
          }
        }
      }

      if (changedValue.mailboxType) {
        if (
          (changedValue.mailboxType === MailBoxType.GMAIL &&
            isLoggedServer?.callBackName === "gmail") ||
          (changedValue.mailboxType === MailBoxType.OUTLOOK &&
            isLoggedServer?.callBackName === "microsoft")
        ) {
          if (signInCallback.callbackName === isLoggedServer.callBackName) {
            form.setFieldValue("name", signInCallback.name);
            form.setFieldValue("supportEmail", signInCallback.supportEmail);
          } else {
            form.setFieldValue("name", props.initialValues?.name ?? "");
            form.setFieldValue(
              "supportEmail",
              props.initialValues?.supportEmail ?? ""
            );
            form.validateFields();
          }
        }
      }

      if (changedValue?.incoming && values.mailboxType === MailBoxType.OTHER) {
        form.setFieldValue("supportEmail", changedValue?.incoming?.email ?? "");
      }
      updateForm();
    },

    [signInCallback, props.initialValues]
  );

  const isHidden = useMemo(() => {
    if (type === "new") {
      if (mailSettingType !== MailSettingType.MOOSEDESK) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }, [mailSettingType, type]);
  const { run: getListEmailApi } = useJob((payload: any) => {
    return EmailIntegrationRepository()
      .getListEmail(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            changeUpdateMooseDeskEmail(
              (data.metadata as any)?.moosedeskEmailExists
            );
          }
        }),
        catchError((err) => {
          message.error(t("messages:error.something_went_wrong"));
          return of(err);
        })
      );
  });

  useEffect(() => {
    if (!haveMooseDeskEmail) {
      getListEmailApi({ page: 1, limit: 10 });
    }
  }, [haveMooseDeskEmail]);

  useEffect(() => {
    if (form.getFieldValue("mailSettingType") === MailSettingType.CUSTOM) {
      form.setFieldValue("mailboxType", MailBoxType.GMAIL);
    }
  }, [form.getFieldValue("mailSettingType")]);
  return (
    <Form
      {...props}
      form={form}
      initialValues={initialValues}
      enableReinitialize
      onValuesChange={handleFormChange}
      layout="vertical"
    >
      <div className="md:w-[90%] lg:w-[80%]">
        <Form.Item name="mailSettingType">
          <Radio.Group
            onChange={(e: RadioChangeEvent) => {
              handleChangeMailSetting(e.target.value);
            }}
            disabled={!!id || !!signInCallback.refKey || isForwardEmailCreated}
          >
            <Radio value={MailSettingType.CUSTOM}>Use your Gmail</Radio>
            <Tooltip
              title={`${
                haveMooseDeskEmail ? "Email has been set up in the system" : ""
              }`}
            >
              <Radio
                disabled={
                  haveMooseDeskEmail ||
                  !!id ||
                  !!signInCallback.refKey ||
                  isForwardEmailCreated
                }
                value={MailSettingType.MOOSEDESK}
              >
                Use Moosedesk email address
              </Radio>
            </Tooltip>
            <Radio value={MailSettingType.FORWARD}>Email Forwarding</Radio>
          </Radio.Group>
        </Form.Item>
        <div className={`${isHidden ? "hidden" : ""}`}>
          <Form.Item name="name" label="Name">
            <MDInput />
          </Form.Item>
          <Form.Item
            name="supportEmail"
            label="Email Address"
            rules={[
              {
                required: true,
                message: "Email address is required",
              },
              {
                type: "email",
                message: "The email address is not valid",
              },
            ]}
          >
            <MDInput disabled={true} />
          </Form.Item>
        </div>

        {/* form bot */}
        <div>
          {form.getFieldValue("mailSettingType") === MailSettingType.CUSTOM && (
            <CardSelectEmail
              ref={cardSelectMail}
              loggedServer={isLoggedServer}
              className="mb-4"
              type={type}
              form={form}
            />
          )}
          {form.getFieldValue("mailSettingType") ===
            MailSettingType.FORWARD && <CardForwardEmail formEmail={form} />}

          <div className="flex gap-8">
            <Form.Item name="isPrimaryEmail" valuePropName="checked">
              <Checkbox>Mark as Primary Email</Checkbox>
            </Form.Item>
          </div>
          <Form.Item name="signature" label="Signature">
            <TextEditor
              form={form}
              init={{
                menubar: false,
                height: 400,
                toolbar:
                  "undo redo blocks fontfamily fontsizeinput bold italic underline strikethrough link image media table mergetags addcomment showcomments spellcheckdialog a11ycheck typography align lineheight ",
              }}
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default React.memo(ChannelEmailForm);
