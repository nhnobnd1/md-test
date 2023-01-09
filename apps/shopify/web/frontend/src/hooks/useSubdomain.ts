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
      const domain = payload?.shop?.myshopify_domain;
      if (domain && domain.includes(".myshopify.com")) {
        const subdomain = domain.replace(".myshopify.com", "");
        return subdomain;
      }
    }
    return undefined;
  }, [cookies, process.env.HOST, shop]);

  useMount(() => {
    setSubDomain(getSubDomain());
  });

  return {
    subDomain,
    setSubDomain,
    getSubDomain,
  };
}
