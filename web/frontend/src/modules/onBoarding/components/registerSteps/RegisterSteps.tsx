import { useCallback, useState } from "react";
import "src/modules/onBoarding/assets/style/components/registerSteps/register-steps.scss";
import RegisterStepsOne from "src/modules/onBoarding/components/registerSteps/RegisterStepsOne";
import RegisterStepsThree from "src/modules/onBoarding/components/registerSteps/RegisterStepsThree";
import RegisterStepsTwo from "src/modules/onBoarding/components/registerSteps/RegisterStepsTwo";

interface ComponentNameProps {}

const ComponentName = (props: ComponentNameProps) => {
  const [steps, setSteps] = useState(2);

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

  return (
    <>
      {steps === 1 && <RegisterStepsOne nextStep={handleNextStep} />}
      {steps === 2 && <RegisterStepsTwo nextStep={handleNextStep} />}
      {steps === 3 && <RegisterStepsThree previousStep={handlePreviousStep} />}
    </>
  );
};

export default ComponentName;
