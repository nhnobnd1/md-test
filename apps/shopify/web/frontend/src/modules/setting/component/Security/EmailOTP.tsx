import { useCountDown, useJob, useMount, useUnMount } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import {
  Button,
  ButtonGroup,
  FormLayout,
  Link,
  Stack,
  Text,
} from "@shopify/polaris";
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import InputOTP from "src/modules/setting/component/Security/InputOTP/InputOTP";
import { object, string } from "yup";
interface EmailOPT {
  initialValues?: {
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  };
  back: (value: any) => void;
  handleCloseModal: () => void;
  fetch2FAStatus: () => void;
  show: (data: string, props?: any) => void;
  setBanner: (data: any) => void;
}
const EmailOPT = ({
  initialValues,
  back,
  handleCloseModal,
  fetch2FAStatus,
  show,
  setBanner,
}: EmailOPT) => {
  const timeOut = 30;
  const {
    clearCountDown,
    initCountdown: startCountDown,
    state: countDown,
  } = useCountDown({
    initValue: timeOut,
    key: "countDownResendEmail",
  });
  const [error, setError] = useState<string>();
  const { t, i18n } = useTranslation();

  const handleSubmit = useCallback(
    (data: any) => {
      submit({ method: initialValues?.twoFactorMethod, ...data });
    },
    [initialValues]
  );
  // validate
  const validateObject = object().shape({
    code: string().required("OTP is required"),
  });
  // form
  const { run: submit, processing } = useJob((dataSubmit: any) => {
    return UserSettingRepository()
      .verifySetupOTP(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setError(undefined);
            handleCloseModal();
            fetch2FAStatus();
            back(1);
            setBanner({
              isShowBanner: true,
              message: t("messages:success.enable_two_factor"),
              status: "success",
            });
            show(t("messages:success.enable_two_factor"));
          } else {
            setError(t("messages:error.input_otp"));
          }
        }),
        catchError((error) => {
          setError(t("messages:error.input_otp"));
          return of(error);
        })
      );
  });

  // resend Email

  const handleResendEmail = useCallback(() => {
    if (countDown) return;
    startCountDown("countDownResendEmail");
    resetEmail();
  }, [countDown]);
  const { run: resetEmail } = useJob(() => {
    return UserSettingRepository()
      .setupOtp({ method: MethodOTP.Email })
      .pipe(
        map(({ data }) => {
          return data.data;
        }),
        catchError((error) => {
          clearCountDown("countDownResendEmail");
          return of(error);
        })
      );
  });

  useMount(() => {
    setError(undefined);
    startCountDown("countDownResendEmail");

    // handleResendEmail();
  });
  useUnMount(() => clearCountDown("countDownResendEmail"));

  return (
    <Form
      initialValues={{ code: "" }}
      validationSchema={validateObject}
      onSubmit={handleSubmit}
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
              <InputOTP errorMessage={error} setErrorMessage={setError} />
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
      {/* </Layout.Section> */}
      {/* <Layout.Section fullWidth> */}
      <div className="group-button-footer">
        <ButtonGroup>
          <Button onClick={() => back(1)}>Cancel</Button>
          <Button submit primary loading={processing}>
            Confirm
          </Button>
        </ButtonGroup>
      </div>
      {/* </Layout.Section> */}
      {/* </Layout> */}
    </Form>
  );
};
export default memo(EmailOPT);
