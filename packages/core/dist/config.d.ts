export declare class Config {
    modeEnv: string | undefined;
    subdomain: string | undefined;
    app: string | undefined;
    setConfig({ modeEnv, subdomain, app, }: {
        modeEnv?: string;
        subdomain?: string;
        app?: string;
    }): void;
    getConfig(): {
        modEnv: string | undefined;
        subdomain: string | undefined;
        app: string | undefined;
    };
}
declare const _default: Config;
export default _default;
