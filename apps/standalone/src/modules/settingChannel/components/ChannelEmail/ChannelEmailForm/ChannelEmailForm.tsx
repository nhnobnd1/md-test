import { useLocation, useMount, useToggle } from "@moose-desk/core";
import {
  AccessType,
  MailBoxType,
  MailSetting,
  MailSettingType,
} from "@moose-desk/repo";
import { Checkbox, Input, Radio } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Form, FormProps } from "src/components/UI/Form";
import { useSubdomain } from "src/hooks/useSubdomain";
import {
  CardSelectEmail,
  CardSelectMailRefProperties,
} from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail";
import {
  initialState,
  setSignInCallback,
} from "src/modules/settingChannel/redux/channelEmail";
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
  const { state } = useLocation();
  const [isLoggedServer, setIsLoggedServer] = useState<IsLoggedServer | null>(
    null
  );

  const signInCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
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

  const mailBoxType = useMemo(() => {
    return form.getFieldValue("mailboxType");
  }, [form.getFieldValue("mailboxType")]);

  const mailSettingType = useMemo(() => {
    return form.getFieldValue("mailSettingType");
  }, [form.getFieldValue("mailSettingType")]);

  const initialValues = useMemo(() => {
    return props.initialValues
      ? {
          ...props.initialValues,
        }
      : {
          name: signInCallback.name || "",
          mailSettingType: MailSettingType.CUSTOM,
          mailboxType:
            signInCallback.callbackName &&
            signInCallback.callbackName === "microsoft"
              ? MailBoxType.OUTLOOK
              : MailBoxType.GMAIL,
          accessType: signInCallback.accessType || "",
          refKey: signInCallback.refKey || undefined,
          supportEmail: signInCallback.supportEmail || "",
          isPrimaryEmail: false,
          deleteFromServer: false,
        };
  }, [props.initialValues, signInCallback]);

  useMount(() => {
    updateForm();
  });

  const isDisabledInput = useCallback(() => {
    const signedEmailState =
      mailBoxType === MailBoxType.GMAIL &&
      isLoggedServer?.callBackName === "gmail";

    const signedMicrosoftState =
      mailBoxType === MailBoxType.OUTLOOK &&
      isLoggedServer?.callBackName === "microsoft";

    if (mailSettingType === MailBoxType.MOOSEDESK) {
      return false;
    } else {
      return signedEmailState || signedMicrosoftState;
    }
  }, [mailBoxType, mailSettingType, signInCallback]);

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
          form.setFieldValue("name", "");
          form.setFieldValue(
            "supportEmail",
            `support@${getSubDomain()}.moosedesk.com`
          );
        } else {
          form.setFieldValue("name", signInCallback.name);
          form.setFieldValue("supportEmail", signInCallback.supportEmail);
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

  return (
    <Form
      {...props}
      form={form}
      initialValues={initialValues}
      enableReinitialize
      onValuesChange={handleFormChange}
      layout="vertical"
    >
      <div className="md:w-[70%] lg:w-[70%]">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Name is required",
            },
            {
              max: 255,
              type: "string",
              message: "Name up to 255 characters",
            },
          ]}
        >
          <Input disabled={isDisabledInput() && isLoggedServer?.success} />
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
          <Input disabled={true} />
        </Form.Item>
        <Form.Item name="mailSettingType">
          <Radio.Group>
            <Radio value={MailSettingType.CUSTOM}>Use your email address</Radio>
            <Radio value={MailSettingType.MOOSEDESK}>
              Use Moosedesk email address
            </Radio>
          </Radio.Group>
        </Form.Item>

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

          <div className="flex gap-8">
            <Form.Item name="isPrimaryEmail" valuePropName="checked">
              <Checkbox>Mask as Primary Email</Checkbox>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ChannelEmailForm;
