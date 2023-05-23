/* eslint-disable react/no-unescaped-entities */
import { useJob } from "@moose-desk/core";
import { EmailIntegrationRepository } from "@moose-desk/repo";
import { Button, Result, Spin, Typography } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";

interface ContentWaitProps {
  email: string;
  formEmail: FormInstance<any>;
}

export const SenderVerifyStep: FC<ContentWaitProps> = ({
  email,
  formEmail,
}) => {
  const [isVerifySender, setIsVerifySender] = useState("Pending");
  const [retrySenderCount, setRetrySenderCount] = useState(0);
  const message = useMessage();
  const { t } = useTranslation();

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

  const { run: checkVerifyEmail } = useJob((payload: string) => {
    return EmailIntegrationRepository()
      .checkVerifyEmailSes(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.isVerified) {
              formEmail.setFieldValue("supportEmail", email);
              setIsVerifySender("Success");
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
      verifyFinish(email);
    }
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
            <Button
              onClick={() => {
                setRetrySenderCount(2);
                setIsVerifySender("Pending");
              }}
              type="primary"
              key="console"
            >
              Re-check
            </Button>,
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
            To use your email for sending tickets, we have sent a verification
            email to the address {email}
          </p>
          <p className="text-center">
            Please check your inbox and click on the link within to use this
            email for sending tickets
          </p>
          <p className="text-center"></p>
        </div>
      </div>
      <Spin size="large" className="mt-2" />
    </div>
  );
};
