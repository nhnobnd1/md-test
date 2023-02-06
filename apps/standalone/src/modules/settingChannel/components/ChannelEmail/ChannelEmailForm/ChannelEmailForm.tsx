import { useMount, useToggle } from "@moose-desk/core";
import { MailBoxType } from "@moose-desk/repo";
import { Checkbox, Input, Radio } from "antd";
import { useMemo } from "react";
import { Form, FormProps } from "src/components/UI/Form";
import { CardSelectEmail } from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail";
import { useAppSelector } from "src/redux/hook";

interface ChannelEmailFormProps extends FormProps {
  type: "new" | "update";
}

export enum MailServer {
  Gmail = "Gmail",
  Microsoft = "Microsoft",
  ExternalEmail = "ExternalEmail",
}

export const ChannelEmailForm = ({ type, ...props }: ChannelEmailFormProps) => {
  const [form] = Form.useForm(props.form);
  const { toggle: updateForm } = useToggle();

  const signInCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );
  console.log(signInCallback);
  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        name: signInCallback.name || "",
        mailboxType: MailBoxType.CUSTOM,
        accessType: signInCallback.accessType || "",
        refKey: signInCallback.refKey || undefined,
        supportEmail: signInCallback.supportEmail || "",
        mailServer: MailServer.Gmail,
        isLoggedServer: false,
        imap: {
          serverName: "ABC",
        },
      }
    );
  }, [props.initialValues, signInCallback]);

  useMount(() => {
    updateForm();
  });

  return (
    <Form
      {...props}
      form={form}
      initialValues={initialValues}
      enableReinitialize
      onValuesChange={updateForm}
      layout="vertical"
    >
      <div className="md:w-[70%] lg:w-[70%]">
        <Form.Item name="name" label="Name">
          <Input
            disabled={
              !!signInCallback.name &&
              form.getFieldValue("mailServer") !== MailServer.ExternalEmail
            }
          />
        </Form.Item>
        <Form.Item name="supportEmail" label="Email Address">
          <Input
            disabled={
              !!signInCallback.supportEmail &&
              form.getFieldValue("mailServer") !== MailServer.ExternalEmail
            }
          />
        </Form.Item>
        <Form.Item name="mailboxType">
          <Radio.Group>
            <Radio value={MailBoxType.CUSTOM}>Use your email address</Radio>
            <Radio value={MailBoxType.MOOSEDESK}>
              Use Moosedesk email address
            </Radio>
          </Radio.Group>
        </Form.Item>

        {/* form bot */}
        <div>
          {form.getFieldValue("mailboxType") === MailBoxType.CUSTOM && (
            <CardSelectEmail className="mb-4" type={type} form={form} />
          )}

          <div className="flex gap-8">
            <Form.Item name="isPrimaryEmail" valuePropName="checked">
              <Checkbox>Mask as Primary Email</Checkbox>
            </Form.Item>
            {form.getFieldValue("mailServer") === "externalEmail" && (
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
