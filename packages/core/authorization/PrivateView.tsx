import React, { memo, ReactElement } from "react";
import useAuthorization from "./useAuthorization";

interface PrivateViewProps {
  permissions: string | string[];
  children?: React.ReactNode | ((granted: boolean) => ReactElement);
  guestView?: React.ReactNode;
}

const PrivateView = memo(
  ({ permissions, children, guestView }: PrivateViewProps) => {
    const { granted } = useAuthorization(permissions);
    if (typeof children === "function") {
      return children(granted);
    }

    return <>{granted ? children : guestView}</>;
  }
);

export default PrivateView;
