import { AuthenticationSMTP } from "@moose-desk/repo";
import { Card, Checkbox, Input } from "antd";
import { useCallback, useMemo } from "react";
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
  onChange?: (values: any) => void;
  testConnection: () => void;
  typePort: TypePort;
}

export const CardSettingExternalMail = ({
  title,
  className,
  onChange,
  typePort,
  value,
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

  const initialValues = useMemo(() => {
    return (
      value ?? {
        serverName: "",
        imapPort: "",
      }
    );
  }, [value]);

  const handleChange = useCallback((changedValues: any, values: any) => {
    onChange && onChange(values);
  }, []);

  return (
    <>
      <Form
        layout="vertical"
        initialValues={value}
        onValuesChange={handleChange}
      >
        <Card className={className} type="inner" title={title}>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item className="col-span-2" label="Server" name="serverName">
              <Input />
            </Form.Item>
            <Form.Item label={`${typePort} Port`} name="port">
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {typePort === TypePort.IMAP && (
              <Form.Item className="col-span-2" valuePropName="checked">
                <Checkbox>Delete mails after fetching</Checkbox>
              </Form.Item>
            )}
            <Form.Item valuePropName="checked">
              <Checkbox>SSL</Checkbox>
            </Form.Item>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Authentication" className="col-span-2">
              <Select options={options} />
            </Form.Item>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Username" className="col-span-2">
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Password" className="col-span-2">
              <Input.Password />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <span className="link" onClick={testConnection}>
              Test Connection
            </span>
          </div>
        </Card>
      </Form>
    </>
  );
};

export default CardSettingExternalMail;
