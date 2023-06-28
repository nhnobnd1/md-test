/* eslint-disable react/no-unescaped-entities */
import { useJob } from "@moose-desk/core";
import { EmailIntegrationRepository } from "@moose-desk/repo";
import { Result, Spin, Typography } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { MDButton } from "src/components/UI/Button/MDButton";
import useMessage from "src/hooks/useMessage";
import useMailSetting from "src/modules/settingChannel/store/useMailSetting";

interface ContentWaitProps {
  email: string;
  formEmail: FormInstance<any>;
}

export const SenderVerifyStep: FC<ContentWaitProps> = React.memo(
  ({ email, formEmail }) => {
    const [isVerifySender, setIsVerifySender] = useState("Pending");
    const [retrySenderCount, setRetrySenderCount] = useState(0);
    const message = useMessage();
    const { t } = useTranslation();
    const createForwardEmail = useMailSetting(
      (state) => state.createForwardEmail
    );

    const { run: verifyFinish } = useJob((payload: string) => {
      return EmailIntegrationRepository()
        .sendVerifyEmailSes(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setRetrySenderCount(1);
            }
          }),
          catchError((err) => {
            message.error(t("messages:error.something_went_wrong"));

            return of(err);
          })
        );
    });

    const { run: checkVerifyEmailFirstTime } = useJob((payload: string) => {
      return EmailIntegrationRepository()
        .checkVerifyEmailSes(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              if (data.data.isVerified) {
                formEmail.setFieldValue("supportEmail", email);
                setIsVerifySender("Success");
                createForwardEmail(true);
              } else {
                verifyFinish(payload);
              }
            }
          }),
          catchError((err) => {
            message.error(t("messages:error.something_went_wrong"));

            return of(err);
          })
        );
    });

    const { run: checkVerifyEmail } = useJob((payload: string) => {
      return EmailIntegrationRepository()
        .checkVerifyEmailSes(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              if (data.data.isVerified) {
                formEmail.setFieldValue("supportEmail", email);
                setIsVerifySender("Success");
                createForwardEmail(true);
              } else {
                setTimeout(() => {
                  setRetrySenderCount(retrySenderCount + 1);
                }, 3000);
              }
            }
          }),
          catchError((err) => {
            message.error(t("messages:error.something_went_wrong"));

            return of(err);
          })
        );
    });
    const handleClickButtonCheck = () => {
      setRetrySenderCount(2);
      setIsVerifySender("Pending");
    };
    useEffect(() => {
      if (retrySenderCount === 20) {
        setIsVerifySender("Fail");
        setRetrySenderCount(0);
        return;
      }
      if (retrySenderCount > 0 && isVerifySender !== "Success") {
        checkVerifyEmail(email);
      }
    }, [retrySenderCount, isVerifySender]);

    useEffect(() => {
      if (retrySenderCount === 0) {
        checkVerifyEmailFirstTime(email);
      }
      return () => {
        createForwardEmail(false);
      };
    }, []);

    if (isVerifySender === "Success") {
      return (
        <div className="flex flex-col items-center">
          <Result status="success" title="Your setup has been successful" />
        </div>
      );
    }
    if (isVerifySender === "Fail") {
      return (
        <div className="flex flex-col items-center">
          <Result
            status="error"
            // title="Your setup has been failure"
            subTitle="Cannot be verified yet. Please check your email and click on the link to verify. Click on the re-check button to check the verification status again"
            extra={[
              <MDButton
                onClick={handleClickButtonCheck}
                type="primary"
                key="console"
              >
                Re-check
              </MDButton>,
            ]}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <Typography.Title level={3}>
          Sender Verification in progress ...
        </Typography.Title>
        <div className="flex justify-start items-start gap-2  mt-5">
          <div className="flex flex-col">
            <p className="text-center">
              We have sent a verification email to the address {email}
            </p>
            <p className="text-center">
              Please check your inbox and click on the verification link to
              complete the verification process
            </p>
            <p className="text-center"></p>
          </div>
        </div>
        <Spin size="large" className="mt-2" />
      </div>
    );
  }
);
