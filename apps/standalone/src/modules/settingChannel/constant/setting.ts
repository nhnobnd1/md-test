export interface SettingMailServer {
  mailServer: string;
  port: number;
  useSsl: boolean;
  authentication: string;
}

export const settingIncoming: SettingMailServer = {
  mailServer: "imap.gmail.com",
  port: 993,
  useSsl: true,
  authentication: "xoauth2",
};

export const settingOutgoing: SettingMailServer = {
  mailServer: "smtp.gmail.com",
  port: 587,
  useSsl: true,
  authentication: "xoauth2",
};
