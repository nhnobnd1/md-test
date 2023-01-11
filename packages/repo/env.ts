class Env {
  apiUrl: string = "";

  getApiUrl() {
    return this.apiUrl;
  }

  setApiUrl(url: string) {
    this.apiUrl = url;
  }
}

export default new Env();
