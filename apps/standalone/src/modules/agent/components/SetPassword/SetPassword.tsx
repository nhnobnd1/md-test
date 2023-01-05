import { useJob, useNavigate } from "@moose-desk/core";
import { ActiveNewAgentRequest, AgentRepository } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import AgentRoutePaths from "src/modules/agent/routes/paths";
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

  const { run: activeNewAgent } = useJob(
    (payload: ActiveNewAgentRequest) => {
      message.loading.show("Activating account");
      return AgentRepository.activeNewAgent(payload).pipe(
        map(({ data }) => {
          message.loading.hide().then(() => {
            if (data.statusCode === 200) {
              notification.success("Account activation successful");
              navigate(AgentRoutePaths.Login);
            } else {
              notification.error("Account activation failed");
            }
          });
        }),
        catchError((err) => {
          message.loading.hide().then(() => {
            notification.error("Account activation failed");
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
                  new Error("The two passwords that you entered do not match!")
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