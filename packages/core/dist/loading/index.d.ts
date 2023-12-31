import { FunctionComponent, ReactNode } from "react";
export type LoadingContextType = {
    startLoading: () => void;
    stopLoading: () => void;
    state: boolean;
};
export declare const LoadingContext: import("react").Context<LoadingContextType | undefined>;
export type LoadingComponentType = FunctionComponent<{
    state: boolean;
    color?: string;
    children?: React.ReactNode;
}>;
interface LoadingProviderProps {
    color?: string;
    component: LoadingComponentType;
    children?: ReactNode;
    isWrap?: boolean;
}
export declare function LoadingProvider({ children, color, isWrap, component: Component, }: LoadingProviderProps): JSX.Element;
export declare const useLoading: (state?: boolean) => LoadingContextType;
export {};
