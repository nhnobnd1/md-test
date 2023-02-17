import { useMount } from "@moose-desk/core";
import { SignInAccountAgentRequest } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import classNames from "classnames";
import { useCallback, useMemo } from "react";
import { useCountDown } from "src/hooks/useCountDown";
import { useStore } from "src/providers/StoreProviders";
import "./Factor2Auth.scss";

interface Factor2AuthProps {
  type: "email" | "authenticator";
  errorMessage?: string;
  state: {
    email: string;
    password: string;
    subdomain: string | null;
  };
  onFinish: (payload: SignInAccountAgentRequest) => void;
  onResend: (payload: SignInAccountAgentRequest, resend: boolean) => void;
}

export const Factor2Auth = ({
  type,
  state,
  errorMessage,
  onFinish,
  onResend,
}: Factor2AuthProps) => {
  const {
    state: countDown,
    initCountdown,
    checkTimerProcess,
  } = useCountDown({
    initValue: 300,
    key: "factor2auth",
  });
  const { storeId } = useStore();

  const activeResend = useMemo(() => {
    return !checkTimerProcess;
  }, [checkTimerProcess]);

  useMount(() => {
    if (activeResend) {
      initCountdown("factor2auth");
    }
  });

  const handleFinish = useCallback(
    (values: { twoFactorCode: string }) => {
      onFinish({
        email: state.email,
        password: state.password,
        ...(state.subdomain && {
          subdomain: state.subdomain,
        }),
        storeId: storeId,
        twoFactorCode: values.twoFactorCode,
      });
    },
    [state]
  );

  const handleResend = useCallback(() => {
    initCountdown("factor2auth");
    onResend(
      {
        email: state.email,
        password: state.password,
        storeId: storeId,
        ...(state.subdomain && {
          subdomain: state.subdomain,
        }),
      },
      true
    );
  }, [state]);
  return (
    <div className="h-full pt-[20%]">
      <h2 className="mb-8 text-center">2-Factor Authentication</h2>
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
        {errorMessage && (
          <div className="error-message mt-2">{errorMessage}</div>
        )}
        <div className="mt-4">
          <span
            className={classNames(["link text-base"], {
              disabled: !activeResend,
            })}
            onClick={() => activeResend && handleResend()}
          >
            Re-send OTP {!activeResend && `(${countDown})`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Factor2Auth;
