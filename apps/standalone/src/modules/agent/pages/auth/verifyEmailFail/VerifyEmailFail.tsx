import { FC } from "react";
import Images from "src/assets/images";

interface VerifyEmailFailProps {}

const VerifyEmailFail: FC<VerifyEmailFailProps> = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <img src={Images.Logo.SenderFailure} alt="failure" />
        <h1 className="mt-5 text-center">
          We could not finish the verification for your email forwarding
        </h1>
        <span className="text-sm text-gray-400 text-center">
          Please start over again or contact our support team:
          support@moosedesk.com
        </span>
      </div>
    </div>
  );
};

export default VerifyEmailFail;
