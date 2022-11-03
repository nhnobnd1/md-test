class TokenManager<Types extends TokenTypes> {
  getToken(type: Types) {
    return localStorage.getItem(type) || "";
  }

  setToken(type: Types, token: string) {
    return localStorage.setItem(type, token);
  }
}

export default new TokenManager();
