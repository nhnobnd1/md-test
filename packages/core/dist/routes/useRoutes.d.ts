import { IRoute } from "../models/routes";
export default function useRoutes<I extends IRoute>(): {
    routes: I[];
    addRoutes: (...routes: I[]) => void;
    removeRoute: (path: string) => void;
};
