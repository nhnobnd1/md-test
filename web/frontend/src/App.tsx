import { NavigationMenu } from "@shopify/app-bridge-react";
import { NavigationLink } from "@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu";
import { useMemo } from "react";
import useRoutes from "src/core/routes/useRoutes";
import TokenManager from "src/core/utilities/TokenManager";
import { AppRoutes } from "src/routes";
TokenManager.setToken(
  "base_token",
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2ODNGNkFGNkJGQjg0MDVFNjMwMkVBMzk2NTMzMTZFMTMyRkMzQ0YiLCJ4NXQiOiJSb1AycjJ2N2hBWG1NQzZqbGxNeGJoTXZ3ODgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTA3ZDUwMi1mOGVkLTc1NGItYzg3OS1mMTc1NjU2YzMzZTYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJkZXYubW9vc2VkZXNrQGdtYWlsLmNvbSIsImVtYWlsIjoiZGV2Lm1vb3NlZGVza0BnbWFpbC5jb20iLCJyb2xlIjoiQWRtaW4iLCJnaXZlbl9uYW1lIjoiRGV2IiwiZmFtaWx5X25hbWUiOiJNRCIsInBob25lX251bWJlcl92ZXJpZmllZCI6IkZhbHNlIiwiZW1haWxfdmVyaWZpZWQiOiJUcnVlIiwidW5pcXVlX25hbWUiOiJkZXYubW9vc2VkZXNrQGdtYWlsLmNvbSIsInN0b3JlSWQiOiIwMDAxIiwib2lfcHJzdCI6Ik1vb3NlZGVza19Qb3N0bWFuIiwiY2xpZW50X2lkIjoiTW9vc2VkZXNrX1Bvc3RtYW4iLCJvaV90a25faWQiOiIzYTA3ZGUyNC1hNGE2LTk4MzEtOTVlZS1jM2JmNDAzMmU3OTEiLCJleHAiOjE2NzAxMjg1MjUsImlzcyI6Imh0dHBzOi8vYXV0aC5tb29zZWRlc2submV0LyIsImlhdCI6MTY2OTg2OTMyNX0.kQSmxHrjI_eaBUG6Z4xw5DmqFu4_-sPP7KRCxYNf1dvQt6qeOXKniEabdq_YBKVPS1PWIM9R1sUIjoOaA-0Z9YEDvE2HuFMKEi6S7FQnOKpsd5wBofpwICrbcNrEVNeqigAMAjMoMeEvPMN9mdwI1Gea0p-dHiszdAKLPumEbwS-CCced4dawL7jLTwLGsv3pngL7C4K2cFYW4FszafdyIxvebaqj8y0n2QHCnAs5mBvszRGWyWxWr30rY3znCL1SBF3OsZG5rctBDfkv8qSb7XZzgLncb0R1-E2ZfK27zFFBWclEo6NJTF8ZKN50q-r17ITfnf6MBRsHvZ-4dk7TA"
);

export default function App() {
  const { routes } = useRoutes();
  const navigationLinks = useMemo((): NavigationLink[] => {
    return routes
      .filter((route) => route.showInNavigationMenu ?? false)
      .map((route) => {
        return {
          label: route.title ?? "Page have no title",
          destination: route.path,
        };
      });
  }, [routes]);

  return (
    <>
      <NavigationMenu navigationLinks={navigationLinks} />
      <AppRoutes />
    </>
  );
}
