import { IRoute } from "../models/routes";

export function findRouteHasPermission(
  routes: IRoute[],
  permissions: string[]
): IRoute | undefined {
  function can(perms: string | string[]) {
    let listPermissions: string[] = [];

    if (!Array.isArray(perms)) {
      listPermissions = perms.split(",");
    } else {
      listPermissions = perms;
    }

    if (!listPermissions.length) {
      return true;
    }

    const granted =
      permissions.filter((perm) => listPermissions.includes(perm)).length > 0;

    return granted;
  }

  for (const route of routes) {
    if (!can(route.permissions || [])) {
      continue;
    }

    if (route.routes) {
      const foundRoute = findRouteHasPermission(route.routes, permissions);

      if (foundRoute) {
        return foundRoute;
      }

      continue;
    }

    return route;
  }

  return undefined;
}

export const pathMatched = (location: string, path: string, exact = false) => {
  const locationParts = location.split("/");
  const pathParts = path.split("/");

  if (
    pathParts.length > locationParts.length ||
    (exact && pathParts.length !== locationParts.length)
  ) {
    return false;
  }

  for (let index = 0; index < pathParts.length; index++) {
    const part = pathParts[index];
    if (part.match(/:([\w\W]+)/gi)) {
      continue;
    }

    if (part !== locationParts[index]) {
      return false;
    }
  }

  return true;
};
