export { default as EventListenersManager } from "./EventListenersManager";
export { default as StorageManager, StorageManager as StorageManagerClass, TokenManager, } from "./StorageManager";
export * from "./VariableWatcher";
export * from "./convertTime";
export * from "./object";
export * from "./regexes";
export * from "./request";
export * from "./useRole";
export declare function makeId(length: number): string;
export declare function upperCaseFirst(str: string): string;
export declare enum MediaScreen {
    XS = 320,
    SM = 576,
    MD = 768,
    LG = 1024,
    XL = 1280,
    XXL = 1600
}
