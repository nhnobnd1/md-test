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

export enum MailBoxType {
  CUSTOM = "CUSTOM",
  MOOSEDESK = "MOOSEDESK",
}
export interface MailSetting {
  mailServer: string;
  port: number;
  useSsl: true;
  deleteFromServer?: false;
  authentication: string;
  email: string;
  password: string;
}

export interface MailBoxConfig {
  accessType: AccessType;
  refKey: string;
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
  mailboxConfig: MailBoxConfig;
}

export type CreateEmailIntegrationResponse = BaseResponse<EmailIntegration>;

export interface UpdateEmailIntegrationRequest {
  name: string;
  supportEmail: string;
  isPrimaryEmail: boolean;
  mailboxType: MailBoxType;
  mailboxConfig: MailBoxConfig;
}
export type UpdateEmailIntegrationResponse = BaseResponse<EmailIntegration>;
