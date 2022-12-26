export declare const useInterval: (callback: () => void, time: number) => {
    run: () => void;
    cancel: () => void;
};
