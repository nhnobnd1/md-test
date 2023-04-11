/* eslint-disable react/no-unescaped-entities */
import { Button, Checkbox, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { FC, useState } from "react";
import Step4Icon from "~icons/ph/number-circle-four-fill";
import Step3Icon from "~icons/ph/number-circle-three-fill";
interface ContentWaitProps {
  code: string;
  sendVerify: () => void;
}

export const StepGoogleCode: FC<ContentWaitProps> = ({
  children,
  code,
  sendVerify,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div className="flex flex-col items-center">
      <Typography.Title level={3}>Complete Set Up</Typography.Title>
      <div className="flex justify-start items-start gap-2 w-[340px]">
        <Step3Icon fontSize={20} />
        <div className="flex flex-col">
          <span>
            Enter this verification code{" "}
            <span className="font-bold">{code}</span> under
          </span>
          <a
            href="https://mail.google.com/mail/u/0/#settings/fwdandpop"
            target="_blank"
            rel="noreferrer"
          >
            Forwarding and POP/IMAP.
          </a>
        </div>
      </div>
      <div className="flex justify-start items-start gap-2 w-[340px] mt-5">
        <Step4Icon fontSize={20} />
        <div className=" ">
          <span>Select option "Forward a copy of incoming</span>
          <span style={{ display: "block" }}>
            email..." and click "Save changes."
          </span>
        </div>
      </div>
      <Checkbox className="mt-3" onChange={onChange}>
        <span className="font-bold">Yes, I finished</span>
        <span> setting up forwarding in Gmail</span>
      </Checkbox>
      <div>{children}</div>
      <div className="flex gap-5 justify-center mt-7">
        <Button
          disabled={!isChecked}
          onClick={() => {
            sendVerify();
          }}
          type="primary"
        >
          Verify
        </Button>
      </div>
    </div>
  );
};
