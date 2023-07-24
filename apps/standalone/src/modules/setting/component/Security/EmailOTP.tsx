import { useCountDown, useJob, useMount, useUnMount } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import { Space, Typography } from "antd";
import Link from "antd/es/typography/Link";
import classNames from "classnames";
import { memo, useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import InputOTP from "src/modules/setting/component/Security/InputOTP";
import styles from "./styles.module.scss";
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
  const {
    clearCountDown,
    initCountdown: startCountDown,
    state: countDown,
  } = useCountDown({
    initValue: 30,
    key: "countDownResendEmail",
  });

  const [value, setValue] = useState("");
  const handleChange = useCallback((value: string) => {
    setValue(value);
  }, []);
  const handleChangeValueForm = useCallback((value: { code: string }) => {
    handleChange(value.code);
    console.log(value);
  }, []);
  // resend Email
  const handleResendEmail = () => {
    if (countDown) return;
    startCountDown("countDownResendEmail");
    resetEmail();
  };
  const { run: resetEmail } = useJob(() => {
    return UserSettingRepository()
      .setupOtp({ method: MethodOTP.Email })
      .pipe(
        map(({ data }) => {
          // startCountDown("countDownResendEmail");
          return data.data;
        }),
        catchError((error) => {
          clearCountDown("countDownResendEmail");
          return of(error);
        })
      );
  });

  useEffect(() => {
    setDataSubmitEmailOTP && setDataSubmitEmailOTP(value);
  }, [value]);
  useMount(() => {
    startCountDown("countDownResendEmail");

    // handleResendEmail();
  });
  useUnMount(() => clearCountDown("countDownResendEmail"));
  return (
    <Form initialValues={{ code: "" }} onValuesChange={handleChangeValueForm}>
      <Space direction="vertical" size="middle">
        <Typography.Text>
          Please enter the 6 digits OTP code that we send to your email address
          in order to enable 2FA with your email.
        </Typography.Text>
        <div className="flex">
          <Typography.Text className={classNames(styles.label, "mr-4")}>
            OTP code:{" "}
          </Typography.Text>
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

        <div className="flex items-center flex-column-mobile">
          <Typography.Text>Did not receive the code yet?</Typography.Text>
          <div className="flex ml-2  ml-0-mobile">
            <Link
              disabled={!!countDown}
              type={!countDown ? "success" : "secondary"}
              onClick={handleResendEmail}
            >
              Re-send OTP Code
            </Link>
            {!countDown ? null : (
              <Typography.Text className="ml-2">({countDown}s)</Typography.Text>
            )}
          </div>
        </div>
      </Space>
    </Form>
  );
};
export default memo(EmailOTP);
