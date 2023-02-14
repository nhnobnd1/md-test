export interface CountDown {
    initValue: number;
    key: string;
}
export interface UseCountDown {
    state: number;
    clearCountDown: (key: string) => void;
    initCountdown: (key: string) => void;
}
export declare function useCountDown({ initValue, key }: CountDown): UseCountDown;
