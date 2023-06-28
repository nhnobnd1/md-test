/* eslint-disable react/no-unescaped-entities */
import { Checkbox, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { FC, useState } from "react";
import { MDButton } from "src/components/UI/Button/MDButton";
import { useSubdomain } from "src/hooks/useSubdomain";
import Step5Icon from "~icons/ph/number-circle-five-fill";
import Step4Icon from "~icons/ph/number-circle-four-fill";
import Step1Icon from "~icons/ph/number-circle-one-fill";
import Step3Icon from "~icons/ph/number-circle-three-fill";
import Step2Icon from "~icons/ph/number-circle-two-fill";
interface ContentWaitProps {
  code: string;
  sendVerify: () => void;
  isGmail: boolean;
}

export const StepGoogleCode: FC<ContentWaitProps> = React.memo(
  ({ children, code, sendVerify, isGmail }) => {
    const [isChecked, setIsChecked] = useState(false);
    const onChange = (e: CheckboxChangeEvent) => {
      setIsChecked(e.target.checked);
    };
    const { getSubDomain } = useSubdomain();

    const supportEmailDefault =
      import.meta.env.MODE === "production"
        ? `${getSubDomain()}@email.moosedesk.com`
        : `${getSubDomain()}@email.moosedesk.net`;
    return (
      <div className="flex flex-col items-center">
        {isGmail ? (
          <>
            <Typography.Title level={3}>Complete Set Up</Typography.Title>
            <div className="flex justify-start items-start gap-2 w-[340px]">
              <div>
                <Step4Icon fontSize={20} />
              </div>
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
              <div>
                <Step5Icon fontSize={20} />
              </div>
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
          </>
        ) : (
          <>
            <Typography.Title level={3}>
              Setup email forwarding
            </Typography.Title>
            <div className="flex justify-start items-start gap-2 w-[400px]">
              <div>
                <Step1Icon fontSize={20} />
              </div>
              <div className="flex flex-col">
                <span>
                  Sign in to your email account, and go to your email forwarding
                  settings (done outside of MooseDesk Support).
                </span>
              </div>
            </div>
            <div className="flex justify-start items-start gap-2 w-[400px] mt-5">
              <div>
                <Step2Icon fontSize={20} />
              </div>
              <div className=" ">
                <span>
                  Enter{" "}
                  <span style={{ color: "#2F3941", fontWeight: "bold" }}>
                    {supportEmailDefault}
                  </span>{" "}
                  as the forwarding email address.
                </span>
              </div>
            </div>
            <div className="flex justify-start items-start gap-2 w-[400px] mt-5">
              <div>
                <Step3Icon fontSize={20} />
              </div>
              <div className="inline-block">
                <span>
                  After receiving “Add a forwarding address” in your gmail
                  notification as the forwarding email address.
                </span>
                <span className="inline-block">
                  Please click the Next button to get confirmation code to
                  verify permission.
                </span>
              </div>
            </div>

            <Checkbox className="mt-3" onChange={onChange}>
              <span className="font-bold">Yes, I finished</span>
              <span> setting up email forwarding with my email provider</span>
            </Checkbox>
          </>
        )}
        <div>{children}</div>
        <div className="flex gap-5 justify-center mt-7">
          <MDButton
            disabled={!isChecked}
            onClick={() => {
              sendVerify();
            }}
            type="primary"
          >
            Verify
          </MDButton>
        </div>
      </div>
    );
  }
);
