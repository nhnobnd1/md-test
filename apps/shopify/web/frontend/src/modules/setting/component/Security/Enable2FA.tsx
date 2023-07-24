import { Form, FormLayout, RadioButton, Stack } from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
interface Enable2FA {
  initialValues: {
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  };
  setDataSubmit2FA: (data: any) => void;
}
const Enable2FA = ({ initialValues, setDataSubmit2FA }: Enable2FA) => {
  const [value, setValue] = useState("Disabled");
  const { t, i18n } = useTranslation();

  const handleChange = useCallback(
    (_checked, newValue) => {
      setValue(newValue);
    },
    [setValue]
  );

  useEffect(() => {
    initialValues.twoFactorMethod
      ? setValue(initialValues.twoFactorMethod)
      : setValue("Disabled");
  }, [initialValues]);
  useEffect(() => {
    setDataSubmit2FA && setDataSubmit2FA(value);
  }, [value]);
  return (
    <Form onSubmit={() => {}}>
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
    </Form>
  );
};
export default memo(Enable2FA);
