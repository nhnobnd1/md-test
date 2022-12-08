import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

export function useShopDomain() {
  const shopDomain = useRef<null | string>(null);
  const [searchParams] = useSearchParams();

  if (!shopDomain.current) {
    shopDomain.current = searchParams.get("shop");
  }

  return shopDomain.current;
}
