import { useJob, useMount } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import {
  Button,
  FormLayout,
  InlineError,
  Layout,
  Link,
  Spinner,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import { memo, useCallback, useState } from "react";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
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
  const [onResendEmail, setOnResendEmail] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = useCallback(
    (data: any) => {
      submit({ method: initialValues?.twoFactorMethod, ...data });
    },
    [initialValues]
  );

  const { run: submit } = useJob((dataSubmit: any) => {
    return UserSettingRepository()
      .verifySetupOTP(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setError(false);
            handleCloseModal();
            fetch2FAStatus();
            back(1);
            setBanner({
              isShowBanner: true,
              message:
                "Your Two-Factor Authentication has been enabled successfully.",
              status: "success",
            });
            show(
              "Your Two-Factor Authentication has been enabled successfully."
            );
          } else {
            setError(true);
          }
        }),
        catchError((error) => {
          setError(true);
          return of(error);
        })
      );
  });

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
        setOnResendEmail(false);
        setTimeout(() => {
          setOnResendEmail(true);
        }, 30000);
      }
    },
    [onResendEmail]
  );
  useMount(() => {
    setError(false);
    handleOnResendEmail();
  });
  return (
    <Form initialValues={{ code: "" }} onSubmit={handleSubmit}>
      <Layout sectioned>
        <Layout.Section>
          <div className="main-content">
            <FormLayout>
              <Stack vertical>
                <Text variant="bodyMd" as="p">
                  Please enter the 6 digits OTP code that we send to your email
                  address in order to enable 2FA with your email.
                </Text>
                <div className="flex items-center">
                  <Text variant="bodyMd" as="span">
                    OTP code
                  </Text>
                  <div className="w-20 ml-4">
                    <FormItem name="code">
                      <TextField
                        type="text"
                        label="OTP code"
                        labelHidden
                        autoComplete="off"
                        maxLength={6}
                      />
                    </FormItem>
                  </div>
                  {error ? (
                    <div className="Polaris-Labelled__Error ml-2">
                      <InlineError
                        message="Wrong code. Try again."
                        fieldID="myFieldID"
                      />
                    </div>
                  ) : null}
                </div>
                <div className="flex items-center">
                  <Text variant="bodyMd" as="span">
                    Did not receive the code yet?
                  </Text>
                  <div className="flex ml-2">
                    <Link
                      monochrome={!onResendEmail}
                      onClick={handleResendEmail}
                    >
                      Re-send OTP Code
                    </Link>
                    {spin ? (
                      <Spinner
                        accessibilityLabel="Small spinner example"
                        size="small"
                      />
                    ) : null}
                  </div>
                </div>
              </Stack>
            </FormLayout>
          </div>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Stack distribution="trailing">
            <Button onClick={() => back(1)}>Cancle</Button>
            <Button submit primary>
              Confirm
            </Button>
          </Stack>
        </Layout.Section>
      </Layout>
    </Form>
  );
};
export default memo(EmailOPT);
