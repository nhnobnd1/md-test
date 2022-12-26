export declare const useTimeout: (callback: () => void, time: number) => {
    run: () => void;
    cancel: () => void;
};
