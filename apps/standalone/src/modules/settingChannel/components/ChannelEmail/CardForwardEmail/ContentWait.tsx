import { Button, Typography } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { useSubdomain } from "src/hooks/useSubdomain";
import Step1Icon from "~icons/ph/number-circle-one-fill";
import Step2Icon from "~icons/ph/number-circle-two-fill";
interface ContentWaitProps {
  setStep: Dispatch<SetStateAction<number>>;
  handleVerifyCodeGoogle: () => void;
}

export const ContentWait: FC<ContentWaitProps> = ({
  setStep,
  handleVerifyCodeGoogle,
  children,
}) => {
  const { getSubDomain } = useSubdomain();

  const supportEmailDefault =
    import.meta.env.MODE === "production"
      ? `${getSubDomain()}@email.moosedesk.com`
      : `${getSubDomain()}@email.moosedesk.net`;
  return (
    <div className="flex flex-col items-center">
      <Typography.Title level={3}>Set up email forwarding</Typography.Title>
      <div className="flex justify-start items-start gap-2 w-[340px]">
        <Step1Icon fontSize={20} />
        <div className="flex flex-col">
          <span>Sign in to your Gmail account, and go to</span>
          <span style={{ color: "#2F3941", fontWeight: "bold" }}>
            Settings / Forwarding and POP/IMAP.
          </span>
        </div>
      </div>
      <div className="flex justify-start items-start gap-2 w-[340px] mt-5">
        <Step2Icon fontSize={20} />
        <div className=" ">
          <>
            Enter{" "}
            <span style={{ color: "#2F3941", fontWeight: "bold" }}>
              {supportEmailDefault}
            </span>{" "}
            as the
          </>
          <span style={{ display: "block" }}>forwarding email address.</span>
        </div>
      </div>
      <div>{children}</div>
      <div className="flex gap-5 justify-center mt-5">
        <Button
          onClick={() => {
            setStep(0);
          }}
        >
          Back
        </Button>
        <Button
          onClick={() => {
            handleVerifyCodeGoogle();
          }}
          type="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
