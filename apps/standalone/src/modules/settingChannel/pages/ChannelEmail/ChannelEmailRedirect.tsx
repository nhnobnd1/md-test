import {
  generatePath,
  TokenManager,
  useAuthContext,
  useNavigate,
  useSearchParams,
} from "@moose-desk/core";
import { useCallback, useEffect } from "react";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import useCheckAdminRedirect from "src/store/useCheckAdminRedirect";

const ChannelEmailRedirect = () => {
  const [searchParams] = useSearchParams();
  const { login, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const updateStatusRedirect = useCheckAdminRedirect(
    (state) => state.updateStatusRedirect
  );

  useEffect(() => {
    const payload = getDataSearchParams();
    if (payload.baseToken && payload.refreshToken && payload.type) {
      TokenManager.setToken("base_token", payload.baseToken);
      TokenManager.setToken("refresh_token", payload.refreshToken);
      updateStatusRedirect(true);
      login({
        base_token: payload.baseToken,
        refresh_token: payload.refreshToken,
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const payload = getDataSearchParams();
    if (isLoggedIn) {
      if (payload.type === "create") {
        navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Index));
      } else if (payload.type === "update") {
        payload.id &&
          navigate(
            generatePath(SettingChannelRoutePaths.ChannelEmail.Update, {
              id: payload.id,
            })
          );
      }
    }
  }, [isLoggedIn]);

  const getDataSearchParams = useCallback(() => {
    const payload: any = {};
    for (const [key, value] of searchParams) {
      payload[key] = value;
    }
    return payload;
  }, [searchParams]);

  return <>Redirect</>;
};

export default ChannelEmailRedirect;
