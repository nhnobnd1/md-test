import { Route } from "react-router-dom";
import { IRoute } from "../models/routes";
import RouteMiddleware from "../routes/RouteMiddleware";
import { makeId } from "../utilities";

const generateRoutes = (route: IRoute) => {
  if (route.routes) {
    const { routes, element, index, ...nest } = route;
    const childRoutes = routes.map((child) => {
      return generateRoutes(child);
    });

    return (
      <Route
        element={<RouteMiddleware route={{ ...nest, element, routes }} />}
        {...nest}
        index={index as any}
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
