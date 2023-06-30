import {
  generatePath,
  useJob,
  useNavigate,
  useSearchParams,
} from "@moose-desk/core";
import {
  AgentRepository,
  CheckTokenNewAgentRequest,
  TypeCheckTokenNewAgent,
} from "@moose-desk/repo";
import Link from "antd/es/typography/Link";
import { useEffect, useState } from "react";
import { map } from "rxjs";
import { Loading } from "src/components/Loading";
import { MDButton } from "src/components/UI/Button/MDButton";
import LayoutSignInPage from "src/components/UI/LayoutSignInPage/LayoutSignInPage";
import { useSubdomain } from "src/hooks/useSubdomain";
import { SetPassword } from "src/modules/agent/components/SetPassword";
import RoutePaths from "src/routes/paths";
import "./OnBoarding.scss";

export const OnBoarding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [pageError, setIsPageErr] = useState({
    status: false,
    message: "",
  });
  const [stepPage, setStepPage] = useState(1);
  const [account, setAccount] = useState({
    storeId: "",
    email: "",
    agentName: "",
    token: "",
  });

  const { getSubDomain, getDomain } = useSubdomain();

  const { run: CheckValidTokenApi, processing } = useJob(
    (payload: CheckTokenNewAgentRequest) => {
      return AgentRepository()
        .checkTokenActiveNewAgent(payload)
        .pipe(
          map(({ data }) => {
            switch (data.data) {
              case TypeCheckTokenNewAgent.TOKEN_VALID:
                setIsPageErr({
                  status: false,
                  message: "",
                });
                break;
              case TypeCheckTokenNewAgent.TOKEN_INVALID:
                setIsPageErr({
                  status: true,
                  message:
                    "The link is no longer valid, please click on the link in the latest email.",
                });
                break;
              case TypeCheckTokenNewAgent.INVITATION_NOT_EXISTS:
                setIsPageErr({
                  status: true,
                  message:
                    "No invitation found, please ask System Admin to resend invitation.",
                });
                break;
              case TypeCheckTokenNewAgent.USER_ACTIVE:
                setIsPageErr({
                  status: true,
                  message: "You have completed the onboarding process.",
                });
                break;
              default:
                break;
            }
          })
        );
    }
  );

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
      CheckValidTokenApi({
        email,
        storeId,
        token,
      });
    } else {
      navigate(generatePath(RoutePaths.OnBoarding + "/error"));
    }
  }, [searchParams]);

  return (
    <div className="">
      {!processing ? (
        <>
          {!pageError.status ? (
            <>
              {stepPage === 1 ? (
                <>
                  <LayoutSignInPage
                    content={
                      <div className="">
                        <div className="onboarding-title">
                          Welcome to the help desk portal. Please save the link
                          below to login to your portal next time
                        </div>
                        <div className="">
                          <Link
                            href={RoutePaths.Login}
                            className="onboarding-link font-medium"
                          >
                            https://{getSubDomain()}
                            {getDomain()}/login
                          </Link>

                          <div className="onboarding-button">
                            <MDButton
                              type="primary"
                              onClick={() => setStepPage(2)}
                            >
                              Continue
                            </MDButton>
                          </div>
                        </div>
                        <div className="onboarding-support">
                          If you forgot your sub-domain, please email to our
                          customer support at{" "}
                          <Link
                            href={`mailto:support@moosedesk.com`}
                            className="onboarding-link font-medium"
                          >
                            support@moosedesk.com
                          </Link>
                        </div>
                      </div>
                    }
                  />
                </>
              ) : (
                <SetPassword {...account} />
              )}
            </>
          ) : (
            <LayoutSignInPage
              title="Oops!"
              subTitle={
                <p className="onboard-error">
                  {pageError.message || "Something went wrong"}
                </p>
              }
              content={
                <div className="onboard-wrap-link">
                  <Link href={RoutePaths.Login} className="link-to-login">
                    Back to login page
                  </Link>
                </div>
              }
            />
          )}
        </>
      ) : (
        <Loading fullPage></Loading>
      )}
    </div>
  );
};

export default OnBoarding;
