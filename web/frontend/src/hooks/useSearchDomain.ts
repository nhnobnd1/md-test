import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export function useShopDomain() {
  const shopDomain = useRef<null | string>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    shopDomain.current = searchParams.get("shop");
  }, [searchParams]);

  return shopDomain.current;
}
