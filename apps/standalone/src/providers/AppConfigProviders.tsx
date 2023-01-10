import { createContext, ReactNode, useContext, useState } from "react";
import { BreadcrumbProps } from "src/components/UI/Breadcrums/Breadcrumb";

export interface AppConfigContext {
  breadCrumb: BreadcrumbProps;
  setBreadCrumb: React.Dispatch<React.SetStateAction<BreadcrumbProps>>;
}

const AppConfigContext = createContext<AppConfigContext | undefined>(undefined);

interface AppConfigProvidersProps {
  children?: ReactNode;
}

const AppConfigProviders = ({ children }: AppConfigProvidersProps) => {
  const [breadCrumb, setBreadCrumb] = useState<BreadcrumbProps>({
    items: [],
  });

  return (
    <AppConfigContext.Provider value={{ breadCrumb, setBreadCrumb }}>
      {children}
    </AppConfigContext.Provider>
  );
};

export default AppConfigProviders;

export const useAppConfig = () => {
  const context = useContext<AppConfigContext | undefined>(AppConfigContext);
  if (context === undefined) {
    throw new Error("useStore must be used in StoreProvider");
  }

  return context;
};
