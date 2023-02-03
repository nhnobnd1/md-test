import { useMount } from "@moose-desk/core";
import { useCallback, useState } from "react";

export function useSubdomain() {
  const [subDomain, setSubDomain] = useState<string | undefined>();

  const getSubDomain = useCallback(() => {
    const domain = window.location.hostname;
    console.log("env", import.meta.env);
    console.log("mode", import.meta.env.MODE);
    if (import.meta.env.MODE === "development") {
      if (domain.includes("-dev.moosedesk.net")) {
        return domain.replace("-dev.moosedesk.net", "");
      }
      return import.meta.env.VITE_SUB_DOMAIN;
    } else {
      return domain.replace(".moosedesk.net", "");
    }
  }, [window.location]);

  const getDomain = useCallback(() => {
    switch (import.meta.env.MODE) {
      case "development":
        return "-dev.moosedesk.net";

      case "staging":
        return ".moosedesk.net";

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
