import { IRoute } from "../models/routes";
export declare function findRouteHasPermission(routes: IRoute[], permissions: string[]): IRoute | undefined;
export declare const pathMatched: (location: string, path: string, exact?: boolean) => boolean;
