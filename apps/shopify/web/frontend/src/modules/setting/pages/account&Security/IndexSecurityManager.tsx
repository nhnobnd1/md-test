import { useJob } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { AccountRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Button,
  ButtonGroup,
  FormLayout,
  Layout,
  LegacyCard,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import SkeletonCard from "src/components/Skelaton/SkeletonCard";
import { validateSchemaObjectPassword } from "src/constaint/regex";
import { getStatus2FA } from "src/modules/setting/api/api";
import Enable2FAModal from "src/modules/setting/component/Security/Enable2FAModal";
import { BannerPropsAccessManager } from "src/modules/setting/modal/account&Security/AccountManager";
import styles from "./styles.module.scss";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function IndexAccountManager() {
  const validateObject = validateSchemaObjectPassword;
  const { show } = useToast();
  const { t, i18n } = useTranslation();

  const [banner, setBanner] = useState<BannerPropsAccessManager>({
    status: "success",
    message: "",
    isShowBanner: false,
  });

  const formRef = useRef<FormikProps<any>>(null);
  // fetch init data
  // const token = jose.decodeJwt(TokenManager.getToken("base_token"));
  // const { run: fetch2FAStatus, processing } = useJob(
  //   () => {
  //     return AccountRepository()
  //       .userGet2FAStatus()
  //       .pipe(
  //         map(({ data }) => {
  //           setMethod({
  //             ...method,
  //             show: data.data.twoFactorEnabled,
  //             method: data.data.twoFactorMethod,
  //           });
  //           setStatus(data.data.twoFactorStoreEnabled);
  //           return data.data;
  //         })
  //       );
  //   },
  //   { showLoading: false }
  // );
  const {
    data: statusSecurity,
    isLoading,
    refetch: fetchingStatus,
  }: any = useQuery({
    queryKey: [QUERY_KEY.TWO_FA_STATUS],
    queryFn: () => getStatus2FA(),
  });
  const method = useMemo(() => {
    return {
      show: statusSecurity?.data?.data?.twoFactorEnabled,
      method: statusSecurity?.data?.data?.twoFactorMethod || "Disabled",
    };
  }, [statusSecurity]);
  const status = useMemo(() => {
    return statusSecurity?.data?.data?.twoFactorStoreEnabled || false;
  }, [statusSecurity]);
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
            show(t("messages:success.change_password"));
            setBanner({
              isShowBanner: true,
              message: t("messages:success.change_password"),
              status: "success",
            });
            handleResetForm();
          } else {
            if (data.statusCode === 500) {
              setBanner({
                isShowBanner: true,
                message: t("messages:error.change_password"),
                status: "critical",
              });
              show(t("messages:error.change_password"), {
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
              message: t("messages:error.change_password"),
              status: "critical",
            });
            show(t("messages:error.change_password"), {
              isError: true,
            });
          } else {
            if (error.response.status === 500) {
              setBanner({
                isShowBanner: true,
                message: t("messages:error.change_password"),
                status: "critical",
              });
              show(t("messages:error.change_password"), {
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

  return (
    <section className="page-wrap">
      <div className={styles.pageContent}>
        <Text variant="headingLg" as="h1">
          Security
        </Text>
        {open2FA ? (
          <Enable2FAModal
            open={open2FA}
            setOpen={setOpen2FA}
            initialValue={{ ...method, status }}
            fetch2FAStatus={fetchingStatus}
            show={show}
            setBanner={setBanner}
          />
        ) : null}

        <Layout>
          <div className={styles.wrapContent}>
            {banner.isShowBanner ? (
              <Layout.Section>
                <div className={styles.wrapBanner}>
                  <Banner
                    status={banner.status}
                    onDismiss={() =>
                      setBanner({ ...banner, isShowBanner: false })
                    }
                  >
                    {banner.message}
                  </Banner>
                </div>
              </Layout.Section>
            ) : null}
            <div className={styles.layoutCustom}>
              <div className={styles.wrapFormSecurity}>
                <Layout.Section>
                  <Form
                    initialValues={initialValues}
                    ref={formRef}
                    onSubmit={handleSubmit}
                    validationSchema={validateObject}
                    onReset={handleResetForm}
                    enableReinitialize
                  >
                    <LegacyCard title="Change Password" sectioned>
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
                    </LegacyCard>
                  </Form>
                </Layout.Section>
              </div>
              <div className={styles.wrapSubForm}>
                <Layout.Section>
                  {isLoading ? (
                    <SkeletonCard lines={3} />
                  ) : (
                    <LegacyCard subdued={!status} sectioned>
                      <Layout>
                        <Layout.Section>
                          {status ? (
                            <Text
                              variant="headingMd"
                              as="span"
                              fontWeight="semibold"
                            >
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
                                <Text
                                  variant="bodyMd"
                                  as="span"
                                  color="subdued"
                                >
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
                                  <Text
                                    variant="bodyMd"
                                    as="span"
                                    fontWeight="bold"
                                  >
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
                                  <Text
                                    variant="bodyMd"
                                    as="span"
                                    color="subdued"
                                  >
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
                                {method.show
                                  ? "Change 2FA Method"
                                  : "Enable 2FA"}
                              </Button>
                            </ButtonGroup>
                          </Stack>
                        </Layout.Section>
                      </Layout>
                    </LegacyCard>
                  )}
                </Layout.Section>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </section>
  );
}
