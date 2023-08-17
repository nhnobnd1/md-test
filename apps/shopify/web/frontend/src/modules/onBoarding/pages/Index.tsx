import { PageComponent, useNavigate } from "@moose-desk/core";
import { useEffect } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import RegisterSteps from "src/modules/onBoarding/components/registerSteps/RegisterSteps";

interface OnBoardingIndexPageProps {}

const OnBoardingIndexPage: PageComponent<OnBoardingIndexPageProps> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (StorageManager.getToken("isAcceptUsing") === "true") {
      navigate("/");
    }
  }, []);
  return <RegisterSteps />;
};

export default OnBoardingIndexPage;
