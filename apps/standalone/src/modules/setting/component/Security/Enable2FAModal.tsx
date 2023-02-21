import { useJob, useMount } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import { Button, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
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
}
export default function Enable2FAModal({
  open,
  setOpen,
  initialValue,
  fetch2FAStatus,
}: Enable2FAModal) {
  const [props, setProps] = useState<{
    method: string;
    key: string;
  }>({
    method: "",
    key: "",
  });
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string>();
  const message = useMessage();
  const notification = useNotification();
  const [status2FA, setStatus2FA] = useState<{
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  }>({
    twoFactorEnabled: false,
    twoFactorMethod: MethodOTP.Disabled,
  });
  const [saveText, setSaveText] = useState("Save");
  // submit enable 2fa

  const [dataSubmit2FA, setDataSubmit2FA] = useState<any>();
  const { run: submit2FA } = useJob((dataSubmit: any) => {
    return UserSettingRepository()
      .setupOtp({ method: dataSubmit })
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setStatus2FA({
              ...status2FA,
              twoFactorMethod: data.data.method,
            });
            setProps(data.data);
            switch (data.data.method) {
              case MethodOTP.Disabled:
                handleCloseModal();
                notification.success(
                  "Your Two-Factor Authentication has been disabled."
                );
                fetch2FAStatus();
                break;
              case MethodOTP.Email:
                setStep(2);
                break;
              case MethodOTP.Authenticator:
                setStep(3);
                break;
              default:
                break;
            }
          } else {
            notification.error("Any problem when send data...");
          }
        }),
        catchError((error) => {
          notification.error("Any problem when send data...");
          return of(error);
        })
      );
  });
  // submit OTP Email

  const [dataSubmitEmailOTP, setDataSubmitEmailOTP] = useState<any>();
  const { run: submitEmailOTP } = useJob((dataSubmit: any) => {
    message.loading.show("Updating Two-Factor Authentication ...");
    return UserSettingRepository()
      .verifySetupOTP({
        method: MethodOTP.Email,
        code: dataSubmit,
      })
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(
              "Your Two-Factor Authentication has been enabled successfully."
            );
            handleCloseModal();
            fetch2FAStatus();
          } else {
            //
            setErrorMessage("Invalid OTP code! Please try again!");
            notification.error("Invalid OTP code! Please try again!");
          }
        }),
        catchError((error) => {
          message.loading.hide();
          notification.error("Invalid OTP code! Please try again!");
          setErrorMessage("Invalid OTP code! Please try again!");
          return of(error);
        })
      );
  });

  // submit External Auth

  const [dataSubmitExternalAuth, setDataSubmitExternalAuth] = useState<any>();
  const { run: submitExternalAuth } = useJob((dataSubmit: any) => {
    return UserSettingRepository()
      .verifySetupOTP({
        method: MethodOTP.Authenticator,
        code: dataSubmit,
      })
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(
              "Your Two-Factor Authentication has been enabled successfully."
            );
            handleCloseModal();
            fetch2FAStatus();
          } else {
            //
            notification.error("Invalid OTP code! Please try again!");
            setErrorMessage("Invalid OTP code! Please try again!");
          }
        }),
        catchError((error) => {
          message.loading.hide();
          setErrorMessage("Invalid OTP code! Please try again!");
          notification.error("Invalid OTP code! Please try again!");
          return of(error);
        })
      );
  });

  // submit close modal
  const handleCloseModal = useCallback(() => {
    setOpen(false);
    setStep(1);
  }, []);
  const handleBackStep = useCallback(() => {
    switch (step) {
      case 2:
        setStep(1);
        break;
      case 3:
        setStep(1);
        break;
      default:
        break;
    }
  }, [step]);
  const handleSubmitModal = useCallback(() => {
    switch (step) {
      case 1:
        submit2FA(dataSubmit2FA);
        break;
      case 2:
        submitEmailOTP(dataSubmitEmailOTP);
        break;
      case 3:
        submitExternalAuth(dataSubmitExternalAuth);
        break;
      default:
        break;
    }
  }, [step, dataSubmit2FA, dataSubmitEmailOTP, dataSubmitExternalAuth]);

  // handle Effect

  useEffect(() => {
    switch (step) {
      case 1:
        setSaveText("Save");
        setErrorMessage("");
        break;
      case 2:
        setSaveText("Confirm");
        break;
      case 3:
        setSaveText("Confirm");
        break;
      default:
        break;
    }
  }, [step]);
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
      title="Enable Two-Factor Authentication"
      open={open}
      width={1000}
      onCancel={handleCloseModal}
      footer={
        <div className="flex-1 text-right mt-4">
          {step === 1 ? null : <Button onClick={handleBackStep}>Cancel</Button>}
          <Button onClick={handleSubmitModal} type="primary" className="ml-4">
            {saveText}
          </Button>
        </div>
      }
    >
      <div className="main-content">
        {step === 1 ? (
          <Enable2FA
            initialValues={status2FA}
            setDataSubmit2FA={setDataSubmit2FA}
          />
        ) : null}
        {step === 2 ? (
          <EmailOTP
            setDataSubmitEmailOTP={setDataSubmitEmailOTP}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        ) : null}
        {step === 3 ? (
          <ExternalAuth
            initialValues={status2FA}
            props={props}
            setDataSubmitExternalAuth={setDataSubmitExternalAuth}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        ) : null}
      </div>
    </Modal>
  );
}
