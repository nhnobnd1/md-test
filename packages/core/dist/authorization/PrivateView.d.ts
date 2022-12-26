import React, { ReactElement } from "react";
interface PrivateViewProps {
    permissions: string | string[];
    children?: React.ReactNode | ((granted: boolean) => ReactElement);
    guestView?: React.ReactNode;
}
declare const PrivateView: React.MemoExoticComponent<({ permissions, children, guestView }: PrivateViewProps) => any>;
export default PrivateView;
