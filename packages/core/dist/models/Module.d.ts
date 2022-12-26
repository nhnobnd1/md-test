import { IRoute } from "./routes";
export interface ModulePath {
    [key: string]: string | ModulePath;
}
export interface Module {
    name: string;
    route: {
        item: IRoute;
        paths: ModulePath;
    };
    locales?: Record<string, any>;
}
