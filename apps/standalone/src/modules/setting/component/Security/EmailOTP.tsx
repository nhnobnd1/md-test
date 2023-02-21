import { useCountDown, useJob, useMount } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import { Space, Spin, Typography } from "antd";
import Link from "antd/es/typography/Link";
import { memo, useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import InputOTP from "src/modules/setting/component/Security/InputOTP";
interface EmailOTP {
  setDataSubmitEmailOTP: (data: any) => void;
  errorMessage?: string;
  setErrorMessage: (value: string | undefined) => void;
}
const EmailOTP = ({
  setDataSubmitEmailOTP,
  errorMessage,
  setErrorMessage,
}: EmailOTP) => {
  const timeOut = 30;
  const {
    clearCountDown,
    initCountdown: startCountDown,
    state,
  } = useCountDown({
    initValue: timeOut,
    key: "countDownResendEmail",
  });
  const [secondResend, setSecondResend] = useState(false);
  const [onResendEmail, setOnResendEmail] = useState(false);
  const [value, setValue] = useState("");
  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  const handleChangeValueForm = useCallback((value: { code: string }) => {
    handleChange(value.code);
  }, []);
  // resend Email
  const [spin, setSpin] = useState(false);
  const handleResendEmail = useCallback(() => {
    if (onResendEmail) {
      setSpin(true);
      resetEmail();
      handleOnResendEmail(true);
    }
  }, [onResendEmail]);
  const { run: resetEmail } = useJob(() => {
    return UserSettingRepository()
      .setupOtp({ method: MethodOTP.Email })
      .pipe(
        map(({ data }) => {
          setSpin(false);
          return data.data;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  });

  const handleOnResendEmail = useCallback(
    (again?: boolean) => {
      if (!again) {
        setOnResendEmail(false);
        setTimeout(() => {
          setOnResendEmail(true);
        }, 300000);
      } else {
        setSecondResend(true);
        setOnResendEmail(false);
        startCountDown("countDownResendEmail");
        setTimeout(() => {
          setOnResendEmail(true);
          clearCountDown("countDownResendEmail");
        }, 30000);
      }
    },
    [onResendEmail]
  );

  useEffect(() => {
    setDataSubmitEmailOTP && setDataSubmitEmailOTP(value);
  }, [value]);
  useMount(() => {
    handleOnResendEmail();
  });
  return (
    <Form initialValues={{ code: "" }} onValuesChange={handleChangeValueForm}>
      <Space direction="vertical" size="middle" className="mt-6">
        <Typography.Text>
          Please enter the 6 digits OTP code that we send to your email address
          in order to enable 2FA with your email.
        </Typography.Text>
        <div className="flex">
          <Typography.Text className="mr-4">OTP code: </Typography.Text>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "OTP is required" }]}
            className="mb-0"
          >
            <InputOTP
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          </Form.Item>
        </div>

        <div className="flex items-center">
          <Typography.Text>Did not receive the code yet?</Typography.Text>
          <div className="flex ml-2">
            <Link
              disabled={!onResendEmail}
              type={onResendEmail ? "success" : "secondary"}
              onClick={handleResendEmail}
            >
              Re-send OTP Code
            </Link>
            {spin ? <Spin size="small" /> : null}
            {state !== 0 && !onResendEmail && secondResend ? (
              <Typography.Text className="ml-2">
                ({state} seconds)
              </Typography.Text>
            ) : null}
          </div>
        </div>
      </Space>
    </Form>
  );
};
export default memo(EmailOTP);
