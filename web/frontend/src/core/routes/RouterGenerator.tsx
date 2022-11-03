import { ReactElement, useMemo } from "react";
import { Location, Route, Routes } from "react-router-dom";
import { IRoute } from "src/core/models/routes";
import generateRoutes from "src/core/routes/generateRoutes";
import LocationEffect from "src/core/routes/LocationEffect";

interface RouterGeneratorProps {
  routes: IRoute[];
  notFoundElement: ReactElement;
  onRouteChange?: (location: Location) => void;
}

const RouterGenerator = ({
  routes,
  notFoundElement,
  onRouteChange,
}: RouterGeneratorProps) => {
  const generatedRoutes = useMemo(
    () =>
      routes.map((route) => {
        return generateRoutes(route);
      }),
    [routes]
  );

  return (
    <>
      <LocationEffect onChange={onRouteChange} />
      <Routes>
        {generatedRoutes}
        <Route path="*" element={notFoundElement} />
      </Routes>
    </>
  );
};

export default RouterGenerator;
