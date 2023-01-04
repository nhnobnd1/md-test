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
      Create: "new",
      Edit: "edit/:id",
    },
  },
  AccountSecurity: {
    Index: "profile",
    AccessManager: "access-manager",
    Security: "security",
  },
} as const);

export default SettingRoutePaths;
