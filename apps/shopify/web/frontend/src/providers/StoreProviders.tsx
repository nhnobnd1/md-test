import { generatePath, useJob, useNavigate } from "@moose-desk/core";
import {
  GetStoreIdRequest,
  GetStoreIdResponse,
  StoreRepository,
} from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Crisp } from "crisp-sdk-web";
import CryptoJS from "crypto-js";
import { ReactNode, createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { catchError, lastValueFrom, map, of } from "rxjs";
import useDeepEffect from "src/hooks/useDeepEffect";
import { useSubdomain } from "src/hooks/useSubdomain";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";
import useUser from "src/store/useUser";

interface StoreContextType {
  storeId: string;
  timezone: string;
  isOnboardingComplete: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProvidersProps {
  children?: ReactNode;
}
export const getStoreApi = (payload: GetStoreIdRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(StoreRepository().getStore(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const StoreProviders = ({ children }: StoreProvidersProps) => {
  const [generalInfo, setGeneralInfo] = useState<StoreContextType>();
  const { getSubDomain } = useSubdomain();
  const { show } = useToast();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = useUser((state) => state.user);

  useQuery({
    queryKey: ["global"],
    staleTime: 10000,
    queryFn: () =>
      getStoreApi({
        subdomain: (getSubDomain() as string).toLowerCase(),
      }),

    onSuccess: (data: GetStoreIdResponse) => {
      setGeneralInfo(data.data);
      if (!data.data.isOnboardingComplete) {
        navigate(generatePath(OnBoardingRoutePaths.Index));
      }
    },
    onError: (error) => {
      console.log({ error });
    },

    retry: (failureCount, error: any) => {
      console.log({ failureCount, error });
      if (error.response?.status === 400) {
        navigate("/404");
        return false;
      }
      return true;
    },
  });

  useDeepEffect(() => {
    if (user) {
      const uniqueId = CryptoJS.SHA256(
        `${user.storeId}-${user.email}`
      ).toString();
      Crisp.configure("facc2d77-0f93-4665-9530-430cc6aa3b4f", {
        autoload: false,
        tokenId: uniqueId,
      });

      Crisp.setTokenId(`md_${uniqueId}`);

      Crisp.session.reset();

      Crisp.user.setEmail(user.email);
      Crisp.user.setNickname(user.given_name);
      Crisp.load();
    } else {
      if (Crisp.isCrispInjected()) {
        Crisp.chat.hide();
      }
    }
  }, [user]);

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

  // useMount(() => {
  //   const subDomain = getSubDomain();
  //   if (subDomain) {
  //     fetchStoreId({ subdomain: subDomain.toLowerCase() });
  //   } else {
  //     show(t("messages:error.get_store"), { isError: true });
  //   }
  // });

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
