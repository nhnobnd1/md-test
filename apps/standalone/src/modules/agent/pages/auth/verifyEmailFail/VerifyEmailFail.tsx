import { Result } from "antd";
import { FC } from "react";
import "./style.scss";

interface VerifyEmailFailProps {}

const VerifyEmailFail: FC<VerifyEmailFailProps> = () => {
  return (
    <div className="card">
      <Result
        status="error"
        subTitle="Please start over again or contact our support team: support@moosedesk.com"
        title="We could not finish the verification for your email forwarding"
        // extra={[
        //   <Button
        //     onClick={() => {
        //       setStep(0);
        //     }}
        //     type="primary"
        //     key="console"
        //   >
        //     Start Over
        //   </Button>,
        // ]}
      />
    </div>
  );
};

export default VerifyEmailFail;
