import { useJob, useMount } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import { Input, Space, Typography } from "antd";
import Link from "antd/es/typography/Link";
import { memo, useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
interface EmailOTP {
  setDataSubmitEmailOTP: (data: any) => void;
  errorMessage?: string;
}
const EmailOTP = ({ setDataSubmitEmailOTP, errorMessage }: EmailOTP) => {
  const [onResendEmail, setOnResendEmail] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  // resend Email

  const handleResendEmail = useCallback(() => {
    if (onResendEmail) {
      resetEmail();
    }
  }, []);
  const { run: resetEmail } = useJob(() => {
    return UserSettingRepository()
      .setupOtp({ method: MethodOTP.Email })
      .pipe(
        map(({ data }) => {
          return data.data;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  });
  const handleOnResendEmail = useCallback(() => {
    setOnResendEmail(false);
    setTimeout(() => {
      setOnResendEmail(true);
    }, 300000);
  }, [onResendEmail]);

  useEffect(() => {
    setDataSubmitEmailOTP && setDataSubmitEmailOTP(value);
  }, [value]);
  useMount(() => {
    handleOnResendEmail();
  });
  return (
    <Space direction="vertical" size="middle" className="mt-6">
      <Typography.Text>
        Please enter the 6 digits OTP code that we send to your email address in
        order to enable 2FA with your email.
      </Typography.Text>
      <div className="flex items-center">
        <Typography.Text>OTP code</Typography.Text>
        <div className="w-20 ml-4">
          <Input
            value={value}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            maxLength={6}
          />
        </div>
        {errorMessage ? (
          <div className="Polaris-Labelled__Error ml-2">
            <Typography.Text type="danger">
              Wrong code. Try again.
            </Typography.Text>
          </div>
        ) : null}
      </div>
      <div className="flex items-center">
        <Typography.Text>Did not receive the code yet?</Typography.Text>
        <div className="ml-2">
          <Link
            disabled={!onResendEmail}
            type={onResendEmail ? "success" : "secondary"}
            onClick={handleResendEmail}
          >
            Re-send OTP Code
          </Link>
        </div>
      </div>
    </Space>
  );
};
export default memo(EmailOTP);
