import { PageComponent } from "src/core/models/routes";
import RegisterSteps from "src/modules/onBoarding/components/registerSteps/RegisterSteps";

interface OnBoardingIndexPageProps {}

const OnBoardingIndexPage: PageComponent<OnBoardingIndexPageProps> = () => {
  return <RegisterSteps />;
};

export default OnBoardingIndexPage;
