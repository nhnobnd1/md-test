export declare class StorageManager<Types> {
    getToken(type: Types): string | undefined;
    setToken(type: Types, token: string): void;
    getPrefix(): string;
}
export declare const TokenManager: StorageManager<TokenTypes>;
declare const _default: StorageManager<unknown>;
export default _default;
