interface UseWritableMemoProps<Type> {
    get(): Type;
    set(value: Type): void;
}
export declare function useWritableMemo<Type>({ get, set }: UseWritableMemoProps<Type>, deps: any[]): (Type | ((value: Type) => void))[];
export {};
