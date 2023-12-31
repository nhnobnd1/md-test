import { useMount } from "@moose-desk/core";
import { useCallback, useState } from "react";

export function useSubdomain() {
  const [subDomain, setSubDomain] = useState<string | undefined>();

  const getSubDomain = useCallback(() => {
    const domain = "truong-0001";
    if (import.meta.env.MODE === "development") {
      if (domain.includes(".moosedesk.net")) {
        return domain.replace(".moosedesk.net", "");
      }
      return import.meta.env.VITE_SUB_DOMAIN;
    } else {
      return domain.replace(".moosedesk.com", "");
    }
  }, [window.location]);

  const getDomain = useCallback(() => {
    switch (import.meta.env.MODE) {
      case "development":
        return ".moosedesk.net";

      case "staging":
        return ".moosedesk.com";

      default:
        return ".moosedesk.com";
    }
  }, [import.meta.env.MODE]);

  useMount(() => {
    setSubDomain(getSubDomain());
  });

  return {
    subDomain,
    getDomain,
    setSubDomain,
    getSubDomain,
  };
}
