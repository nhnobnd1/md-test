import { createRoutePath } from "@moose-desk/core";

const SettingChannelRoutePaths = createRoutePath({
  Index: "setting-channel",
  ChannelEmail: {
    Index: "channel-email",
    Create: "new",
    Update: ":id",
  },
  EmailIntegration: "email-integration/gmail/callback",
  MicrosoftIntegration: "email-integration/outlook/callback",
} as const);

export default SettingChannelRoutePaths;
