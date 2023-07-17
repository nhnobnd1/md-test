import config from "../config";

export class StorageManager<Types> {
  tokens: any = {};
  getToken(type: Types) {
    if (!this.getPrefix()) {
      return;
    }
    if (config.getConfig().app)
      return this.tokens[`${this.getPrefix()}_${type}`];
    return localStorage.getItem(`${this.getPrefix()}_${type}`);
  }

  setToken(type: Types, token: string) {
    if (!this.getPrefix()) {
      return;
    }
    this.tokens[`${this.getPrefix()}_${type}`] = token;
    if (config.getConfig().app) return;
    return localStorage.setItem(`${this.getPrefix()}_${type}`, token);
  }

  getPrefix() {
    const modeEnv = config.getConfig().modEnv;
    const subdomain = config.getConfig().subdomain;
    if (!modeEnv || !subdomain) {
      return "";
    }
    const prefixToken = `${modeEnv}_${subdomain}`;
    return prefixToken;
  }
}

export const TokenManager = new StorageManager<TokenTypes>();

export default new StorageManager();
