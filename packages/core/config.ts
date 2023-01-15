export class Config {
  modeEnv: string | undefined = undefined;
  subdomain: string | undefined = undefined;

  setConfig({ modeEnv, subdomain }: { modeEnv?: string; subdomain?: string }) {
    this.modeEnv = modeEnv || undefined;
    this.subdomain = subdomain || undefined;
  }

  getConfig() {
    return {
      modEnv: this.modeEnv,
      subdomain: this.subdomain,
    };
  }
}

export default new Config();
