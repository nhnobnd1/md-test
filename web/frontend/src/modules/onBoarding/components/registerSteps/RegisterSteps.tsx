import { useCallback, useState } from "react";
import { useMount } from "src/core/hooks";
import "src/modules/onBoarding/assets/style/components/registerSteps/register-steps.scss";
import RegisterStepsOne from "src/modules/onBoarding/components/registerSteps/RegisterStepsOne";
import RegisterStepsThree from "src/modules/onBoarding/components/registerSteps/RegisterStepsThree";
import RegisterStepsTwo from "src/modules/onBoarding/components/registerSteps/RegisterStepsTwo";

interface RegisterStepsProps {
  finishAuth: () => void;
}

const RegisterSteps = ({ finishAuth }: RegisterStepsProps) => {
  const [steps, setSteps] = useState(1);

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

  useMount(() => {
    setSteps(1);
  });

  return (
    <>
      {steps === 1 && <RegisterStepsOne nextStep={handleNextStep} />}
      {steps === 2 && <RegisterStepsTwo nextStep={handleNextStep} />}
      {steps === 3 && (
        <RegisterStepsThree
          previousStep={handlePreviousStep}
          redirectIndex={finishAuth}
        />
      )}
    </>
  );
};

export default RegisterSteps;
