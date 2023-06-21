import {
  useAuthContext,
  useJob,
  useMount,
  useNavigate,
} from "@moose-desk/core";
import { AccountRepository, SignInAccountAgentRequest } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import Link from "antd/es/typography/Link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { catchError, map, of } from "rxjs";
import LayoutSignInPage from "src/components/UI/LayoutSignInPage/LayoutSignInPage";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { useSubdomain } from "src/hooks/useSubdomain";
import { Factor2Auth } from "src/modules/agent/components/Factor2Auth";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import { useStore } from "src/providers/StoreProviders";
import { rulesValidatePassword } from "src/regex";
import RoutePaths from "src/routes/paths";
import styles from "./styles.module.scss";
export const SignIn = () => {
  const { login } = useAuthContext();
  const message = useMessage();
  const [view, setView] = useState<"login" | "lock" | "factor2Auth">("login");
  const { getSubDomain } = useSubdomain();
  const { storeId } = useStore();
  const [factor, setFactor] = useState<{
    type: "email" | "authenticator";
    state: {
      email: string;
      password: string;
      subdomain: string | null;
    };
  }>({
    type: "email",
    state: {
      email: "",
      password: "",
      subdomain: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const notification = useNotification();
  const navigate = useNavigate();
  const initialValues = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);
  const { t } = useTranslation();

  const { run: signInApi } = useJob(
    (payload: SignInAccountAgentRequest, resend?: boolean) => {
      return AccountRepository()
        .agentSignIn(payload)
        .pipe(
          map(({ data }) => {
            message.success(t("messages:success.login"));
            login({
              base_token: data.data.accessToken,
              refresh_token: data.data.refreshToken,
            });
            navigate(DashboardRoutePaths.Index);
          }),
          catchError((err) => {
            if (resend) {
              message.success(t("messages:success.request_otp"));
            }
            const error = err.response.data.error;
            const errorCode = err.response.data.errorCode;
            if (
              [
                "RequiresTwoFactor_Authenticator",
                "RequiresTwoFactor_Email",
              ].includes(errorCode)
            ) {
              setView("factor2Auth");
              setFactor((value) => {
                return {
                  type:
                    errorCode === "RequiresTwoFactor_Email"
                      ? "email"
                      : "authenticator",
                  state: {
                    email: payload.email,
                    password: payload.password,
                    subdomain: value.state.subdomain,
                  },
                };
              });
            } else {
              if (error.includes("INVALID_AUTHENTICATOR_CODE")) {
                notification.error(t("messages:error.input_otp"));
              } else if (error.includes("USER_NOT_FOUND")) {
                setErrorMessage(
                  "We're sorry, the email address you entered does not exist in our system. Please double-check your email address"
                );
              } else {
                message.error(t("messages:error.login"));

                const numberLoginFailed = error[0].split("/")[0];
                const totalAcceptFailed = error[0].split("/")[1];
                if (numberLoginFailed < totalAcceptFailed) {
                  setErrorMessage(
                    `The email or password is incorrect. You have ${
                      parseInt(totalAcceptFailed) - parseInt(numberLoginFailed)
                    } remaining attempts to login`
                  );
                } else {
                  setErrorMessage("");
                  setView("lock");
                }
              }
            }

            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  useMount(() => {
    setFactor((value) => {
      return {
        type: value.type,
        state: {
          email: value.state.email,
          password: value.state.password,
          subdomain: getSubDomain(),
        },
      };
    });
  });

  const handleSubmit = (values: { email: string; password: string }) => {
    signInApi({
      email: values.email,
      password: values.password,
      storeId: storeId,
      ...(factor.state.subdomain && { subdomain: factor.state.subdomain }),
    });
  };

  return (
    <>
      {view === "login" ? (
        <LayoutSignInPage
          subTitle={
            !errorMessage ? (
              <p className={styles.subHeader}>
                Please enter your credentials to sign in!
              </p>
            ) : (
              <p className={styles.error}>{errorMessage}</p>
            )
          }
          content={
            <div className={styles.formWrap}>
              <Form
                initialValues={initialValues}
                onFinish={handleSubmit}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Email address is required",
                    },
                    {
                      type: "email",
                      message: "The email address is not valid",
                    },
                  ]}
                >
                  <Input placeholder="Enter email" size="large" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  className={styles.formPassword}
                  rules={[
                    { required: true, message: "The password is required" },
                    ...rulesValidatePassword,
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    autoComplete="on"
                    size="large"
                  />
                </Form.Item>
                <div className={styles.wrapLink}>
                  <Link
                    href={RoutePaths.ForgotPassword}
                    className={styles.link}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  className={styles.buttonLogin}
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  Sign In
                </Button>
              </Form>
            </div>
          }
        />
      ) : (
        <>
          {view === "lock" ? (
            <LayoutSignInPage
              title="Failed to login"
              subTitle={
                <p className={styles.error}>
                  You have failed to login more 3 times. Your account has been
                  deactivated. Please contact your system administrator.
                </p>
              }
              content={
                <div className={styles.wrapLink}>
                  <Link href={RoutePaths.Login} className={styles.link}>
                    Back to login page
                  </Link>
                </div>
              }
            />
          ) : (
            <>
              <LayoutSignInPage
                title="2-Factor Authentication"
                subTitle={
                  <p className={styles.subHeader}>
                    {factor.type === "email"
                      ? "Please enter the OTP which we sent to your email."
                      : " Please enter the OTP which was displayed in your authenticator application."}
                  </p>
                }
                content={
                  <Factor2Auth
                    type={factor.type}
                    state={factor.state}
                    onFinish={signInApi}
                    onResend={signInApi}
                  />
                }
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SignIn;
