type RoutePath = {
    readonly Index: string;
    readonly [key: string]: string | RoutePath;
};
type JoinPath<Prefix extends string, A extends string, B extends string> = Prefix extends "" ? `${A}${B}` : `${Prefix}${A}${B}`;
type RoutePathOutput<Input extends RoutePath, Prefix extends string = "/", K extends keyof Input = keyof Input> = {
    [P in K]: P extends "Index" ? JoinPath<"", Prefix, Input["Index"]> : Input[P] extends RoutePath ? RoutePathOutput<Input[P], JoinPath<"", Prefix, Input["Index"] extends "" ? "" : `${Input["Index"]}/`>> : Input[P] extends string ? JoinPath<Prefix, Input["Index"] extends "" ? "" : `${Input["Index"]}/`, Input[P]> : "";
};
export default function createRoutePath<Input extends RoutePath>(input: Input, prefix?: string): RoutePathOutput<Input>;
export {};
