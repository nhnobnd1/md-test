import { useMount, useToggle } from "@moose-desk/core";
import {
  AccessType,
  MailBoxType,
  MailSetting,
  MailSettingType,
} from "@moose-desk/repo";
import { Checkbox, Input, Radio } from "antd";
import { useCallback, useMemo } from "react";
import { Form, FormProps } from "src/components/UI/Form";
import { useSubdomain } from "src/hooks/useSubdomain";
import { CardSelectEmail } from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail";
import { useAppSelector } from "src/redux/hook";

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

  const signInCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        name: signInCallback.name || "",
        mailSettingType: MailSettingType.CUSTOM,
        mailboxType: MailBoxType.GMAIL,
        accessType: signInCallback.accessType || "",
        refKey: signInCallback.refKey || undefined,
        supportEmail: signInCallback.supportEmail || "",
        isLoggedServer: signInCallback.oauthStatus === "success",
        isPrimaryEmail: false,
      }
    );
  }, [props.initialValues, signInCallback]);

  useMount(() => {
    updateForm();
  });

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
          <Input
            disabled={
              !!signInCallback.name &&
              form.getFieldValue("mailboxType") !== MailBoxType.OTHER &&
              form.getFieldValue("mailSettingType") !== MailBoxType.MOOSEDESK
            }
          />
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
              (!!signInCallback.supportEmail &&
                form.getFieldValue("mailboxType") !== MailBoxType.OTHER) ||
              form.getFieldValue("mailSettingType") === MailBoxType.MOOSEDESK
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
