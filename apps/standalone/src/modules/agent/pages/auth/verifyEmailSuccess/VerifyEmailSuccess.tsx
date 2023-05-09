import { Result } from "antd";
import { FC } from "react";
import "./style.scss";
interface VerifyEmailSuccessProps {}

const VerifyEmailSuccess: FC<VerifyEmailSuccessProps> = () => {
  return (
    <div className="card">
      <Result
        status="success"
        title="Thank you for your verification"
        subTitle=" We have finished the email forwarding process successfully"
      />
    </div>
  );
};

export default VerifyEmailSuccess;
