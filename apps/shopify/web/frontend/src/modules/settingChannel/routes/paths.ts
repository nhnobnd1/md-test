import { createRoutePath } from "@moose-desk/core";

const SettingChannelRoutePaths = createRoutePath({
  Index: "setting-channel",
  ChannelEmail: {
    Index: "channel-email",
  },
  Widgets: {
    Index: "widgets",
  },
} as const);

export default SettingChannelRoutePaths;
