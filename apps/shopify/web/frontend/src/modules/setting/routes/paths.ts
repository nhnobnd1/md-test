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
    Index: "access-manager",
    Profile: "profile",
    Security: "security",
  },
} as const);

export default SettingRoutePaths;
