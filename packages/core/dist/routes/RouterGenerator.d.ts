import React from "react";
import { Location } from "react-router-dom";
import { IRoute } from "../models/routes";
interface RouterGeneratorProps {
    routes: IRoute[];
    notFoundElement: React.ReactNode;
    onRouteChange?: (location: Location) => void;
}
declare const RouterGenerator: ({ routes, notFoundElement, onRouteChange, }: RouterGeneratorProps) => JSX.Element;
export default RouterGenerator;
