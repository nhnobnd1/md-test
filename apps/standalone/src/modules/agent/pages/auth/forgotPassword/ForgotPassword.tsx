import { useJob, useNavigate } from "@moose-desk/core";
import { AccountRepository } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import Link from "antd/es/typography/Link";
import { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import logo from "src/assets/images/logo/logoBase.png";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { useStore } from "src/providers/StoreProviders";
import RoutePaths from "src/routes/paths";
import styles from "./styles.module.scss";

export const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [finalPage, setFinalPage] = useState({
    status: false,
    isSuccess: false,
  });
  const message = useMessage();
  const { storeId } = useStore();
  const navigate = useNavigate();
  const notification = useNotification();
  const { t } = useTranslation();

  const { run: sendForgotPassword } = useJob(
    (payload: { email: string; storeId: string }) => {
      message.loading.show(t("messages:loading.send_request_forgot_password"));

      return AccountRepository()
        .forgotPasswordReset(payload)
        .pipe(
          map(() => {
            message.loading.hide();
            setFinalPage({
              status: true,
              isSuccess: true,
            });
          }),
          catchError((err) => {
            message.loading.hide();
            notification.error(t("messages:error.forgot_password"));
            setFinalPage({
              status: true,
              isSuccess: false,
            });
            return of(err);
          })
        );
    }
  );

  const handleFinish = useCallback((values: { email: string }) => {
    sendForgotPassword({
      email: values.email,
      storeId: storeId,
    });
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.forgotWrap}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h2>Reset your password</h2>
        {!finalPage.status ? (
          <>
            <p className={styles.subHeader}>
              Please enter your email address and we will send the instructions
              to reset your password
            </p>
            <div className={styles.formWrap}>
              <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Email address is required" },
                    {
                      type: "email",
                      message: "The email address is not valid",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Enter Email" size="large" />
                </Form.Item>
                <Form.Item
                  className="w-full hide-label"
                  name="captcha"
                  label="captcha"
                  rules={[{ required: true, message: "Please enter captcha" }]}
                >
                  <ReCAPTCHA
                    className={styles.reCaptcha}
                    sitekey={env.RECAPTCHA_KEYS}
                    size="normal"
                  ></ReCAPTCHA>
                </Form.Item>
                <Button
                  className={styles.buttonSubmit}
                  onClick={() => form.submit()}
                  type="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </>
        ) : (
          <>
            {finalPage.isSuccess ? (
              <>
                <div className="mb-2 font-medium">
                  We have sent the instructions to your email address.
                </div>
                <div className="mb-8 font-medium">
                  Please follow the instructions in order to reset your
                  password.
                </div>
              </>
            ) : (
              <div className="text-center font-medium mb-8">
                The system failed to send email to your email address, please
                enter a valid email address.
              </div>
            )}
            <div>
              <Link href={RoutePaths.Login} className={styles.link}>
                Back to login page
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
