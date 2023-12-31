import { useNavigate, useUser } from "@moose-desk/core";
import {
  GetStoreIdRequest,
  GetStoreIdResponse,
  StoreRepository,
} from "@moose-desk/repo";
import { Crisp } from "crisp-sdk-web";
import CryptoJS from "crypto-js";
import { createContext, ReactNode, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { lastValueFrom } from "rxjs";
import useDeepEffect from "src/hooks/useDeepEffect";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useUser();
  useQuery({
    queryKey: ["getStoreId"],
    queryFn: () =>
      getStoreApi({
        subdomain: (getSubDomain() as string).toLowerCase(),
      }),

    onSuccess: (data: GetStoreIdResponse) => {
      if ((getSubDomain() as string).toLowerCase() === "sender-verification") {
        return;
      }
      if (!data.data.storeId) {
        navigate("/404");
        return;
      }
      setStoreId(data.data.storeId);
    },
    onError: (error) => {
      console.log({ error });
      notification.error(t("messages:error.get_store"));
    },
    enabled: !getStoreId(),
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
