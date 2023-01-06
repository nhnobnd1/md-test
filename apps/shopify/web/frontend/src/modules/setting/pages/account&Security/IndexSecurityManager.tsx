import { useJob } from "@moose-desk/core";
import {
  AccountRepository,
  UpdatePasswordRequest,
  UserSettingRepository,
} from "@moose-desk/repo";
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import useAuth from "src/hooks/useAuth";
import { BannerPropsAccessManager } from "src/modules/setting/modal/account&Security/AccountManager";
import { object, string } from "yup";
export default function IndexAccountManager({ props }: any) {
  const auth = useAuth();
  const [status, setStatus] = useState(false);
  const [method, setMethod] = useState<{
    show: boolean;
    status: string;
  }>({
    show: false,
    status: "",
  });
  const validateObject = object().shape({
    currentPassword: string().required("Required!"),
    newPassword: string().required("Required!"),
    confirmNewPassword: string().required("Required!"),
  });
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
    [props]
  );
  const formRef = useRef<FormikProps<any>>(null);
  // fetch init data
  const { run: fetchAccountManagerStatus, result } = useJob(
    () => {
      return UserSettingRepository()
        .getAccessManagerSetting(auth.user?.id)
        .pipe(
          map(({ data }) => {
            console.log(data.data);
            setMethod({
              show: data.data.twoFactorAuthEnabled,
              status: "Email OTP",
            });
            return data.data;
          })
        );
    },
    { showLoading: false }
  );
  // update data
  const handleSubmit = useCallback((data: any) => {
    const dataSubmit = { ...data };
    submit(dataSubmit);
  }, []);
  const { run: submit } = useJob((dataSubmit: UpdatePasswordRequest) => {
    return AccountRepository()
      .changePassword(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show("Access manager updated successfully.");
            setBanner({
              isShowBanner: true,
              message: "Access manager updated successfully.",
              status: "success",
            });
            fetchAccountManagerStatus();
          } else {
            if (data.statusCode === 409) {
              setBanner({
                isShowBanner: true,
                message: "Update failed.",
                status: "critical",
              });
            } else {
              setBanner({
                isShowBanner: true,
                message: "Update failed.",
                status: "critical",
              });
              show("Update failed", {
                isError: true,
              });
            }
          }
        }),
        catchError((error) => {
          if (error.response.status === 409) {
            setBanner({
              isShowBanner: true,
              message: "Update failed.",
              status: "critical",
            });
            show(`Domains cannot be the same.`, {
              isError: true,
            });
          } else {
            setBanner({
              isShowBanner: true,
              message: "`Domains cannot be the same.`",
              status: "critical",
            });
            show("Update failed.", {
              isError: true,
            });
          }
          return of(error);
        })
      );
  });
  useEffect(() => fetchAccountManagerStatus(), []);
  return (
    <>
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
              initialValues={result || initialValues}
              ref={formRef}
              onSubmit={handleSubmit}
              validationSchema={validateObject}
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
                        />
                      </FormItem>
                      <FormItem name="newPassword">
                        <TextField
                          minLength={8}
                          label="New Password"
                          autoComplete="off"
                        />
                      </FormItem>
                      <FormItem name="confirmNewPassword">
                        <TextField
                          minLength={8}
                          label="Confirm New Password"
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
            <Card title="Two-Factor Authentication" sectioned>
              <Layout>
                <Layout.Section>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Text variant="bodyMd" as="span">
                        Status :
                      </Text>
                    </div>
                    <div>
                      <Text
                        variant="bodyMd"
                        as="span"
                        fontWeight="bold"
                        color="success"
                      >
                        Inactive
                      </Text>
                    </div>
                  </div>
                </Layout.Section>
                {method.show ? (
                  <Layout.Section>
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
                          color="success"
                        >
                          {method.status}
                        </Text>
                      </div>
                    </div>
                  </Layout.Section>
                ) : null}
                <Layout.Section>
                  <Stack distribution="equalSpacing">
                    <ButtonGroup>
                      <Button primary>Enable 2FA</Button>
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
