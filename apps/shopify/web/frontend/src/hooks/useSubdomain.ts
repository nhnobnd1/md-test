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
    if (payload) {
      const domain: string = payload?.shop?.myshopify_domain;
      return domain.split(".")[0];
    }
    return undefined;
  }, [cookies, process.env.HOST, shop]);

  useMount(() => {
    setSubDomain(getSubDomain());
    getDomainStandalone();
  });

  const getDomainStandalone = useCallback(() => {
    console.log(import.meta.env.MODE, "import env");
    switch (import.meta.env.MODE) {
      case "development":
        return "-dev.moosedesk.net";

      case "staging":
        return ".moosedesk.net";

      default:
        return ".moosedesk.com";
    }
  }, [import.meta.env.MODE]);

  return {
    subDomain,
    setSubDomain,
    getSubDomain,
    getDomainStandalone,
  };
}
