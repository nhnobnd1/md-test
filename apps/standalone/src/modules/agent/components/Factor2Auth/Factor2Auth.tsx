import { useMount } from "@moose-desk/core";
import { SignInAccountAgentRequest } from "@moose-desk/repo";
import { Button, Form, Input } from "antd";
import classNames from "classnames";
import { useCallback, useMemo } from "react";
import { useCountDown } from "src/hooks/useCountDown";
import { useStore } from "src/providers/StoreProviders";
import styles from "./styles.module.scss";

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
    <div className={styles.formWrap}>
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="twoFactorCode"
          label="OTP"
          rules={[{ required: true, message: "Please enter code OTP" }]}
        >
          <Input type="text" size="large" placeholder="Enter OTP" />
        </Form.Item>

        <Button
          className={styles.buttonLogin}
          htmlType="submit"
          type="primary"
          size="large"
        >
          Login
        </Button>
        {type === "email" && (
          <div className="d-flex align-center">
            <span
              className={classNames(styles.link, {
                [styles.disabledLink]: !activeResend,
              })}
              onClick={() => activeResend && handleResend()}
            >
              Re-send OTP Code
            </span>
            {!activeResend && <span className={styles.time}>{countDown}s</span>}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Factor2Auth;
