/* eslint-disable react/no-unescaped-entities */
import { useJob } from "@moose-desk/core";
import { EmailIntegrationRepository } from "@moose-desk/repo";
import { Result, Spin, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";

interface ContentWaitProps {
  email: string;
}
type Status = "Pending" | "Success" | "Fail";

export const SenderVerifyStep: FC<ContentWaitProps> = ({ email }) => {
  const [isVerifySender, setIsVerifySender] = useState("Pending");
  const [retrySenderCount, setRetrySenderCount] = useState(0);
  const message = useMessage();

  const { run: verifyFinish } = useJob((payload: string) => {
    return EmailIntegrationRepository()
      .sendVerifyEmailSes(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            console.log("send verify success");
            setRetrySenderCount(1);
          }
        }),
        catchError((err) => {
          message.error("Something went wrong !");
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
              setIsVerifySender("Success");
            } else {
              setTimeout(() => {
                setRetrySenderCount(retrySenderCount + 1);
              }, 3000);
            }
          }
        }),
        catchError((err) => {
          message.error("Something went wrong !");
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

  return (
    <div className="flex flex-col items-center">
      <Typography.Title level={3}>
        Sender Verification in progress ...
      </Typography.Title>
      <div className="flex justify-start items-start gap-2 w-[340px] mt-5">
        <div className="flex flex-col">
          <p className="text-center">
            To use the email {email} for sending messages, we have sent an email
            to {email}.
          </p>
          <p className="text-center">
            Please check your mailbox and click on the link in the email to
            authenticate the sender.
          </p>
        </div>
      </div>
      <Spin size="large" className="mt-2" />
    </div>
  );
};
