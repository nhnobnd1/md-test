import { useJob, useMount } from "@moose-desk/core";
import { AccountRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Layout,
  Page,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import { validateSchemaObjectPassword } from "src/constaint/regex";
import Enable2FAModal from "src/modules/setting/component/Security/Enable2FAModal";
import { BannerPropsAccessManager } from "src/modules/setting/modal/account&Security/AccountManager";
export default function IndexAccountManager() {
  const [status, setStatus] = useState(false);
  const [method, setMethod] = useState<{
    show: boolean;
    method: string;
  }>({
    show: false,
    method: "Disabled",
  });
  const validateObject = validateSchemaObjectPassword;
  const { show } = useToast();
  const [banner, setBanner] = useState<BannerPropsAccessManager>({
    status: "success",
    message: "",
    isShowBanner: false,
  });
  const initialValues = useMemo(
    () => ({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }),
    []
  );
  const formRef = useRef<FormikProps<any>>(null);
  // fetch init data
  // const token = jose.decodeJwt(TokenManager.getToken("base_token"));
  const { run: fetch2FAStatus } = useJob(
    () => {
      return AccountRepository()
        .userGet2FAStatus()
        .pipe(
          map(({ data }) => {
            setMethod({
              ...method,
              show: data.data.twoFactorEnabled,
              method: data.data.twoFactorMethod,
            });
            setStatus(data.data.twoFactorStoreEnabled);
            return data.data;
          })
        );
    },
    { showLoading: false }
  );
  // update password
  const handleSubmit = useCallback((data: any) => {
    const dataSubmit = { ...data };
    submit(dataSubmit);
  }, []);

  const { run: submit } = useJob((dataSubmit: any) => {
    return AccountRepository()
      .changePassword(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show("Your password has been updated successfully.");
            setBanner({
              isShowBanner: true,
              message: "Your password has been updated successfully.",
              status: "success",
            });
            handleResetForm();
          } else {
            if (data.statusCode === 500) {
              setBanner({
                isShowBanner: true,
                message: "System error. Please try again later.",
                status: "critical",
              });
              show(`System error. Please try again later.`, {
                isError: true,
              });
            } else {
              setBanner({
                isShowBanner: true,
                message: "Current Password not match! Please try again.",
                status: "critical",
              });
              show("Current Password not match! Please try again.", {
                isError: true,
              });
            }
          }
        }),
        catchError((error) => {
          if (error.response.status === 500) {
            setBanner({
              isShowBanner: true,
              message: "System error. Please try again later.",
              status: "critical",
            });
            show(`System error. Please try again later.`, {
              isError: true,
            });
          } else {
            if (error.response.status === 500) {
              setBanner({
                isShowBanner: true,
                message: "System error. Please try again later.",
                status: "critical",
              });
              show(`System error. Please try again later.`, {
                isError: true,
              });
            } else {
              setBanner({
                isShowBanner: true,
                message: "Current Password not match! Please try again.",
                status: "critical",
              });
              show("Current Password not match! Please try again.", {
                isError: true,
              });
            }
          }
          return of(error);
        })
      );
  });
  // reset form
  const handleResetForm = useCallback(() => {
    formRef.current?.resetForm();
  }, [formRef.current]);
  // modal
  const [open2FA, setOpen2FA] = useState(false);
  // effect
  useMount(() => {
    fetch2FAStatus();
  });
  return (
    <>
      {open2FA ? (
        <Enable2FAModal
          open={open2FA}
          setOpen={setOpen2FA}
          initialValue={{ ...method, status }}
          fetch2FAStatus={fetch2FAStatus}
          show={show}
          setBanner={setBanner}
        />
      ) : null}
      <Page fullWidth>
        <Layout>
          {banner.isShowBanner ? (
            <Layout.Section>
              <Banner
                status={banner.status}
                onDismiss={() => setBanner({ ...banner, isShowBanner: false })}
              >
                {banner.message}
              </Banner>
            </Layout.Section>
          ) : null}
          <Layout.Section>
            <Form
              initialValues={initialValues}
              ref={formRef}
              onSubmit={handleSubmit}
              validationSchema={validateObject}
              onReset={handleResetForm}
              enableReinitialize
            >
              <Card title="Change Password" sectioned>
                <Layout>
                  <Layout.Section>
                    <FormLayout>
                      <FormItem name="currentPassword">
                        <TextField
                          label="Current Password"
                          autoComplete="off"
                          type="password"
                        />
                      </FormItem>
                      <FormItem name="newPassword">
                        <TextField
                          minLength={8}
                          label="New Password"
                          type="password"
                          autoComplete="off"
                        />
                      </FormItem>
                      <FormItem name="confirmNewPassword">
                        <TextField
                          minLength={8}
                          label="Confirm New Password"
                          type="password"
                          autoComplete="off"
                        />
                      </FormItem>
                    </FormLayout>
                  </Layout.Section>
                  <Layout.Section>
                    <Stack distribution="trailing">
                      <ButtonGroup>
                        <Button submit primary>
                          Update Password
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </Layout.Section>
                </Layout>
              </Card>
            </Form>
          </Layout.Section>
          <Layout.Section>
            <Card subdued={!status} sectioned>
              <Layout>
                <Layout.Section>
                  {status ? (
                    <Text variant="headingMd" as="span" fontWeight="semibold">
                      Two-Factor Authentication
                    </Text>
                  ) : (
                    <Text
                      variant="headingMd"
                      as="span"
                      color="subdued"
                      fontWeight="semibold"
                    >
                      Two-Factor Authentication
                    </Text>
                  )}
                </Layout.Section>
                <Layout.Section>
                  <div className="flex items-center">
                    <div className="mr-4">
                      {status ? (
                        <Text variant="bodyMd" as="span">
                          Status :
                        </Text>
                      ) : (
                        <Text variant="bodyMd" as="span" color="subdued">
                          Status :
                        </Text>
                      )}
                    </div>
                    <div>
                      <Text
                        variant="bodyMd"
                        as="span"
                        fontWeight="bold"
                        color={
                          method.show
                            ? status
                              ? "success"
                              : "subdued"
                            : status
                            ? "critical"
                            : "subdued"
                        }
                      >
                        {method.show ? "Active" : "InActive"}
                      </Text>
                    </div>
                  </div>
                </Layout.Section>
                {method.show ? (
                  <Layout.Section>
                    {status ? (
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Text variant="bodyMd" as="span">
                            Method :
                          </Text>
                        </div>
                        <div>
                          <Text variant="bodyMd" as="span" fontWeight="bold">
                            {method.method === "Email"
                              ? "Email OTP"
                              : method.method === "Authenticator"
                              ? "External Authentication Application"
                              : method.method}
                          </Text>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Text variant="bodyMd" as="span" color="subdued">
                            Method :
                          </Text>
                        </div>
                        <div>
                          <Text
                            variant="bodyMd"
                            as="span"
                            fontWeight="bold"
                            color="subdued"
                          >
                            {method.method === "Email"
                              ? "Email OTP"
                              : method.method === "Authenticator"
                              ? "External Authentication Application"
                              : method.method}
                          </Text>
                        </div>
                      </div>
                    )}
                  </Layout.Section>
                ) : null}
                <Layout.Section>
                  <Stack distribution="equalSpacing">
                    <ButtonGroup>
                      <Button
                        onClick={() => setOpen2FA(true)}
                        primary
                        disabled={!status}
                      >
                        {method.show ? "Change 2FA Method" : "Enable 2FA"}
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </Layout.Section>
              </Layout>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
