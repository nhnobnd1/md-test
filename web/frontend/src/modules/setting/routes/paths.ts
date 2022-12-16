import createRoutePath from "src/core/routes/createRoutePath";

const SettingRoutePaths = createRoutePath({
  Index: "setting",

  Workdesk: {
    Index: "workdesk",
    Tag: {
      Index: "tag-index",
      Create: "tag-create",
      Edit: "tag-edit/:id",
    },
  },
} as const);

export default SettingRoutePaths;
