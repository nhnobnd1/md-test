import { AuthenticationSMTP } from "@moose-desk/repo";
import { Card, Checkbox, Input, InputNumber } from "antd";
import { Loading } from "src/components/Loading";
import { Form } from "src/components/UI/Form";
import Select, { OptionType } from "src/components/UI/Select/Select";
import MaterialSymbolsCheckCircleRounded from "~icons/material-symbols/check-circle-rounded";
import MdiCloseCircle from "~icons/mdi/close-circle";

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
  loadingTestConnection?: boolean;
  connection?: boolean | undefined;
}

export const CardSettingExternalMail = ({
  title,
  className,
  nameForm,
  typePort,
  testConnection,
  connection,
  loadingTestConnection = false,
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
      <Loading spinning={loadingTestConnection}>
        <Card className={className} type="inner" title={title}>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              className="col-span-2"
              label="Server"
              name={[nameForm, "mailServer"]}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Server is required",
                },
              ]}
              normalize={(value) => value.trim()}
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
              rules={[
                { required: true, message: "Authentication is required" },
              ]}
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
                  message: "Email address is required",
                },
                {
                  type: "email",
                  message: "The email address is not valid",
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
          <div className="flex justify-end items-center gap-2">
            <span className="link" onClick={testConnection}>
              Test Connection
            </span>

            {connection !== undefined && (
              <span>
                {connection ? (
                  <span className="flex items-center">
                    <MaterialSymbolsCheckCircleRounded
                      color="#52c41a"
                      fontSize={24}
                    />
                  </span>
                ) : (
                  <span className="flex items-center">
                    <MdiCloseCircle color="#f5222d" fontSize={24} />
                  </span>
                )}
              </span>
            )}
          </div>
        </Card>
      </Loading>
    </>
  );
};

export default CardSettingExternalMail;
