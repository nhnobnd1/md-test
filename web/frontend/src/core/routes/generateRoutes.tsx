import { Route } from "react-router";
import { IRoute } from "src/core/models/routes";
import RouteMiddleware from "src/core/routes/RouteMiddleware";
import { makeId } from "src/core/utilities";

const generateRoutes = (route: IRoute) => {
  if (route.routes) {
    const { routes, element, ...nest } = route;
    const childRoutes = routes.map((child) => {
      return generateRoutes(child);
    });

    return (
      <Route
        element={<RouteMiddleware route={{ ...nest, element, routes }} />}
        {...nest}
        key={makeId(12)}
      >
        {childRoutes}
      </Route>
    );
  }

  return (
    <Route
      element={<RouteMiddleware route={route} />}
      {...route}
      key={makeId(12)}
    />
  );
};

export default generateRoutes;
