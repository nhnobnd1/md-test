import { createRoutePath } from "@moose-desk/core";

const SettingRoutePaths = createRoutePath({
  Index: "setting",

  Workdesk: {
    Index: "workdesk",
    TicketSetting: {
      Index: "ticket-setting",
    },
    Views: {
      Index: "views",
    },
    Macros: {
      Index: "macros",
    },
    Tag: {
      Index: "tag",
    },
  },
  AccountSecurity: {
    Index: "account&security",
    Profile: {
      Index: "profile",
    },
    AccessManager: {
      Index: "access-manager",
    },
    Security: {
      Index: "security",
    },
  },
} as const);

export default SettingRoutePaths;
