import { SyncOutlined } from "@ant-design/icons";
import {
  generatePath,
  useJob,
  useNavigate,
  useSearchParams,
} from "@moose-desk/core";
import { AccountRepository, ForgotPasswordRequest } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import { useStore } from "src/providers/StoreProviders";
import "./ResetPassword.scss";

interface ResetPasswordProps {}

const ResetPassword = (props: ResetPasswordProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [finalPage, setFinalPage] = useState(false);
  const navigate = useNavigate();
  const message = useMessage();
  const { storeId } = useStore();
  const notification = useNotification();
  const [account, setAccount] = useState({
    userId: "",
    token: "",
  });
  const initialValues = useMemo(() => {
    return {
      password: "",
      passwordConfirm: "",
    };
  }, []);

  useEffect(() => {
    const userId = searchParams.get("userId");
    const token = searchParams.get("resetToken");
    if (userId && token) {
      setAccount({
        userId,
        token,
      });
    } else {
      navigate(generatePath(AgentRoutePaths.ResetPassword + "/error"));
    }
  }, [searchParams]);

  const { run: resetPasswordApi } = useJob((payload: ForgotPasswordRequest) => {
    message.loading.show("Sending request reset password");
    return AccountRepository()
      .forgotPasswordResetWithToken(payload)
      .pipe(
        map(() => {
          setFinalPage(true);
          message.loading.hide().then(() => {
            notification.success("Sending request success");
          });
        }),
        catchError((err) => {
          if (["TOKEN_INVALID"].includes(err.response.data.error)) {
            message.loading.hide().then(() => {
              notification.error("Token has expired or is not valid.", {
                description: "Please submit a new request.",
              });
            });
          } else {
            message.loading.hide().then(() => {
              notification.error("Reset password failed");
            });
          }
          return of(err);
        })
      );
  });

  const handleSubmit = useCallback(
    (values: { password: string; confirmPassword: string }) => {
      resetPasswordApi({
        password: values.password,
        resetToken: account.token,
        userId: account.userId,
        storeId: storeId,
      });
    },
    [account]
  );

  return (
    <div className="resetPassword">
      <div className="card">
        <div className="w-[80%] h-full mx-auto">
          <div className="pt-[40px]">
            <div className="card-image">
              <SyncOutlined style={{ fontSize: 120 }} />
            </div>
            {!finalPage ? (
              <div className="card-form">
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  initialValues={initialValues}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g,
                        message:
                          "Password must be have 8 characters long with uppercase, lowercase, number and wildcards",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
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
                      Change Password
                    </Button>
                  </div>
                </Form>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  Your password has been reseted successfully.
                </div>
                <div className="text-center mb-[24px]">
                  You can try login again with your new password.
                </div>
                <div className="text-center">
                  <span
                    className="link"
                    onClick={() =>
                      navigate(generatePath(AgentRoutePaths.Login))
                    }
                  >
                    Back to login page
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
