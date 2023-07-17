import { coreConfig, useMount } from "@moose-desk/core";
import { ReactNode, createContext, useContext } from "react";
import { useSubdomain } from "src/hooks/useSubdomain";

interface InitAppContext {
  modeEnv: string | undefined | ImportMetaEnv;
  subdomain: string | undefined;
  app: string;
}

const InitAppContext = createContext<InitAppContext | undefined>(undefined);

interface InitAppProps {
  children?: ReactNode;
}

const InitApp = ({ children }: InitAppProps) => {
  const { getSubDomain } = useSubdomain();

  useMount(() => {
    coreConfig.setConfig({
      modeEnv: import.meta.env.MODE,
      subdomain: getSubDomain(),
      app: "shopify",
    });
  });

  return (
    <InitAppContext.Provider
      value={{
        subdomain: getSubDomain(),
        modeEnv: import.meta.env,
        app: "shopify",
      }}
    >
      {children}
    </InitAppContext.Provider>
  );
};

export const useInitApp = () => {
  const context = useContext<InitAppContext | undefined>(InitAppContext);
  if (context === undefined) {
    throw new Error("useInitApp must be used in InitAppProvider");
  }

  return context;
};

export default InitApp;
