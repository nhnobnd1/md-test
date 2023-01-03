import { SignInAccountAgentRequest } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import "./Factor2Auth.scss";

interface Factor2AuthProps {
  type: "email" | "authenticator";
  state: {
    email: string;
    password: string;
  };
  onFinish: (payload: SignInAccountAgentRequest) => void;
  onResend: (payload: SignInAccountAgentRequest, resend: boolean) => void;
}

export const Factor2Auth = ({
  type,
  state,
  onFinish,
  onResend,
}: Factor2AuthProps) => {
  const [intervalValue, setIntervalValue] = useState(30);
  const [activeResend, setActiveResend] = useState(true);

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

  useEffect(() => {
    // eslint-disable-next-line no-undef-init
    let intervalId: any = undefined;
    if (!activeResend) {
      intervalId = setInterval(() => {
        setIntervalValue((value) => {
          return value >= 1 ? value - 1 : value;
        });
        if (intervalValue === 0) {
          setActiveResend(true);
          setIntervalValue(30);
          clearInterval(intervalId);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [activeResend, intervalValue]);

  const handleResend = useCallback(() => {
    setActiveResend(false);
    onResend(
      {
        email: state.email,
        password: state.password,
      },
      true
    );
  }, [state]);
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
          <Form.Item
            name="twoFactorCode"
            rules={[{ required: true, message: "Please enter code OTP" }]}
          >
            <Input type="text"></Input>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            Login
          </Button>
        </Form>
        <div className="mt-4">
          <span
            className={classNames(["link text-base"], {
              disabled: !activeResend,
            })}
            onClick={() => activeResend && handleResend()}
          >
            Re-send OTP {!activeResend && `(${intervalValue})`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Factor2Auth;
