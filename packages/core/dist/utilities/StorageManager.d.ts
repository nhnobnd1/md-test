export declare class StorageManager<Types> {
    tokens: any;
    getToken(type: Types): any;
    setToken(type: Types, token: string): void;
    getPrefix(): string;
}
export declare const TokenManager: StorageManager<TokenTypes>;
declare const _default: StorageManager<unknown>;
export default _default;
