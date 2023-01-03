import { useAuthContext, useJob, useNavigate } from "@moose-desk/core";
import { AccountRepository, SignInAccountAgentRequest } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import { useCallback, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { Factor2Auth } from "src/modules/agent/components/Factor2Auth";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import "./SignIn.scss";

interface SignInProps {}

export const SignIn = (props: SignInProps) => {
  const { login } = useAuthContext();
  const notification = useNotification();
  const message = useMessage();
  const [view, setView] = useState<"login" | "lock" | "factor2Auth">("login");
  const [factor, setFactor] = useState<{
    type: "email" | "authenticator";
    state: {
      email: string;
      password: string;
    };
  }>({
    type: "email",
    state: {
      email: "",
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = useMemo(() => {
    return {
      email: "",
      password: "",
    };
  }, []);

  const { run: signInApi } = useJob(
    (payload: SignInAccountAgentRequest, resend?: boolean) => {
      return AccountRepository.agentSignIn(payload).pipe(
        map(({ data }) => {
          notification.success("Login successfully");
          login({
            base_token: data.data.accessToken,
            refresh_token: data.data.refreshToken,
          });
          navigate(DashboardRoutePaths.Index);
        }),
        catchError((err) => {
          if (resend) {
            message.success("Requested to resend OTP");
          }
          const error = err.response.data.error;
          if (
            [
              "RequiresTwoFactor_Authenticator",
              "RequiresTwoFactor_Email",
            ].includes(err.response.data.errorCode)
          ) {
            setView("factor2Auth");
            setFactor({
              type:
                err.response.data.errorCode === "RequiresTwoFactor_Email"
                  ? "email"
                  : "authenticator",
              state: {
                email: payload.email,
                password: payload.password,
              },
            });
          } else {
            notification.error("Login failed");
            const numberLoginFailed = error[0].split("/")[0];
            const totalAcceptFailed = error[0].split("/")[1];
            if (numberLoginFailed < totalAcceptFailed) {
              setErrorMessage(
                "The email or password is incorrect. You have 3 remaining attempts to login"
              );
            } else {
              setErrorMessage("");
              setView("lock");
            }
          }

          return of(err);
        })
      );
    },
    { showLoading: true }
  );

  const handleSubmit = useCallback(
    (values: { email: string; password: string }) => {
      signInApi({
        email: values.email,
        password: values.password,
      });
    },
    []
  );

  return (
    <div className="signIn">
      <div className="card-signin">
        <div className="w-[80%] h-full mx-auto">
          {view === "login" ? (
            <>
              <div className="card-signin__image">
                <img src="" alt="" />
              </div>
              <div className="card-signin__form">
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  initialValues={initialValues}
                  onFinish={handleSubmit}
                >
                  <div>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Please input your email" },
                        { type: "email", message: "Email is invalid" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: "Please input your password" },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*?[A-Z])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g,
                        message:
                          "Password must be have 8 characters long with Capital letter, lowercase letter, wild cards",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <div className="text-center">
                    <Button
                      className="mb-4 mt-1"
                      type="primary"
                      htmlType="submit"
                    >
                      Login
                    </Button>
                    {errorMessage && (
                      <div className="error-message">
                        The email or password is incorrect. You have 3 remaining
                        attempts to login
                      </div>
                    )}

                    <div className="link">Forgot Password?</div>
                  </div>
                  <div className="mt-5 w-[80%] mx-auto text-center">
                    Want to get started with MooseDesk? Create a{" "}
                    <span className="link">free account</span> here.
                  </div>
                </Form>
              </div>
            </>
          ) : (
            <>
              {view === "lock" ? (
                <div className="flex justify-center flex-col w-full h-full">
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
                  <div>
                    Want to get started with MooseDesk? Create a{" "}
                    <span className="link">free account</span> here.
                  </div>
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
      </div>
    </div>
  );
};

export default SignIn;
