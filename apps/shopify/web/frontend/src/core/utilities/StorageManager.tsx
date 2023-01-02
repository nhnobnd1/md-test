type StorageType = "isAcceptUsing";

class StorageManager<Types extends StorageType> {
  getToken(type: Types) {
    return localStorage.getItem(type) || "";
  }

  setToken(type: Types, token: string) {
    return localStorage.setItem(type, token);
  }
}

export default new StorageManager();
