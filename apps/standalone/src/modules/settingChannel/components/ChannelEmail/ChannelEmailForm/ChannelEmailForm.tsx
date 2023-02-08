import { useLocation, useMount, useToggle } from "@moose-desk/core";
import {
  AccessType,
  MailBoxType,
  MailSetting,
  MailSettingType,
} from "@moose-desk/repo";
import { Checkbox, Input, Radio } from "antd";
import { useCallback, useEffect, useMemo } from "react";
import { Form, FormProps } from "src/components/UI/Form";
import { useSubdomain } from "src/hooks/useSubdomain";
import { CardSelectEmail } from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail";
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

export const ChannelEmailForm = ({ type, ...props }: ChannelEmailFormProps) => {
  const [form] = Form.useForm(props.form);
  const { toggle: updateForm } = useToggle();
  const { getSubDomain } = useSubdomain();
  const { state } = useLocation();

  const signInCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSignInCallback(initialState.signInCallback));
    };
  }, []);

  const mailBoxType = useMemo(() => {
    return form.getFieldValue("mailboxType");
  }, [form.getFieldValue("mailboxType")]);

  const mailSettingType = useMemo(() => {
    return form.getFieldValue("mailSettingType");
  }, [form.getFieldValue("mailSettingType")]);

  const checkLoggedInServer = useMemo(() => {
    if (mailBoxType === MailBoxType.GMAIL) {
      return (
        signInCallback.oauthStatus === "success" &&
        signInCallback.callbackName === "gmail"
      );
    } else if (mailBoxType === MailBoxType.OUTLOOK) {
      return (
        signInCallback.oauthStatus === "success" &&
        signInCallback.callbackName === "microsoft"
      );
    } else {
      return false;
    }
  }, [signInCallback, mailBoxType]);

  useEffect(() => {
    form.setFieldValue("isLoggedServer", checkLoggedInServer);
  }, [checkLoggedInServer]);

  const initialValues = useMemo(() => {
    return props.initialValues
      ? {
          ...props.initialValues,
        }
      : {
          name: signInCallback.name || "",
          mailSettingType: MailSettingType.CUSTOM,
          mailboxType: MailBoxType.GMAIL,
          accessType: signInCallback.accessType || "",
          refKey: signInCallback.refKey || undefined,
          supportEmail: signInCallback.supportEmail || "",
          isLoggedServer: false,
          isPrimaryEmail: false,
        };
  }, [props.initialValues, signInCallback]);

  useMount(() => {
    updateForm();
  });

  const isDisabledInput = useCallback(() => {
    const signedEmailState =
      mailBoxType === MailBoxType.GMAIL &&
      signInCallback.callbackName === "gmail";

    const signedMicrosoftState =
      mailBoxType === MailBoxType.OUTLOOK &&
      signInCallback.callbackName === "microsoft";

    if (mailSettingType === MailBoxType.MOOSEDESK) {
      return false;
    } else {
      return signedEmailState || signedMicrosoftState;
    }
  }, [mailBoxType, mailSettingType, signInCallback]);

  const handleFormChange = useCallback(
    (changedValue: any) => {
      if (changedValue.mailSettingType) {
        if (changedValue.mailSettingType === MailSettingType.MOOSEDESK) {
          form.setFieldValue("name", "");
          form.setFieldValue(
            "supportEmail",
            `${getSubDomain()}@email.moosedesk.net`
          );
        } else {
          form.setFieldValue("name", signInCallback.name);
          form.setFieldValue("supportEmail", signInCallback.supportEmail);
        }
      }

      if (changedValue.mailboxType) {
        if (
          (changedValue.mailboxType === MailBoxType.GMAIL &&
            signInCallback.callbackName === "gmail") ||
          (changedValue.mailboxType === MailBoxType.OUTLOOK &&
            signInCallback.callbackName === "microsoft")
        ) {
          form.setFieldValue("name", signInCallback.name);
          form.setFieldValue("supportEmail", signInCallback.supportEmail);
        } else {
          form.setFieldValue("name", "");
          form.setFieldValue("supportEmail", "");
        }
      }
      updateForm();
    },

    [signInCallback]
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
              message: "Please enter your name",
            },
            {
              max: 255,
              type: "string",
              message: "Your name up to 255 characters",
            },
          ]}
        >
          <Input disabled={!!signInCallback.name && isDisabledInput()} />
        </Form.Item>
        <Form.Item
          name="supportEmail"
          label="Email Address"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            {
              type: "email",
              message: "Email is invalid",
            },
          ]}
        >
          <Input
            disabled={
              (!!signInCallback.supportEmail && isDisabledInput()) ||
              mailSettingType === MailSettingType.MOOSEDESK
            }
          />
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
            <CardSelectEmail className="mb-4" type={type} form={form} />
          )}

          <div className="flex gap-8">
            <Form.Item name="isPrimaryEmail" valuePropName="checked">
              <Checkbox>Mask as Primary Email</Checkbox>
            </Form.Item>
            {form.getFieldValue("mailboxType") === MailBoxType.OTHER && (
              <Form.Item name="deleteFetching" valuePropName="checked">
                <Checkbox>Delete from server after fetching?</Checkbox>
              </Form.Item>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ChannelEmailForm;
