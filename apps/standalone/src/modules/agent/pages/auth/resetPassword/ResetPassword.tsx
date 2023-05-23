import { SyncOutlined } from "@ant-design/icons";
import {
  generatePath,
  useJob,
  useNavigate,
  useSearchParams,
} from "@moose-desk/core";
import {
  AccountRepository,
  CheckPasswordResetToken,
  ForgotPasswordRequest,
} from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import ResetPasswordExpired from "src/modules/agent/components/ResetPassword/ResetPasswordExpired/ResetPasswordExpired";
import { useStore } from "src/providers/StoreProviders";
import { rulesValidatePassword } from "src/regex";
import RoutePaths from "src/routes/paths";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [finalPage, setFinalPage] = useState(false);
  const navigate = useNavigate();
  const message = useMessage();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { storeId } = useStore();
  const notification = useNotification();
  const { t } = useTranslation();

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
        token: decodeURIComponent(token),
      });
    } else {
      navigate(generatePath(RoutePaths.ResetPassword + "/error"));
    }
  }, [searchParams]);

  const { run: checkTokenApi } = useJob(
    (payload: CheckPasswordResetToken) => {
      return AccountRepository()
        .checkPasswordResetToken(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setIsValid(data.data.isValid);
            } else {
              notification.error(t("messages:error.get_store"));
            }
          })
        );
    },
    { showLoading: true }
  );

  useEffect(() => {
    const userId = searchParams.get("userId");
    const token = searchParams.get("resetToken");
    if (userId && token && storeId) {
      checkTokenApi({
        resetToken: token,
        storeId: storeId,
        userId: userId,
      });
    }
  }, [searchParams, storeId]);

  const { run: resetPasswordApi } = useJob(
    (payload: ForgotPasswordRequest) => {
      message.loading.show(t("messages:loading.send_request_reset_password"));

      return AccountRepository()
        .forgotPasswordResetWithToken(payload)
        .pipe(
          map(() => {
            setFinalPage(true);
            message.loading.hide().then(() => {
              notification.success(
                t("messages:success.account_forgot_password_reset")
              );
            });
          }),
          catchError((err) => {
            if (
              err.response.data.error.some((arr: string) =>
                ["TOKEN_INVALID"].includes(arr)
              )
            ) {
              message.loading.hide().then(() => {
                notification.error(t("messages:error.token_expired"), {
                  description: "Please submit a new request.",
                });
              });
            } else {
              message.loading.hide().then(() => {
                notification.error(
                  t("messages:error.account_forgot_password_reset")
                );
              });
            }
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  const handleSubmit = useCallback(
    (values: { password: string; confirmPassword: string }) => {
      resetPasswordApi({
        password: values.password,
        resetToken: account.token,
        userId: account.userId,
        storeId: storeId,
      });
    },
    [account, storeId]
  );

  return (
    <>
      {isValid !== null && (
        <>
          {isValid ? (
            <div className="resetPassword">
              <div className="card-resetPassword">
                <div className="w-[80%] h-full mx-auto">
                  <div className="card-resetPassword__image">
                    <SyncOutlined style={{ fontSize: 80 }} />
                  </div>
                  {!finalPage ? (
                    <div className="card-form">
                      <Form
                        layout="vertical"
                        initialValues={initialValues}
                        onFinish={handleSubmit}
                      >
                        <Form.Item
                          name="password"
                          label="New Password"
                          rules={[
                            {
                              required: true,
                              message: "Password is required",
                            },
                            ...rulesValidatePassword,
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
                              message: "The confirmation password is required",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(
                                    "The confirmation password is not match"
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
                            navigate(generatePath(RoutePaths.Login))
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
          ) : (
            <ResetPasswordExpired />
          )}
        </>
      )}
    </>
  );
};

export default ResetPassword;
