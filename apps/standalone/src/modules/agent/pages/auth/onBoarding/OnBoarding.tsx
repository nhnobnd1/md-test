import { useSearchParams } from "@moose-desk/core";
import { Button } from "antd";
import "./OnBoarding.scss";

interface OnBoardingProps {}

export const OnBoarding = (props: OnBoardingProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="on-boarding">
      <div className="card-boarding">
        <div className="w-[70%] mx-auto">
          <div className="card-boarding__description">
            <img src="" alt="" />
            <div className="text-center font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed ab
              incidunt iusto fugit. Adipisci, id. Possimus, doloribus soluta nam
              aliquam quibusdam ipsam nesciunt minima autem deleniti eaque
              perferendis voluptatem nemo!
            </div>
          </div>
          <div className="card-boarding__actions">
            <div className="text-center">
              Welcome to the help desk portal. Please save the link below to
              login to your portal next time
            </div>
            <div className="p-5">
              <div className="text-center mb-4">
                <span className="link font-medium">
                  https://%sub-domain%.moosedesk.com/login
                </span>
              </div>
              <div className="text-center">
                <Button type="primary">Continue</Button>
              </div>
            </div>
            <div className="w-[80%] mx-auto mt-5 text-center">
              If you forgot your sub-domain, please email to our customer
              support at{" "}
              <span className="link font-medium">support@moosedesk.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
