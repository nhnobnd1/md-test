import { useMount, useToggle } from "@moose-desk/core";
import { Checkbox, Input, Radio } from "antd";
import { useMemo } from "react";
import { Form, FormProps } from "src/components/UI/Form";
import { CardSelectEmail } from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail";

enum SELECT_SERVICE_EMAIL {
  YOUR_EMAIL = "YOUR_EMAIL",
  MOOSEDESK_EMAIL = "MOOSEDESK_EMAIL",
}

interface ChannelEmailFormProps extends FormProps {
  type: "new" | "update";
}

export const ChannelEmailForm = ({ ...props }: ChannelEmailFormProps) => {
  const [form] = Form.useForm(props.form);
  const { toggle: updateForm } = useToggle();

  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        emailService: SELECT_SERVICE_EMAIL.YOUR_EMAIL,
        mailServer: "externalEmail",
        isLoggedServer: false,
        imap: {
          serverName: "ABC",
        },
      }
    );
  }, [props.initialValues]);

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
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email Address">
          <Input />
        </Form.Item>
        <Form.Item name="emailService">
          <Radio.Group>
            <Radio value={SELECT_SERVICE_EMAIL.YOUR_EMAIL}>
              Use your email address
            </Radio>
            <Radio value={SELECT_SERVICE_EMAIL.MOOSEDESK_EMAIL}>
              Use Moosedesk email address
            </Radio>
          </Radio.Group>
        </Form.Item>
        <div>
          {form.getFieldValue("emailService") ===
            SELECT_SERVICE_EMAIL.YOUR_EMAIL && (
            <CardSelectEmail className="mb-4" type="new" form={form} />
          )}
          <div className="flex gap-8">
            <Form.Item name="maskEmail" valuePropName="checked">
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
