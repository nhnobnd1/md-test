import { useMount } from "@moose-desk/core";
import { useCallback, useState } from "react";
import { useShopDomain } from "src/hooks/useSearchDomain";
import useDomainName from "src/store/useDomainName";
const regexShopifyStore = /store\/(.*?)\/apps/;
export function useSubdomain() {
  const [subDomain, setSubDomain] = useState<string | undefined>();
  const shop = useShopDomain();
  const name = useDomainName((state) => state.name);

  const getSubDomain = useCallback(() => {
    return name;
  }, []);

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
