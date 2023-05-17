import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import { AccountRepository } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import env from "src/core/env";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { useStore } from "src/providers/StoreProviders";
import RoutePaths from "src/routes/paths";
import "./ForgotPassword.scss";
interface ForgotPasswordProps {}

export const ForgotPassword = (props: ForgotPasswordProps) => {
  const [form] = Form.useForm();
  const [finalPage, setFinalPage] = useState({
    status: false,
    isSuccess: false,
  });
  const message = useMessage();
  const { storeId } = useStore();
  const navigate = useNavigate();
  const notification = useNotification();
  const { t, i18n } = useTranslation();

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
    <div className="forgotPassword">
      <div className="card-forgot-password">
        <div className="pt-[10%]">
          <h2 className="text-center mb-[40px]">Reset your password</h2>
          {!finalPage.status ? (
            <>
              <div className="text-center mb-6">
                Please enter your email address and we will send the
                instructions to reset your password
              </div>
              <div>
                <Form
                  layout="horizontal"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                  form={form}
                  onFinish={handleFinish}
                >
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
                    <Input type="text" />
                  </Form.Item>
                  <div className="flex">
                    <Form.Item
                      className="w-full hide-label"
                      name="captcha"
                      label="captcha"
                      rules={[
                        { required: true, message: "Please enter captcha" },
                      ]}
                    >
                      <ReCAPTCHA
                        className="capt-cha"
                        sitekey={env.RECAPTCHA_KEYS}
                      ></ReCAPTCHA>
                    </Form.Item>
                  </div>
                  <div className="text-center">
                    <Button onClick={() => form.submit()} type="primary">
                      Submit
                    </Button>
                  </div>
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
              <div className="text-center">
                <span
                  className="link"
                  onClick={() => navigate(generatePath(RoutePaths.Login))}
                >
                  Back to login page
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
