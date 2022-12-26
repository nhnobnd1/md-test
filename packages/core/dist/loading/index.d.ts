import { FunctionComponent, ReactNode } from "react";
export declare type LoadingContextType = {
    startLoading: () => void;
    stopLoading: () => void;
    state: boolean;
};
export declare const LoadingContext: import("react").Context<LoadingContextType | undefined>;
export declare type LoadingComponentType = FunctionComponent<{
    state: boolean;
    color?: string;
}>;
interface LoadingProviderProps {
    color?: string;
    component: LoadingComponentType;
    children?: ReactNode;
}
export declare function LoadingProvider({ children, color, component: Component, }: LoadingProviderProps): JSX.Element;
export declare const useLoading: (state?: boolean) => LoadingContextType;
export {};
