import { Button, Form, Input } from "antd";
import "./SetPassword.scss";
interface SetPasswordProps {
  agentName: string;
}

export const SetPassword = ({ agentName }: SetPasswordProps) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[400px]">
      <h4 className="mb-6">
        Welcome {agentName} to the support portal. Before starting to use the
        support portal, please create a password which will be used for your
        authentications.
      </h4>
      <Form layout="vertical" className="w-full">
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern:
                /^(?=.*[a-z])(?=.*?[A-Z])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g,
              message:
                "Password must be have 8 characters long with Capital letter, lowercase letter, wild cards",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
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
