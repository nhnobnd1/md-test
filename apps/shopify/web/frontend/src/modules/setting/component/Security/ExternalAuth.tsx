import { useJob, useMount } from "@moose-desk/core";
import { UserSettingRepository } from "@moose-desk/repo";
import { Button, FormLayout, Layout, Stack, Text } from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import InputOTP from "src/modules/setting/component/Security/InputOTP/InputOTP";
import { object, string } from "yup";
interface ExternalAuth {
  initialValues?: {
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  };
  props: {
    method: string;
    key: string;
  };
  back: (value: any) => void;
  handleCloseModal: () => void;
  fetch2FAStatus: () => void;
  show: (data: string, props?: any) => void;
  setBanner: (data: any) => void;
}
const ExternalAuth = ({
  initialValues,
  props,
  back,
  handleCloseModal,
  fetch2FAStatus,
  show,
  setBanner,
}: ExternalAuth) => {
  const [error, setError] = useState<string>();
  const validateObject = object().shape({
    code: string().required("OTP is required"),
  });
  const handleSubmit = useCallback(
    (data: any) => {
      submit({ method: initialValues?.twoFactorMethod, ...data });
    },
    [initialValues]
  );
  const { t, i18n } = useTranslation();

  const { run: submit, processing } = useJob((dataSubmit: any) => {
    return UserSettingRepository()
      .verifySetupOTP(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            handleCloseModal();
            fetch2FAStatus();
            setError(undefined);
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
  useEffect(() => {}, [initialValues]);
  useMount(() => setError(undefined));
  return (
    <Form
      initialValues={{ code: "" }}
      validationSchema={validateObject}
      onSubmit={handleSubmit}
    >
      <Layout sectioned>
        <Layout.Section>
          <div className="main-content">
            <FormLayout>
              <Stack vertical>
                <Text variant="bodyMd" as="p">
                  1. Download and install any authenticator application in your
                  mobile device (Google Authenticator, 2FAs, Duo Mobile,...etc)
                </Text>
                <div>
                  <Text variant="bodyMd" as="span">
                    2. Open your authenticator and scan this QR code.
                  </Text>
                  <div className="p-4">
                    <img
                      width={220}
                      height={220}
                      src={`data:image/png;base64,${props.key}`}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <Text variant="bodyMd" as="span">
                      3. Enter the OTP generated by the authenticator
                      application.
                    </Text>
                  </div>
                  <FormItem name="code">
                    <InputOTP errorMessage={error} setErrorMessage={setError} />
                  </FormItem>
                </div>
              </Stack>
            </FormLayout>
          </div>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Stack distribution="trailing">
            <Button onClick={() => back(1)}>Cancel</Button>
            <Button submit primary loading={processing}>
              Confirm
            </Button>
          </Stack>
        </Layout.Section>
      </Layout>
    </Form>
  );
};
export default memo(ExternalAuth);
