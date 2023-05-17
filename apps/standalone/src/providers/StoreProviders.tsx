import {
  GetStoreIdRequest,
  GetStoreIdResponse,
  StoreRepository,
} from "@moose-desk/repo";
import { ReactNode, createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { lastValueFrom } from "rxjs";
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
export const getStoreApi = (payload: GetStoreIdRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(StoreRepository().getStore(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const StoreProviders = ({ children }: StoreProvidersProps) => {
  const [storeId, setStoreId] = useState<string>(getStoreId());
  const { getSubDomain } = useSubdomain();
  const notification = useNotification();
  const { t, i18n } = useTranslation();

  useQuery({
    queryKey: ["getStoreId"],
    queryFn: () =>
      getStoreApi({
        subdomain: getSubDomain(),
      }),
    retry: 3,
    onSuccess: (data: GetStoreIdResponse) => {
      setStoreId(data.data.storeId);
    },
    onError: () => {
      notification.error(t("messages:error.get_store"));
    },
    enabled: !getStoreId(),
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
