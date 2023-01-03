import { SignInAccountAgentRequest } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import { useCallback } from "react";
import "./Factor2Auth.scss";

interface Factor2AuthProps {
  type: "email" | "authenticator";
  state: {
    email: string;
    password: string;
  };
  onFinish: (payload: SignInAccountAgentRequest) => void;
}

export const Factor2Auth = ({ type, state, onFinish }: Factor2AuthProps) => {
  const handleFinish = useCallback(
    (values: { twoFactorCode: string }) => {
      onFinish({
        email: state.email,
        password: state.password,
        twoFactorCode: values.twoFactorCode,
      });
    },
    [state]
  );
  return (
    <div className="h-full pt-[20%]">
      <h2 className="mb-6">2-Factor Authentication</h2>
      <div className="form">
        {type === "email" ? (
          <p>Please enter the OTP which we sent to your email.</p>
        ) : (
          <p>
            Please enter the OTP which was displayed in your authenticator
            application.
          </p>
        )}

        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="twoFactorCode">
            <Input type="text"></Input>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Form>
        <div className="mt-4">
          <span className="link text-base">Re-send OTP</span>
        </div>
      </div>
    </div>
  );
};

export default Factor2Auth;
