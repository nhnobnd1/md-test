type RoutePath = {
  readonly Index: string;
  readonly [key: string]: string | RoutePath;
};

type JoinPath<
  Prefix extends string,
  A extends string,
  B extends string
> = Prefix extends "" ? `${A}${B}` : `${Prefix}${A}${B}`;

type RoutePathOutput<
  Input extends RoutePath,
  Prefix extends string = "/",
  K extends keyof Input = keyof Input
> = {
  [P in K]: P extends "Index"
    ? JoinPath<"", Prefix, Input["Index"]>
    : Input[P] extends RoutePath
    ? RoutePathOutput<
        Input[P],
        JoinPath<
          "",
          Prefix,
          Input["Index"] extends "" ? "" : `${Input["Index"]}/`
        >
      >
    : Input[P] extends string
    ? JoinPath<
        Prefix,
        Input["Index"] extends "" ? "" : `${Input["Index"]}/`,
        Input[P]
      >
    : "";
};

export default function createRoutePath<Input extends RoutePath>(
  input: Input,
  prefix = "/"
): RoutePathOutput<Input> {
  const output: any = {};
  const index = input.Index.length > 0 ? `${prefix}${input.Index}` : "";

  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      const path = input[key];

      if (typeof path === "object") {
        output[key] = createRoutePath(path, index !== "/" ? index + "/" : "/");
      } else if (key === "Index") {
        output[key] = index.length ? index : prefix;
      } else {
        output[key] = index + "/" + path;
      }
    }
  }

  return output;
}
