import { useJob, useMount } from "@moose-desk/core";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Header } from "src/components/UI/Header";
import { MDModal } from "src/components/UI/Modal/MDModal";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import EmailOTP from "src/modules/setting/component/Security/EmailOTP";
import Enable2FA from "src/modules/setting/component/Security/Enable2FA";
import ExternalAuth from "src/modules/setting/component/Security/ExternalAuth";
import "./Enable2FAModal.scss";
import styles from "./styles.module.scss";
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
  const { t } = useTranslation();

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
  const { run: submit2FA, processing } = useJob((dataSubmit: any) => {
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
                notification.success(t("messages:success.disable_two_factor"));
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
            notification.error(t("messages:error.something_went_wrong"));
          }
        }),
        catchError((error) => {
          notification.error(t("messages:error.something_went_wrong"));

          return of(error);
        })
      );
  });
  // submit OTP Email

  const [dataSubmitEmailOTP, setDataSubmitEmailOTP] = useState<any>();
  const { run: submitEmailOTP, processing: submittingEmail } = useJob(
    (dataSubmit: any) => {
      message.loading.show(t("messages:loading.updating_two_factor"));

      return UserSettingRepository()
        .verifySetupOTP({
          method: MethodOTP.Email,
          code: dataSubmit,
        })
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              notification.success(t("messages:success.enable_two_factor"));
              handleCloseModal();
              fetch2FAStatus();
            } else {
              //
              setErrorMessage("The input OTP is incorrect!");
              notification.error(t("messages:error.input_otp"));
            }
          }),
          catchError((error) => {
            message.loading.hide();
            notification.error(t("messages:error.input_otp"));

            setErrorMessage("The input OTP is incorrect!");
            return of(error);
          })
        );
    }
  );

  // submit External Auth

  const [dataSubmitExternalAuth, setDataSubmitExternalAuth] = useState<any>();
  const { run: submitExternalAuth, processing: submitting } = useJob(
    (dataSubmit: any) => {
      return UserSettingRepository()
        .verifySetupOTP({
          method: MethodOTP.Authenticator,
          code: dataSubmit,
        })
        .pipe(
          map(({ data }) => {
            message.loading.hide();
            if (data.statusCode === 200) {
              notification.success(t("messages:success.enable_two_factor"));

              handleCloseModal();
              fetch2FAStatus();
            } else {
              //
              notification.error(t("messages:error.input_otp"));

              setErrorMessage("The input OTP is incorrect!");
            }
          }),
          catchError((error) => {
            message.loading.hide();
            setErrorMessage("The input OTP is incorrect!");
            notification.error(t("messages:error.input_otp"));

            return of(error);
          })
        );
    }
  );

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
    <MDModal
      open={open}
      onCancel={handleCloseModal}
      rootClassName={styles.modal2FA}
      onClose={handleCloseModal}
      footer={
        <div className={classNames(styles.footerButton, "text-right")}>
          {step === 1 ? null : (
            <MDButton onClick={handleBackStep}>Cancel</MDButton>
          )}
          <MDButton
            loading={processing || submitting || submittingEmail}
            onClick={handleSubmitModal}
            type="primary"
            className="ml-4"
          >
            {saveText}
          </MDButton>
        </div>
      }
    >
      <div className={styles.title}>
        <Header subTitle="Enable Two-Factor Authentication" />
      </div>
      {step === 1 ? (
        <div className={styles.mainContentModal2FA}>
          <Enable2FA
            initialValues={status2FA}
            setDataSubmit2FA={setDataSubmit2FA}
          />
        </div>
      ) : null}
      {step === 2 ? (
        <div className={styles.mainContentModal2FA}>
          <EmailOTP
            setDataSubmitEmailOTP={setDataSubmitEmailOTP}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      ) : null}
      {step === 3 ? (
        <div className={styles.mainContentModal2FA}>
          <ExternalAuth
            initialValues={status2FA}
            props={props}
            setDataSubmitExternalAuth={setDataSubmitExternalAuth}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </div>
      ) : null}
    </MDModal>
  );
}
