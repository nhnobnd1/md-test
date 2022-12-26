export declare function createVariableWithWatcher<T extends {
    [key: string | symbol]: any;
}>(target: T, onChange: (obj: T) => void): T;
