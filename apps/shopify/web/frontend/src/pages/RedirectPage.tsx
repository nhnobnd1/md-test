import { generatePath, Navigate } from "@moose-desk/core";
import useAuth from "src/hooks/useAuth";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";
import { useStore } from "src/providers/StoreProviders";

interface RedirectPageProps {
  children?: React.ReactElement | React.ReactNode;
}

const RedirectPage = ({ children }: RedirectPageProps) => {
  const { isLoggedIn } = useAuth();
  const { isOnboardingComplete } = useStore();
  // console.log("redirect2", isOnboardingComplete);

  // console.log("redirect", isLoggedIn && isOnboardingComplete);
  if (isOnboardingComplete) {
    return (
      <Navigate to={generatePath(DashboardRoutePaths.Index)} replace></Navigate>
    );
  }
  return (
    <Navigate to={generatePath(OnBoardingRoutePaths.Index)} replace></Navigate>
  );
};

export default RedirectPage;
