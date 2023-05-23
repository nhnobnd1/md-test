import {
  generatePath,
  useDidUpdate,
  useNavigate,
  useSearchParams,
} from "@moose-desk/core";
import { useEffect, useState } from "react";
import { setSignInCallback } from "src/modules/settingChannel/redux/channelEmail";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import { useAppDispatch, useAppSelector } from "src/redux/hook";

const ChannelOutlookIntegration = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<{
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signInCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  useEffect(() => {
    const payload: any = {};
    for (const [key, value] of searchParams) {
      payload[key] = value;
    }
    dispatch(setSignInCallback({ ...payload, callbackName: "microsoft" }));
  }, [searchParams]);

  useDidUpdate(() => {
    if (
      signInCallback.name &&
      signInCallback.accessType &&
      signInCallback.oauthStatus === "success" &&
      signInCallback.refKey &&
      signInCallback.supportEmail &&
      signInCallback.type
    ) {
      if (signInCallback.type === "new") {
        navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Create), {
          state: {
            callBack: true,
          },
        });
      } else {
        navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Update));
      }
    } else {
      setError({
        message: "Sign In Error",
      });
    }
  }, [signInCallback]);

  return <>{error && error.message}</>;
};

export default ChannelOutlookIntegration;
