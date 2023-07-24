import { useCountDown, useJob, useMount, useUnMount } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import { FormLayout, Link, Stack, Text } from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import InputOTP from "src/modules/setting/component/Security/InputOTP/InputOTP";
import { object, string } from "yup";
interface EmailOTP {
  setDataSubmitEmailOTP: (data: any) => void;
  errorMessage?: string;
  setErrorMessage: (value: string | undefined) => void;
}
const EmailOPT = ({
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
  const [value, setValue] = useState<any>();
  const handleChange = useCallback((value: { code: string }) => {
    setValue(value);
  }, []);
  const handleChangeValueForm = useCallback((value: any) => {
    handleChange(value.code);
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
  // validate
  const validateObject = object().shape({
    code: string().required("OTP is required"),
  });
  // form

  // resend Email

  return (
    <Form
      initialValues={{ code: "" }}
      validationSchema={validateObject}
      onSubmit={() => {}}
      onValuesChange={handleChangeValueForm}
    >
      {/* <Layout sectioned> */}
      {/* <Layout.Section> */}
      <div className="main-content">
        <FormLayout>
          <Stack vertical>
            <Text variant="bodyMd" as="p">
              Please enter the 6 digits OTP code that we send to your email
              address in order to enable 2FA with your email.
            </Text>
            <FormItem name="code">
              <InputOTP
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </FormItem>
            <div className="flex items-center">
              <Text variant="bodyMd" as="span">
                Did not receive the code yet?
              </Text>
              <div className="flex ml-2">
                <Link monochrome={!!countDown} onClick={handleResendEmail}>
                  Re-send OTP Code
                </Link>
                {!countDown ? null : (
                  <div className="ml-2">
                    <Text as="span" variant="bodyMd">
                      ({countDown}s)
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </Stack>
        </FormLayout>
      </div>
    </Form>
  );
};
export default memo(EmailOPT);
