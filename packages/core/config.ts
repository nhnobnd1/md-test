export class Config {
  modeEnv: string | undefined = undefined;
  subdomain: string | undefined = undefined;
  app: string | undefined = undefined;

  setConfig({
    modeEnv,
    subdomain,
    app,
  }: {
    modeEnv?: string;
    subdomain?: string;
    app?: string;
  }) {
    this.modeEnv = modeEnv || undefined;
    this.subdomain = subdomain || undefined;
    this.app = app || undefined;
  }

  getConfig() {
    return {
      modEnv: this.modeEnv,
      subdomain: this.subdomain,
      app: this.app,
    };
  }
}

export default new Config();
