import { Radio, Space, Typography } from "antd";
import { memo, useCallback, useEffect, useState } from "react";

interface Enable2FA {
  initialValues: {
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  };
  setDataSubmit2FA: (data: any) => void;
}
const Enable2FA = ({ initialValues, setDataSubmit2FA }: Enable2FA) => {
  const [value, setValue] = useState("Disabled");
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    setDataSubmit2FA && setDataSubmit2FA(value);
  }, [value]);
  useEffect(() => {
    initialValues.twoFactorMethod
      ? setValue(initialValues.twoFactorMethod)
      : setValue("Disabled");
  }, [initialValues.twoFactorMethod]);

  return (
    <Radio.Group value={value}>
      <Space direction="vertical" size="middle">
        <Radio value="Disabled" onChange={handleChange}>
          <Typography.Text>Off</Typography.Text>
        </Radio>
        {value === "Disabled" ? (
          <Typography.Text type="secondary">
            You will login normally with your email and password without any
            additional verifycation steps. This method will have higher risks
            for any security breach.
          </Typography.Text>
        ) : null}
        <Radio value="Email" onChange={handleChange}>
          <Typography.Text>Use Email Address</Typography.Text>
        </Radio>
        {value === "Email" ? (
          <Typography.Text type="secondary">
            When you login from a new computer or browser, system will send an
            OTP code to your email to verify your identity.
          </Typography.Text>
        ) : null}
        <Radio value="Authenticator" onChange={handleChange}>
          <Typography.Text>
            Use external authenticator application.
          </Typography.Text>
        </Radio>
      </Space>
    </Radio.Group>
  );
};
export default memo(Enable2FA);
