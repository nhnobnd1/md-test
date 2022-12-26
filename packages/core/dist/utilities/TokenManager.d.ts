declare class TokenManager<Types extends TokenTypes> {
    getToken(type: Types): string;
    setToken(type: Types, token: string): void;
}
declare const _default: TokenManager<TokenTypes>;
export default _default;
