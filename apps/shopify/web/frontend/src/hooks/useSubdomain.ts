import { useMount } from "@moose-desk/core";
import { useCallback, useState } from "react";
import { useShopDomain } from "src/hooks/useSearchDomain";

export function useSubdomain() {
  const [subDomain, setSubDomain] = useState<string | undefined>();
  const shop = useShopDomain();

  const getSubDomain = useCallback(() => {
    return localStorage.getItem("subdomain") as string;
  }, [process.env.HOST, shop]);

  useMount(() => {
    setSubDomain(getSubDomain());
    getDomainStandalone();
  });
  const getDomainStandalone = useCallback(() => {
    switch (import.meta.env.VITE_MODE) {
      case "development":
        return ".moosedesk.net";

      case "staging":
        return ".moosedesk.net";

      default:
        return ".moosedesk.com";
    }
  }, [import.meta.env.VITE_MODE]);

  return {
    subDomain,
    setSubDomain,
    getSubDomain,
    getDomainStandalone,
  };
}
