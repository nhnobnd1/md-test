import { useJob, useMount } from "@moose-desk/core";
import { GetStoreIdRequest, StoreRepository } from "@moose-desk/repo";
import { createContext, ReactNode, useContext, useState } from "react";
import { catchError, map, of } from "rxjs";
import useNotification from "src/hooks/useNotification";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getStoreId } from "src/utils/localValue";

export interface StoreContextType {
  storeId: string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProvidersProps {
  children?: ReactNode;
}

export const StoreProviders = ({ children }: StoreProvidersProps) => {
  const [storeId, setStoreId] = useState<string>("");
  const { getSubDomain } = useSubdomain();
  const notification = useNotification();

  const { run: fetchStoreId } = useJob(
    (payload: GetStoreIdRequest) => {
      return StoreRepository()
        .getStore(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              console.log("fetch Store");
              setStoreId(data.data.storeId);
            } else {
              notification.error("Get store failed");
            }
          }),
          catchError((err) => {
            notification.error("Get store failed");
            return of(err);
          })
        );
    },
    { showLoading: true }
  );

  useMount(() => {
    if (!getStoreId()) {
      const subDomain = getSubDomain();
      fetchStoreId({ subdomain: subDomain });
    } else {
      setStoreId(getStoreId());
    }
  });
  return (
    <StoreContext.Provider value={{ storeId: storeId }}>
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
