import { useJob } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import {
  Button,
  Form,
  FormLayout,
  Layout,
  RadioButton,
  Stack,
} from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
interface Enable2FA {
  initialValues?: {
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  };
  handleData2FA: (data: any) => void;
  setProps: (data: any) => void;
  handleCloseModal: () => void;
  fetch2FAStatus: () => void;
  show: (data: string, props?: any) => void;
  setBanner: (data: any) => void;
  setStep: (data: any) => void;
}
const Enable2FA = ({
  initialValues,
  handleData2FA,
  setProps,
  handleCloseModal,
  fetch2FAStatus,
  show,
  setBanner,
  setStep,
}: Enable2FA) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback((_checked, newValue) => {
    setValue(newValue);
  }, []);
  const handleSubmit = useCallback(() => {
    submit({ method: value });
  }, [value, initialValues]);
  const { run: submit } = useJob((dataSubmit: any) => {
    return UserSettingRepository()
      .setupOtp(dataSubmit)
      .pipe(
        map(({ data }) => {
          handleData2FA({
            ...initialValues,
            twoFactorMethod: data.data.method,
          });
          setProps(data.data);
          switch (data.data.method) {
            case MethodOTP.Disabled:
              handleCloseModal();
              fetch2FAStatus();
              setBanner({
                isShowBanner: true,
                message: "Your Two-Factor Authentication has been disabled.",
                status: "success",
              });
              show("Your Two-Factor Authentication has been disabled.");
              break;
            case MethodOTP.Email:
              setStep(2);
              break;
            case MethodOTP.Authenticator:
              setStep(3);
              break;
            default:
              break;
          }
        }),
        catchError((error) => {
          return of(error);
        })
      );
  });
  useEffect(
    () =>
      initialValues ? setValue(initialValues.twoFactorMethod) : setValue(""),
    [initialValues]
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Layout sectioned>
        <Layout.Section>
          <div className="main-content">
            <FormLayout>
              <Stack vertical>
                <RadioButton
                  label="Off"
                  checked={value === "Disabled"}
                  helpText={
                    value === "Disabled"
                      ? "You will login normally with your email and password without any additional verifycation steps. This method will have higher risks for any security breach."
                      : undefined
                  }
                  name="status2FA"
                  id="Disabled"
                  onChange={handleChange}
                />
                <RadioButton
                  label="Use Email Address"
                  helpText={
                    value === "Email"
                      ? "When you login from a new computer or browser, system will send an OTP code to your email to verify your identity."
                      : undefined
                  }
                  checked={value === "Email"}
                  name="status2FA"
                  onChange={handleChange}
                  id="Email"
                />
                <RadioButton
                  label="Use external authenticator application."
                  checked={value === "Authenticator"}
                  name="status2FA"
                  onChange={handleChange}
                  id="Authenticator"
                />
              </Stack>
            </FormLayout>
          </div>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Stack distribution="trailing">
            <Button submit primary>
              Save
            </Button>
          </Stack>
        </Layout.Section>
      </Layout>
    </Form>
  );
};
export default memo(Enable2FA);
