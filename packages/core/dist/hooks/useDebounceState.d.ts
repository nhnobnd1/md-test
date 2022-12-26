import { DebounceSettings } from "lodash-es";
import { SetStateAction } from "react";
export declare function useDebounceState<T>(defaultValue: T, options: DebounceSettings & {
    wait: number;
}): [T, (value: SetStateAction<T>) => void];
