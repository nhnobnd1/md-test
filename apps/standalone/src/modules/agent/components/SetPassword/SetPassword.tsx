import { useJob, useNavigate } from "@moose-desk/core";
import { ActiveNewAgentRequest, AgentRepository } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { rulesValidatePassword } from "src/regex";
import RoutePaths from "src/routes/paths";
import "./SetPassword.scss";
interface SetPasswordProps {
  agentName: string;
  email: string;
  storeId: string;
  token: string;
}

export const SetPassword = ({
  agentName,
  email,
  storeId,
  token,
}: SetPasswordProps) => {
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();
  const { t, i18n } = useTranslation();

  const { run: activeNewAgent } = useJob(
    (payload: ActiveNewAgentRequest) => {
      message.loading.show(t("messages:loading.activating_account"));

      return AgentRepository()
        .activeNewAgent(payload)
        .pipe(
          map(({ data }) => {
            message.loading.hide().then(() => {
              if (data.statusCode === 200) {
                notification.success(t("messages:success.account_activation"));
                navigate(RoutePaths.Login);
              } else {
                if (data.statusCode === 404) {
                  notification.error(t("messages:error.token_expired"));
                } else {
                  notification.error(t("messages:error.account_activation"));
                }
              }
            });
          }),
          catchError((err) => {
            message.loading.hide().then(() => {
              notification.error(t("messages:error.account_activation"));
            });
            return of(err);
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const handleFinish = (values: {
    password: string;
    confirmPassword: string;
  }) => {
    const payload: ActiveNewAgentRequest = {
      token,
      email,
      storeId,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    activeNewAgent(payload);
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-[400px]">
      <h4 className="mb-6">
        Welcome {agentName} to the support portal. Before starting to use the
        support portal, please create a password which will be used for your
        authentications.
      </h4>
      <Form layout="vertical" className="w-full" onFinish={handleFinish}>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            {
              required: true,
              message: "The password is required",
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
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The confirmation password is not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <div className="text-center">
          <Button type="primary" htmlType="submit">
            Create Password
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SetPassword;
