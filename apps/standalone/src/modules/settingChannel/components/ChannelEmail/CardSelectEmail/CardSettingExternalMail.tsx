import { AuthenticationSMTP } from "@moose-desk/repo";
import { Card, Checkbox, Input, InputNumber } from "antd";
import { Form } from "src/components/UI/Form";
import Select, { OptionType } from "src/components/UI/Select/Select";

export enum TypePort {
  IMAP = "IMAP",
  SMTP = "SMTP",
}

interface CardSettingExternalMailProps {
  title: string;
  className?: string;
  value?: any;
  nameForm: string;
  onChange?: (values: any) => void;
  testConnection: () => void;
  typePort: TypePort;
}

export const CardSettingExternalMail = ({
  title,
  className,
  nameForm,
  typePort,
  testConnection,
}: CardSettingExternalMailProps) => {
  const options: OptionType[] = [
    {
      label: "Plain",
      value: AuthenticationSMTP.Plain,
    },
    {
      label: "Login",
      value: AuthenticationSMTP.Login,
    },
    {
      label: "CRAM - MD5",
      value: AuthenticationSMTP.MD5,
    },
  ];

  return (
    <>
      <Card className={className} type="inner" title={title}>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            className="col-span-2"
            label="Server"
            name={[nameForm, "mailServer"]}
            rules={[
              { required: true, message: "Please enter mail server" },
              {
                type: "email",
                message: "Server is invalid",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={`${typePort} Port`} name={[nameForm, "port"]}>
            <InputNumber className="w-full" />
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {typePort === TypePort.IMAP && (
            <Form.Item
              name={[nameForm, "deleteFromServer"]}
              className="col-span-2"
              valuePropName="checked"
            >
              <Checkbox>Delete mails after fetching</Checkbox>
            </Form.Item>
          )}
          <Form.Item name={[nameForm, "useSsl"]} valuePropName="checked">
            <Checkbox>SSL</Checkbox>
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Authentication"
            name={[nameForm, "authentication"]}
            className="col-span-2"
            rules={[{ required: true, message: "Please enter authentication" }]}
          >
            <Select options={options} />
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Email"
            name={[nameForm, "email"]}
            className="col-span-2"
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
            <Input />
          </Form.Item>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            label="Password"
            name={[nameForm, "password"]}
            className="col-span-2"
          >
            <Input.Password />
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <span className="link" onClick={testConnection}>
            Test Connection
          </span>
        </div>
      </Card>
    </>
  );
};

export default CardSettingExternalMail;
