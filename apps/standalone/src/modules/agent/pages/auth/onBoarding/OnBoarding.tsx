import { useSearchParams } from "@moose-desk/core";
import { Button } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Images from "src/assets/images";
import { SetPassword } from "src/modules/agent/components/SetPassword";
import "./OnBoarding.scss";

interface OnBoardingProps {}

export const OnBoarding = (props: OnBoardingProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPageErr, setIsPageErr] = useState(false);
  const [stepPage, setStepPage] = useState(1);
  const [account, setAccount] = useState({
    storeId: "",
    email: "",
    agentName: "",
    token: "",
  });

  useEffect(() => {
    const storeId = searchParams.get("storeId");
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const agentName = searchParams.get("agentName");
    if (storeId && email && token && agentName) {
      setAccount({
        email,
        storeId,
        agentName,
        token,
      });
    } else {
      setIsPageErr(true);
    }
  }, [searchParams]);

  return (
    <div className="on-boarding">
      <div className="card-boarding">
        <div
          className={classNames([
            "mx-auto",
            stepPage === 1 ? "w-[70%]" : "w-[80%]",
          ])}
        >
          {!isPageErr ? (
            <>
              {stepPage === 1 ? (
                <>
                  <div className="card-boarding__description">
                    <div className="text-center">
                      <img src={Images.Logo.LogoIcon} width={240} alt="" />
                    </div>
                    <div className="text-center font-medium">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sed ab incidunt iusto fugit. Adipisci, id. Possimus,
                      doloribus soluta nam aliquam quibusdam ipsam nesciunt
                      minima autem deleniti eaque perferendis voluptatem nemo!
                    </div>
                  </div>
                  <div className="card-boarding__actions">
                    <div className="text-center">
                      Welcome to the help desk portal. Please save the link
                      below to login to your portal next time
                    </div>
                    <div className="p-5">
                      <div className="text-center mb-4">
                        <span className="link font-medium">
                          https://%sub-domain%.moosedesk.com/login
                        </span>
                      </div>
                      <div className="text-center">
                        <Button type="primary" onClick={() => setStepPage(2)}>
                          Continue
                        </Button>
                      </div>
                    </div>
                    <div className="w-[80%] mx-auto mt-5 text-center">
                      If you forgot your sub-domain, please email to our
                      customer support at{" "}
                      <span className="link font-medium">
                        support@moosedesk.com
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <SetPassword {...account} />
              )}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-[400px]">
              <h3 className="text-center">
                You have completed the onboarding process
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
