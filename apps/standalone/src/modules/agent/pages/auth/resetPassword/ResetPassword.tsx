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
import { Button, Form } from "antd";
import Link from "antd/es/typography/Link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { MDInput } from "src/components/UI/Input";
import LayoutSignInPage from "src/components/UI/LayoutSignInPage/LayoutSignInPage";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { useStore } from "src/providers/StoreProviders";
import { rulesValidatePassword } from "src/regex";
import RoutePaths from "src/routes/paths";
import styles from "./styles.module.scss";

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
          }),
          catchError((err) => {
            message.error(t("messages:error.something_went_wrong"));
            return of(err);
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
            <LayoutSignInPage
              title={!finalPage ? "Change password" : "Password changed"}
              subTitle={
                <p className={styles.subHeader}>
                  {!finalPage
                    ? "Please enter your new password and confirm password to change password."
                    : "Your password has been reset successfully. You can try login again with your new password."}
                </p>
              }
              content={
                <div>
                  {!finalPage ? (
                    <div className={styles.formWrap}>
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
                        >
                          <MDInput
                            type="password"
                            placeholder="Enter new password"
                          />
                        </Form.Item>
                        <Form.Item
                          name="confirmPassword"
                          label="Confirm Password"
                          dependencies={["password"]}
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
                          <MDInput
                            type="password"
                            placeholder="Enter confirm password"
                          />
                        </Form.Item>

                        <Button
                          className={styles.buttonChange}
                          size="large"
                          type="primary"
                          htmlType="submit"
                        >
                          Change Password
                        </Button>
                      </Form>
                    </div>
                  ) : (
                    <div className={styles.wrapLink}>
                      <Link href={RoutePaths.Login} className={styles.link}>
                        Back to login page
                      </Link>
                    </div>
                  )}
                </div>
              }
            />
          ) : (
            <LayoutSignInPage
              title="Reset password expired"
              subTitle={
                <p className={styles.error}>
                  The reset password link has expired. if you still want to
                  reset your password. Please start over again.
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
          )}
        </>
      )}
    </>
  );
};

export default ResetPassword;
