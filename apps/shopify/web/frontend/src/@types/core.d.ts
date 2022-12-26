declare module "@moose-desk/core" {
  interface IRoute {
    showInNavigationMenu?: boolean;
    navigation?: Omit<
      NavigationItemProps,
      "label" | "subNavigationItems" | "onClick" | "onToggleExpandedState"
    >;
  }
}

export {};
