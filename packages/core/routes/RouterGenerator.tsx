import React, { useMemo } from "react";
import { Location, Route, Routes } from "react-router-dom";
import { IRoute } from "../models/routes";
import generateRoutes from "../routes/generateRoutes";
import LocationEffect from "../routes/LocationEffect";

interface RouterGeneratorProps {
  routes: IRoute[];
  notFoundElement: React.ReactNode;
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
        <Route path="*" element={notFoundElement as any} />
      </Routes>
    </>
  );
};

export default RouterGenerator;
