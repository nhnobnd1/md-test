import { LockOutlined } from "@ant-design/icons";
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
import logo from "src/assets/images/logo/logoBase.png";
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
    <section className={styles.container}>
      <div className={styles.loginWrap}>
        <img className={styles.logo} src={logo} alt="logo" />
        {view === "login" ? (
          <div>
            <div className="card-signin__image">
              {!errorMessage ? (
                <div>
                  <h2>Sign In</h2>
                  <p className={styles.subHeader}>
                    Please enter your credentials to sign in!
                  </p>
                </div>
              ) : (
                <div>
                  <h2>Sign In</h2>
                  <p className={styles.error}>{errorMessage}</p>
                </div>
              )}
            </div>
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
                <div>
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
          </div>
        ) : (
          <>
            {view === "lock" ? (
              <div className="pt-[40px] w-full h-full">
                <div className="card-signin__image">
                  <LockOutlined style={{ fontSize: 120 }} />
                </div>
                <div className="mb-6">
                  You have failed to login more 3 times. Your account has been
                  deactivated. Please contact your system administrator.
                </div>
                <div className="mb-4 text-center">
                  <span
                    className="link font-semibold"
                    onClick={() => navigate(DashboardRoutePaths.Index)}
                  >
                    Return to home page
                  </span>
                </div>
                {/* <div>
                    Want to get started with MooseDesk? Create a{" "}
                    <span className="link">free account</span> here.
                  </div> */}
              </div>
            ) : (
              <>
                <Factor2Auth
                  type={factor.type}
                  state={factor.state}
                  onFinish={signInApi}
                  onResend={signInApi}
                />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default SignIn;
