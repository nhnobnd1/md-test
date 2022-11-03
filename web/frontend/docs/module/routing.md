---
title: Module - Routing
---

# {{$frontmatter.title}}

## 1. Define route paths

First of all, you need to define route paths first. It will be used in routes.

Use `createRoutePaths` to define your module's route paths constants.

**Example:**

```tsx
import createRoutePath from "src/core/routes/createRoutePath";

const DashboardRoutePaths = createRoutePath({
  Index: "dashboard",
  Child: "child",
} as const);

export default DashboardRoutePaths;
```

### Type Declarations

```ts
type RoutePath = {
  readonly Index: string;
  readonly [key: string]: string | RoutePath;
};

type JoinPath<
  Prefix extends string,
  A extends string,
  B extends string
> = Prefix extends "" ? `${A}${B}` : `${Prefix}${A}${B}`;

type RoutePathOutput<
  Input extends RoutePath,
  Prefix extends string = "/",
  K extends keyof Input = keyof Input
> = {
  [P in K]: P extends "Index"
    ? JoinPath<"", Prefix, Input["Index"]>
    : Input[P] extends RoutePath
    ? RoutePathOutput<
        Input[P],
        JoinPath<
          "",
          Prefix,
          Input["Index"] extends "" ? "" : `${Input["Index"]}/`
        >
      >
    : Input[P] extends string
    ? JoinPath<
        Prefix,
        Input["Index"] extends "" ? "" : `${Input["Index"]}/`,
        Input[P]
      >
    : "";
};

export default function createRoutePath<Input extends RoutePath>(
  input: Input,
  prefix = "/"
): RoutePathOutput<Input>;
```

## 2. Define routes

Each module has one root route, and you can define other routes as children of the root.

**Example:**

```tsx
import { AppstoreOutlined } from "@ant-design/icons";
import { lazy } from "react";
import { MenuItem } from "src/core/models/MenuItem";
import RouterHandler from "src/core/routes/RouterHandler";
import { DashboardLayout } from "src/layouts";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

const dashboardRoutes: MenuItem = {
  path: DashboardRoutePaths.Index,
  element: <DashboardLayout routes={async () => RouterHandler.routes} />,
  name: "errors:some_thing_went_wrong",
  icon: <AppstoreOutlined />,
  hideChildrenInMenu: false,
  routes: [
    {
      path: DashboardRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/dashboard/pages/Index")),
    },
    {
      path: DashboardRoutePaths.Child,
      component: lazy(() => import("src/modules/dashboard/pages/Child")),
    },
  ],
};

export default dashboardRoutes;
```

### Type Declarations

```ts
export interface MenuItem extends IRoute {
  /** Hide child nodes in the menu */
  hideChildrenInMenu?: boolean;
  /** Hide self and children in menu */
  hideInMenu?: boolean;
  /** Icon of the menu */
  icon?: React.ReactNode;
  /** The name of the menu */
  name?: string;
  /** disable menu option */
  disabled?: boolean;
  routes?: MenuItem[];
}
```
