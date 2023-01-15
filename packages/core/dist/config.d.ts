export declare class Config {
    modeEnv: string | undefined;
    subdomain: string | undefined;
    setConfig({ modeEnv, subdomain }: {
        modeEnv?: string;
        subdomain?: string;
    }): void;
    getConfig(): {
        modEnv: string | undefined;
        subdomain: string | undefined;
    };
}
declare const _default: Config;
export default _default;
