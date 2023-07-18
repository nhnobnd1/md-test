import { generatePath, useJob, useMount, useNavigate } from "@moose-desk/core";
import { GetStoreIdRequest, StoreRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { createContext, ReactNode, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { useSubdomain } from "src/hooks/useSubdomain";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";

interface StoreContextType {
  storeId: string;
  timezone: string;
  isOnboardingComplete: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProvidersProps {
  children?: ReactNode;
}

export const StoreProviders = ({ children }: StoreProvidersProps) => {
  const [generalInfo, setGeneralInfo] = useState<StoreContextType>();
  const { getSubDomain } = useSubdomain();
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { run: fetchStoreId } = useJob(
    (payload: GetStoreIdRequest) => {
      return StoreRepository()
        .getStore(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setGeneralInfo(data.data);
              if (!data.data.isOnboardingComplete) {
                navigate(generatePath(OnBoardingRoutePaths.Index));
              }
            }
          }),
          catchError((err) => {
            show(t("messages:error.something_went_wrong"), { isError: true });

            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  useMount(() => {
    const subDomain = getSubDomain();
    if (subDomain) {
      fetchStoreId({ subdomain: subDomain.toLowerCase() });
    } else {
      show(t("messages:error.get_store"), { isError: true });
    }
  });

  return (
    <StoreContext.Provider value={generalInfo}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext<StoreContextType | undefined>(StoreContext);
  if (context === undefined) {
    window.location.reload();
    throw new Error("useStore must be used in StoreProvider");
  }

  return context;
};
