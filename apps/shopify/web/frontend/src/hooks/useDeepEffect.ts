import isEqualWith from "lodash-es/isEqualWith";
import { DependencyList, EffectCallback, useEffect, useRef } from "react";

function useDeepEffect(
  callback: EffectCallback,
  dependencies: DependencyList
): void {
  const previousDependenciesRef = useRef<DependencyList>();

  useEffect(() => {
    if (
      previousDependenciesRef.current &&
      isEqualWith(
        previousDependenciesRef.current,
        dependencies,
        (prev, next) => {
          if (prev === next) return true;
          if (prev instanceof Date && next instanceof Date)
            return prev.getTime() === next.getTime();
          return undefined;
        }
      )
    ) {
      return;
    }
    callback();
    previousDependenciesRef.current = dependencies;
  }, dependencies);
}
export default useDeepEffect;
