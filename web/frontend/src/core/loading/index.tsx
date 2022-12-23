import { Loading } from "@shopify/polaris";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useToggle } from "src/core/hooks/useToggle";

export type LoadingContextType = {
  startLoading: () => void;
  stopLoading: () => void;
  state: boolean;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export type LoadingComponentType = React.FunctionComponent<{
  state: boolean;
  color?: string;
}>;

interface LoadingProviderProps {
  color?: string;
  component?: LoadingComponentType;
  children?: ReactNode;
}

export function LoadingProvider({
  children,
  color,
  component: Component,
}: LoadingProviderProps) {
  const { state, on: turnOnLoading, off: turnOffLoading } = useToggle();
  const setCount = useState(0)[1];

  const startLoading = useCallback(() => {
    turnOnLoading();
    // setCount((cur) => cur + 1);
    setCount(1);
  }, []);

  const stopLoading = useCallback(() => {
    setCount((cur) => {
      if (cur === 1) {
        turnOffLoading();
        return 0;
      }

      return cur - 1;
    });
  }, []);

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, state }}>
      {children}
      {Component ? (
        <Component state={state} color={color} />
      ) : (
        state && <Loading />
      )}
    </LoadingContext.Provider>
  );
}

export const useLoading = (state?: boolean) => {
  const context = useContext<LoadingContextType | undefined>(LoadingContext);

  if (context === undefined) {
    throw new Error("useLoading must be used in LoadingProvider");
  }

  useEffect(() => {
    if (typeof state === "undefined") {
      return;
    }

    if (state) {
      context.startLoading();
    } else {
      context.stopLoading();
    }
  }, [state, context]);

  return context;
};
