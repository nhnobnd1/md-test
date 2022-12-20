import createRoutePath from "src/core/routes/createRoutePath";

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
} as const);

export default SettingRoutePaths;
