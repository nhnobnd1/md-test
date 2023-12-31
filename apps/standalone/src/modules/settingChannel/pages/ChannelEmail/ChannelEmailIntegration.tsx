import {
  generatePath,
  useDidUpdate,
  useNavigate,
  useSearchParams,
} from "@moose-desk/core";
import { useEffect, useState } from "react";
import useMessage from "src/hooks/useMessage";
import { setSignInCallback } from "src/modules/settingChannel/redux/channelEmail";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import { useAppDispatch, useAppSelector } from "src/redux/hook";

const ChannelEmailIntegration = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<{
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const message = useMessage();

  const signInCallback = useAppSelector(
    (state) => state.channelEmail.signInCallback
  );

  useEffect(() => {
    const payload: any = {};
    for (const [key, value] of searchParams) {
      payload[key] = value;
    }

    dispatch(setSignInCallback({ ...payload, callbackName: "gmail" }));
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
        navigate(
          generatePath(SettingChannelRoutePaths.ChannelEmail.Update, {
            id: signInCallback?.id,
          }),
          {
            state: {
              callBack: true,
            },
          }
        );
      }
    } else {
      navigate(generatePath(SettingChannelRoutePaths.ChannelEmail.Index), {});
      message.error("Sign in Error");
    }
  }, [signInCallback]);

  return <>{error && error.message}</>;
};

export default ChannelEmailIntegration;
