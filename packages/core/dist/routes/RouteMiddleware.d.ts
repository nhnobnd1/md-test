import { IRoute } from "../models/routes";
interface RouteMiddlwareProps {
    route: IRoute;
}
declare const RouteMiddleware: ({ route }: RouteMiddlwareProps) => JSX.Element | null;
export default RouteMiddleware;
