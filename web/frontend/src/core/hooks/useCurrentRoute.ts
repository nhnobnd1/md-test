import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { IRoute } from "src/core/models/routes";
import { pathMatched } from "src/core/routes/helpers";
import useRoutes from "src/core/routes/useRoutes";

export const useCurrentRoute = () => {
  const { routes } = useRoutes();
  const [currentRoute, setCurrentRoute] = useState<IRoute>();
  const location = useLocation();

  const findCurrentRoute = useCallback(
    (curItems: IRoute[]) => {
      const matchedItems = curItems.filter((item) =>
        pathMatched(location.pathname, item.path)
      );

      for (const matchedItem of matchedItems) {
        if (matchedItem) {
          if (matchedItem.routes) {
            findCurrentRoute(matchedItem.routes);
          } else if (pathMatched(location.pathname, matchedItem.path, true)) {
            setCurrentRoute(matchedItem);
            break;
          }
        }
      }
    },
    [location]
  );

  useEffect(() => {
    findCurrentRoute(routes);
  }, [findCurrentRoute, routes]);

  return currentRoute;
};
