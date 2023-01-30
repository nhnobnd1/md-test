import { useMount } from "@moose-desk/core";
import { useCallback, useState } from "react";

export function useSubdomain() {
  const [subDomain, setSubDomain] = useState<string | undefined>();

  const getSubDomain = useCallback(() => {
    const domain = window.location.hostname;
    if (import.meta.env.MODE === "development") {
      return import.meta.env.VITE_SUB_DOMAIN;
    } else {
      return domain.replace(".moosedesk.net", "");
    }
  }, [window.location]);

  useMount(() => {
    setSubDomain(getSubDomain());
  });

  return {
    subDomain,
    setSubDomain,
    getSubDomain,
  };
}
