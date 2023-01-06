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
  fetch2FAStatus: () => void;
  show: (data: string) => void;
  setBanner: (data: any) => void;
}
export default function Enable2FAModal({
  open,
  setOpen,
  initialValue,
  fetch2FAStatus,
  show,
  setBanner,
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
    setStep(1);
  }, [open]);
  useEffect(() => {
    if (initialValue.show) {
      setValue(initialValue.method);
    }
  }, [initialValue]);
  useEffect(() => {
    if (initialValue) {
      setStatus2FA({
        twoFactorEnabled: initialValue.show,
        twoFactorMethod: initialValue.method,
      });
    }
  }, [initialValue]);
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
            handleCloseModal={handleCloseModal}
            fetch2FAStatus={fetch2FAStatus}
            show={show}
            setBanner={setBanner}
            setStep={setStep}
          />
        ) : null}
        {step === 2 ? (
          <EmailOTP
            initialValues={status2FA}
            back={setStep}
            handleCloseModal={handleCloseModal}
            fetch2FAStatus={fetch2FAStatus}
            show={show}
            setBanner={setBanner}
          />
        ) : null}
        {step === 3 ? (
          <ExternalAuth
            initialValues={status2FA}
            props={props}
            back={setStep}
            handleCloseModal={handleCloseModal}
            fetch2FAStatus={fetch2FAStatus}
            show={show}
            setBanner={setBanner}
          />
        ) : null}
      </Modal.Section>
    </Modal>
  );
}
