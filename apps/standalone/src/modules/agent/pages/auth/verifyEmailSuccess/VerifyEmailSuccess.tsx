import { FC } from "react";
import Images from "src/assets/images";
import "./style.scss";
interface VerifyEmailSuccessProps {}

const VerifyEmailSuccess: FC<VerifyEmailSuccessProps> = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <img src={Images.Logo.SenderSuccessful} alt="successful" />
        <h1 className="mt-5">Thank you for your verification</h1>
        <span className="text-sm text-gray-400 text-center">
          We have finished the email forwarding process successfully
        </span>
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;
