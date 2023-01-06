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
import Enable2FAModal from "src/modules/setting/component/Security/Enable2FAModal";
import { BannerPropsAccessManager } from "src/modules/setting/modal/account&Security/AccountManager";
import { object, ref, string } from "yup";
export default function IndexAccountManager() {
  const [status, setStatus] = useState(false);
  const [method, setMethod] = useState<{
    show: boolean;
    method: string;
  }>({
    show: false,
    method: "",
  });
  const validateObject = object().shape({
    currentPassword: string().min(8, "Must be at least 8 characters."),
    newPassword: string()
      .min(8, "Must be at least 8 characters.")
      .when("currentPassword", (currentPassword, field) =>
        currentPassword ? field.required("New Password is required!") : field
      ),
    confirmNewPassword: string()
      .min(8, "Must be at least 8 characters.")
      .when("newPassword", (newPassword, field) =>
        newPassword
          ? field
              .required("Confirm New Password is required!")
              .oneOf(
                [ref("newPassword")],
                "Confirm New Password must match with New Password."
              )
          : field
      ),
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
    []
  );
  const formRef = useRef<FormikProps<any>>(null);
  // fetch init data
  // const token = jose.decodeJwt(TokenManager.getToken("base_token"));
  const { run: fetch2FAStatus, result } = useJob(
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
    // console.log("dataSubmit", dataSubmit);
    // axios
    //   .post(`https://jsonplaceholder.typicode.com/users`, dataSubmit, {
    //     headers: {
    //       Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkRGMEI1NTA0NDZFM0Y4NDU5Q0Q3Rjg0QjEwRjE0MkE3MjU3RkNEMTkiLCJ4NXQiOiIzd3RWQkViai1FV2MxX2hMRVBGQ3B5Vl96UmsiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTA4OTIyOC01ZTFkLTcxOTItM2I2NS01OWZmNTc5NDQ0YzYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJob2FuZy5hZ2VudC4wMUBnbWFpbC5jb20iLCJlbWFpbCI6ImhvYW5nLmFnZW50LjAxQGdtYWlsLmNvbSIsInJvbGUiOiJCYXNpY0FnZW50IiwiZ2l2ZW5fbmFtZSI6Ik5ndXllbiIsImZhbWlseV9uYW1lIjoiSG9hbmciLCJwaG9uZV9udW1iZXIiOiIoKzg0KSA5MTc3NzY4OTYiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJGYWxzZSIsImVtYWlsX3ZlcmlmaWVkIjoiVHJ1ZSIsInVuaXF1ZV9uYW1lIjoiaG9hbmcuYWdlbnQuMDFAZ21haWwuY29tIiwic3RvcmVJZCI6IjY4MzY1MDU4MzYyIiwic3ViZG9tYWluIjoiZGV2Iiwib2lfcHJzdCI6Ik1vb3NlZGVza19Qb3N0bWFuIiwib2lfYXVfaWQiOiIzYTA4OTIyYS05YmM3LWRjNjQtYWJkYi00YjRmMzQ3NGRlNTIiLCJjbGllbnRfaWQiOiJNb29zZWRlc2tfUG9zdG1hbiIsIm9pX3Rrbl9pZCI6IjNhMDg5MjJhLTliZDctYWQzZC05OGU2LTMwMTJmZmQ1N2YwZCIsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MiLCJleHAiOjE2NzMxNDg4MTUsImlzcyI6Imh0dHBzOi8vYXV0aC5tb29zZWRlc2submV0LyIsImlhdCI6MTY3Mjg4OTYxNX0.oXq0FsV5ZsuPXCnAPnP6yei4SSlup_Gtcx8pCsUaF_uXamzpyZ-cHfbYN8pvacswcVkM537lmMDQQAdcClJ4JjcZUMLDeVoyw02vpXrwBvwXju2PPJoOlYV8mMm1yAzeDfocIP5C-SoAishESbudi_fYCHbvPiLTzb5DjnjJgf8amdJPMw0M7wzP47Ohq8ReJZk0Isavy3eR0IdrsTjLufBT38aHk8DfxAbUxZEipReeuQKgeddEWKAprxgOmrzC88AyHkB9_FHU4ib4r--ovAtpa2g6eXVJ2TjEL6FcLgNCPhW00-5LaF_OzIv9EC5SUt791wTMZMB8W2RD2Lh3nQ`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res", res);
    //   });
    // return AxiosObservable.prototype
    //   .post(`${env.API_URL}/api/v1/account/update-password`, dataSubmit)
    //   .pipe(map((data) => console.log(data)));
    return AccountRepository()
      .changePassword(dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            show("Access manager updated successfully.");
            setBanner({
              isShowBanner: true,
              message: "Password updated successfully.",
              status: "success",
            });
            handleResetForm();
          } else {
            if (data.statusCode === 409) {
              setBanner({
                isShowBanner: true,
                message: "Password updated failed.",
                status: "critical",
              });
              show(`Domains cannot be the same.`, {
                isError: true,
              });
            } else {
              setBanner({
                isShowBanner: true,
                message: "Password updated failed.",
                status: "critical",
              });
              show("Password updated failed", {
                isError: true,
              });
            }
          }
        }),
        catchError((error) => {
          if (error.response.status === 409) {
            setBanner({
              isShowBanner: true,
              message: "Password updated failed.",
              status: "critical",
            });
            show(`Password updated failed.`, {
              isError: true,
            });
          } else {
            setBanner({
              isShowBanner: true,
              message: "`Password updated failed.`",
              status: "critical",
            });
            show("Password updated failed.", {
              isError: true,
            });
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
          {status ? (
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
                          color={method.show ? "success" : "critical"}
                        >
                          {method.show ? "Active" : "InActive"}
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
                          <Text variant="bodyMd" as="span" fontWeight="bold">
                            {method.method}
                          </Text>
                        </div>
                      </div>
                    </Layout.Section>
                  ) : null}
                  <Layout.Section>
                    <Stack distribution="equalSpacing">
                      <ButtonGroup>
                        <Button onClick={() => setOpen2FA(true)} primary>
                          {method.show ? "Change 2FA Method" : "Enable 2FA"}
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </Layout.Section>
                </Layout>
              </Card>
            </Layout.Section>
          ) : null}
        </Layout>
      </Page>
    </>
  );
}
