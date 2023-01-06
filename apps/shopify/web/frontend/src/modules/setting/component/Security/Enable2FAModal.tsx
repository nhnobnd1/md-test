import { useMount } from "@moose-desk/core";
import { MethodOTP } from "@moose-desk/repo";
import { Modal } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import EmailOTP from "src/modules/setting/component/Security/EmailOTP";
import Enable2FA from "src/modules/setting/component/Security/Enable2FA";
import ExternalAuth from "src/modules/setting/component/Security/ExternalAuth";
import "./Enable2FAModal.scss";
interface Enable2FAModal {
  setOpen: (status: boolean) => void;
  open: boolean;
  initialValue: {
    status: boolean;
    show: boolean;
    method: string;
  };
}
export default function Enable2FAModal({
  open,
  setOpen,
  initialValue,
}: Enable2FAModal) {
  const [value, setValue] = useState("");
  const [props, setProps] = useState<{
    method: string;
    key: string;
  }>({
    method: "",
    key: "",
  });
  const [step, setStep] = useState(1);
  const [status2FA, setStatus2FA] = useState<{
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  }>({
    twoFactorEnabled: false,
    twoFactorMethod: MethodOTP.Disabled,
  });
  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, [open]);
  useEffect(() => {
    if (initialValue.show) {
      setValue(initialValue.method);
    }
  }, [initialValue]);
  useEffect(() => {
    if (status2FA.twoFactorMethod === MethodOTP.Email) {
      setStep(2);
    } else {
      if (status2FA.twoFactorMethod === MethodOTP.Authenticator) {
        setStep(3);
      } else {
        setStep(1);
      }
    }
  }, [status2FA]);
  useEffect(() => {
    if (initialValue) {
      setStatus2FA({
        twoFactorEnabled: initialValue.show,
        twoFactorMethod: initialValue.method,
      });
    }
  }, [initialValue]);
  useEffect(() => {}, [step]);
  useMount(() => setStep(1));
  return (
    <Modal
      large
      open={open}
      onClose={handleCloseModal}
      title="Enable Two-Factor Authentication"
    >
      <Modal.Section>
        {step === 1 ? (
          <Enable2FA
            initialValues={status2FA}
            handleData2FA={setStatus2FA}
            setProps={setProps}
          />
        ) : null}
        {step === 2 ? (
          <EmailOTP initialValues={status2FA} back={setStep} />
        ) : null}
        {step === 3 ? (
          <ExternalAuth
            initialValues={status2FA}
            props={props}
            back={setStep}
          />
        ) : null}
      </Modal.Section>
    </Modal>
  );
}
