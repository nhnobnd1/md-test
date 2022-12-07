import { useState } from "react";
import { PageComponent } from "src/core/models/routes";
import RegisterSteps from "src/modules/onBoarding/components/registerSteps/RegisterSteps";

interface OnBoardingIndexPageProps {}

const OnBoardingIndexPage: PageComponent<OnBoardingIndexPageProps> = () => {
  const [registered, setRegistered] = useState(false);

  return <>{!registered ? <RegisterSteps /> : <>Boarding</>}</>;
};

export default OnBoardingIndexPage;
