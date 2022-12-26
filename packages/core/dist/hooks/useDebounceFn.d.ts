import { DebounceSettings } from "lodash-es";
declare type Fn = (...args: any) => any;
export declare function useDebounceFn<T extends Fn>(fn: T, options?: DebounceSettings & {
    wait: number;
}): {
    run: T;
    cancel: () => void;
    flush: () => ReturnType<T> | undefined;
};
export {};
