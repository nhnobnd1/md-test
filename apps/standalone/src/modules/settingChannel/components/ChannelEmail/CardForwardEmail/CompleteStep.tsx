/* eslint-disable react/no-unescaped-entities */
import { Button, Result, Spin, Typography } from "antd";
import { FormInstance } from "antd/lib/form/Form";
import React, { Dispatch, FC, SetStateAction, useEffect } from "react";
import { SenderVerifyStep } from "src/modules/settingChannel/components/ChannelEmail/CardForwardEmail/SenderVerifyStep";
interface ContentWaitProps {
  setStep: Dispatch<SetStateAction<number>>;
  handleVerifyFinish: () => void;
  isVerified: Status;
  email: string;
  formEmail: FormInstance<any>;
  setRetryCount: Dispatch<SetStateAction<number>>;
  setIsVerified: Dispatch<SetStateAction<Status>>;
  sendVerify: () => void;
}
type Status = "Pending" | "Success" | "Fail";

export const CompleteStep: FC<ContentWaitProps> = React.memo(
  ({
    children,
    setStep,
    handleVerifyFinish,
    isVerified,
    email,
    formEmail,
    setRetryCount,
    setIsVerified,
    sendVerify,
  }) => {
    //   const [status, setStatus] = useState<Status>("Pending");
    useEffect(() => {
      handleVerifyFinish();
    }, []);
    if (isVerified === "Pending") {
      return (
        <div className="flex flex-col items-center">
          <Typography.Title level={3}>Checking your setup</Typography.Title>
          <div className="flex justify-start items-start gap-2 w-[340px] mt-5">
            <div className="flex flex-col">
              <p className="text-center">
                We are verifying that your email account is connected to your
                MooseDesk.
              </p>
              <p className="text-center">This may take up to a minute</p>
            </div>
          </div>
          <Spin size="large" className="mt-2" />
        </div>
      );
    }
    if (isVerified === "Success") {
      return (
        <SenderVerifyStep
          setStep={setStep}
          email={email}
          formEmail={formEmail}
        />
      );
    }
    return (
      <div className="flex flex-col items-center">
        <Result
          status="error"
          title="Couldn't complete setup"
          subTitle="Cannot be verified yet. Please check your email and click on the link to verify. Click on the re-check button to check the verification status again"
          extra={[
            <Button
              onClick={() => {
                sendVerify();
                setRetryCount(2);
                setIsVerified("Pending");
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
);
