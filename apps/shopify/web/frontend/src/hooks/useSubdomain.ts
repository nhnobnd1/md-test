import { useMount } from "@moose-desk/core";
import { useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import { useShopDomain } from "src/hooks/useSearchDomain";

export function useSubdomain() {
  const [subDomain, setSubDomain] = useState<string | undefined>();
  const shop = useShopDomain();
  const [cookies, setCookie] = useCookies();

  const getSubDomain = useCallback(() => {
    const payload = cookies[process.env.HOST ?? (shop as any)];
    console.log({ payload });
    console.log({ cookies });
    if (payload) {
      const domain: string = payload?.shop?.myshopify_domain;
      return domain.split(".")[0];
    }
    return shop ? shop.split(".")[0] : undefined;
  }, [cookies, process.env.HOST, shop]);

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
