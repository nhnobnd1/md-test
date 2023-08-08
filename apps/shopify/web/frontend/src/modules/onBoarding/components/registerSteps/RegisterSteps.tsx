import { generatePath, useMount, useNavigate } from "@moose-desk/core";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { useCallback, useState } from "react";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import "src/modules/onBoarding/assets/style/components/registerSteps/register-steps.scss";
import RegisterStepsOne from "src/modules/onBoarding/components/registerSteps/RegisterStepsOne";
import RegisterStepsThree from "src/modules/onBoarding/components/registerSteps/RegisterStepsThree";
import RegisterStepsTwo from "src/modules/onBoarding/components/registerSteps/RegisterStepsTwo";
import useFullScreen from "src/store/useFullScreen";

interface RegisterStepsProps {}

const RegisterSteps = (props: RegisterStepsProps) => {
  const [steps, setSteps] = useState(1);
  const navigate = useNavigate();
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  const changeUpdateScreen = useFullScreen((state) => state.changeUpdateScreen);

  const handleNextStep = useCallback(() => {
    setSteps(() => {
      return steps + 1;
    });
  }, [steps]);

  const handlePreviousStep = useCallback(() => {
    setSteps(() => {
      return steps - 1;
    });
  }, [steps]);

  const redirectDashBoard = useCallback(() => {
    navigate(generatePath(DashboardRoutePaths.Index));
  }, []);

  useMount(() => {
    fullscreen.dispatch(Fullscreen.Action.EXIT);
    changeUpdateScreen(false);
    setSteps(1);
  });

  return (
    <>
      {steps === 1 && <RegisterStepsOne nextStep={handleNextStep} />}
      {steps === 2 && (
        <RegisterStepsTwo
          preStep={handlePreviousStep}
          nextStep={handleNextStep}
        />
      )}
      {steps === 3 && (
        <RegisterStepsThree
          previousStep={handlePreviousStep}
          redirectIndex={redirectDashBoard}
        />
      )}
    </>
  );
};

export default RegisterSteps;
