import { BaseResponse } from "../unty";

export enum AuthenticationSMTP {
  Plain = "Plain",
  Login = "Login",
  MD5 = "CRAM - MD5",
}

export enum AccessType {
  Both = "both",
  Incoming = "incoming",
  Outgoing = "outgoing",
}

export enum MailSettingType {
  CUSTOM = "CUSTOM",
  MOOSEDESK = "MOOSEDESK",
}

export enum MailBoxType {
  GMAIL = "GMAIL",
  OUTLOOK = "OUTLOOK",
  OTHER = "OTHER",
  MOOSEDESK = "MOOSEDESK",
}

export interface SignInCallbackResponse {
  refKey: string;
  accessType: string;
  name: string;
  oauthStatus: string;
  supportEmail: string;
  type: "new" | "update" | null;
}
export interface MailSetting {
  mailServer: string;
  port: number;
  useSsl: boolean;
  deleteFromServer?: boolean;
  authentication: string;
  email: string;
  password: string;
}

export interface MailBoxConfig {
  accessType?: AccessType;
  refKey?: string;
  incoming: MailSetting;
  outgoing: MailSetting;
}

export interface EmailIntegration {
  _id: string;
  createdDatetime: string;
  createdTimestamp: number;
  createdBy: string;
  updatedDatetime: string;
  updatedTimestamp: number;
  updatedBy: number;
  deleted: boolean;
  deletedDatetime: null | string;
  deletedTimestamp: null | string;
  deletedBy: null | string;
  name: string;
  supportEmail: string;
  isPrimaryEmail: boolean;
  mailboxType: MailBoxType;
  mailboxConfig: {
    forwardEmail: string;
  };
  storeId: string;
}
export interface GetEmailGoogleAuthRequest {
  subdomainForTest?: string;
  type?: "update" | "new";
}

export type GetEmailGoogleAuthResponse = BaseResponse<string>;

export interface CreateEmailIntegrationRequest {
  name: string;
  supportEmail: string;
  isPrimaryEmail: boolean;
  mailboxType: MailBoxType;
  mailboxConfig: MailBoxConfig | { forwardEmail: string };
}

export type CreateEmailIntegrationResponse = BaseResponse<EmailIntegration>;

export interface UpdateEmailIntegrationRequest {
  name: string;
  supportEmail: string;
  isPrimaryEmail: boolean;
  mailboxType: MailBoxType;
  mailboxConfig: MailBoxConfig | { forwardEmail: string };
}
export type UpdateEmailIntegrationResponse = BaseResponse<EmailIntegration>;
