class Env {
  apiUrl: string = "";

  getApiUrl() {
    return this.apiUrl;
  }

  setApiUrl(url: string) {
    console.log(url, "url");
    this.apiUrl = url;
  }
}

export default new Env();
