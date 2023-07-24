import { useJob, useMount } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { MethodOTP, UserSettingRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, ButtonGroup, Modal } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { catchError, map, of } from "rxjs";
import EmailOTP from "src/modules/setting/component/Security/EmailOTP";
import Enable2FA from "src/modules/setting/component/Security/Enable2FA";
import ExternalAuth from "src/modules/setting/component/Security/ExternalAuth";
import "./Enable2FAModal.scss";

interface Enable2FAModal {
  setOpen: (status: boolean) => void;
  open: boolean;
  fetch2FAStatus: () => void;
  onOpenRecoveryCode: () => void;
}
const Enable2FAModal = React.memo(
  ({ open, setOpen, fetch2FAStatus, onOpenRecoveryCode }: Enable2FAModal) => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const { show } = useToast();
    const [props, setProps] = useState<{
      method: string;
      key: string;
    }>({
      method: "",
      key: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>();
    const [saveText, setSaveText] = useState("Save");

    const [step, setStep] = useState(1);
    const [status2FA, setStatus2FA] = useState<{
      twoFactorEnabled: boolean;
      twoFactorMethod: string;
    }>({
      twoFactorEnabled: false,
      twoFactorMethod: MethodOTP.Disabled,
    });

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
                  show(t("messages:success.disable_two_factor"));
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
              show(t("messages:error.something_went_wrong"));
            }
          }),
          catchError((error) => {
            show(t("messages:error.something_went_wrong"));

            return of(error);
          })
        );
    });
    // submit OTP Email

    const [dataSubmitEmailOTP, setDataSubmitEmailOTP] = useState<any>();
    const { run: submitEmailOTP, processing: submittingEmail } = useJob(
      (dataSubmit: any) => {
        // message.loading.show(t("messages:loading.updating_two_factor"));

        return UserSettingRepository()
          .verifySetupOTP({
            method: MethodOTP.Email,
            code: dataSubmit,
          })
          .pipe(
            map(({ data }) => {
              // message.loading.hide();
              if (data.statusCode === 200) {
                show(t("messages:success.enable_two_factor"));
                handleCloseModal();
                fetch2FAStatus();
                onOpenRecoveryCode();
              } else {
                //
                // setErrorMessage("The input OTP is incorrect!");
                show(t("messages:error.input_otp"));
              }
            }),
            catchError((error) => {
              // message.loading.hide();
              show(t("messages:error.input_otp"));

              // setErrorMessage("The input OTP is incorrect!");
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
              // message.loading.hide();
              if (data.statusCode === 200) {
                show(t("messages:success.enable_two_factor"));
                handleCloseModal();
                fetch2FAStatus();
                onOpenRecoveryCode();
              } else {
                //
                show(t("messages:error.input_otp"));

                // setErrorMessage("The input OTP is incorrect!");
              }
            }),
            catchError((error) => {
              // message.loading.hide();
              // setErrorMessage("The input OTP is incorrect!");
              show(t("messages:error.input_otp"));

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

    useMount(() => {
      setStep(1);
      const data: any = queryClient.getQueryData(QUERY_KEY.TWO_FA_STATUS);
      setStatus2FA({
        twoFactorEnabled: data?.data?.data?.twoFactorEnabled,
        twoFactorMethod: data?.data?.data?.twoFactorMethod,
      });
    });
    return (
      <Modal
        open={open}
        onClose={handleCloseModal}
        title="Enable Two-Factor Authentication"
      >
        {/* <Modal.Section> */}
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
        <div className="group-button-footer">
          <ButtonGroup>
            {step === 1 ? null : (
              <Button onClick={handleBackStep}>Cancel</Button>
            )}
            <Button
              loading={processing || submitting || submittingEmail}
              onClick={handleSubmitModal}
              primary
            >
              {saveText}
            </Button>
          </ButtonGroup>
        </div>
        {/* </Modal.Section> */}
      </Modal>
    );
  }
);
export default Enable2FAModal;
