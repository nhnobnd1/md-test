import { useJob, useMount } from "@moose-desk/core";
import { GetStoreIdRequest, StoreRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { ReactNode, createContext, useContext, useState } from "react";
import { catchError, map, of } from "rxjs";
import StorageManager from "src/core/utilities/StorageManager";
import { useSubdomain } from "src/hooks/useSubdomain";

interface StoreContextType {
  storeId: string;
  timezone: string;
  isOnboardingComplete: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);
console.log({ StoreContext });

interface StoreProvidersProps {
  children?: ReactNode;
}

export const StoreProviders = ({ children }: StoreProvidersProps) => {
  const [generalInfo, setGeneralInfo] = useState<StoreContextType>();
  const { getSubDomain } = useSubdomain();
  const { show } = useToast();

  const { run: fetchStoreId } = useJob(
    (payload: GetStoreIdRequest) => {
      return StoreRepository()
        .getStore(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              setGeneralInfo(data.data);
              StorageManager.setToken(
                "isAcceptUsing",
                data.data.isOnboardingComplete ? "accepted" : ""
              );
            }
          }),
          catchError((err) => {
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  useMount(() => {
    const subDomain = getSubDomain();
    if (subDomain) {
      fetchStoreId({ subdomain: subDomain });
    } else {
      show("Get store failed", { isError: true });
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
    throw new Error("useStore must be used in StoreProvider");
  }

  return context;
};
