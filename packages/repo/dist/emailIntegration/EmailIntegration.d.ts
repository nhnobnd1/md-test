import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';
export declare enum AuthenticationSMTP {
    Plain = "Plain",
    Login = "Login",
    MD5 = "CRAM - MD5"
}
export declare enum AccessType {
    Both = "both",
    Incoming = "incoming",
    Outgoing = "outgoing"
}
export declare enum MailSettingType {
    CUSTOM = "CUSTOM",
    MOOSEDESK = "MOOSEDESK",
    FORWARD = "FORWARD"
}
export declare enum MailBoxType {
    GMAIL = "GMAIL",
    OUTLOOK = "OUTLOOK",
    OTHER = "OTHER",
    MOOSEDESK = "MOOSEDESK"
}
export interface SignInCallbackResponse {
    refKey: string;
    accessType: string;
    name: string;
    oauthStatus: string;
    supportEmail: string;
    type: 'new' | 'update' | null;
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
    mailboxConfig: MailBoxConfig | {
        forwardEmail: string;
    };
    storeId: string;
}
export interface GetEmailGoogleAuthRequest {
    subdomainForTest?: string;
    type?: 'update' | 'new';
    id?: string;
}
export interface GetEmailMicrosoftAuthRequest {
    subdomainForTest?: string;
    type?: 'update' | 'new';
}
export declare type GetEmailGoogleAuthResponse = BaseResponse<string>;
export interface GetListEmailRequest extends BaseListRequest {
}
export declare type GetListEmailResponse = BaseListResponse<EmailIntegration>;
export declare type GetOneEmailResponse = BaseResponse<EmailIntegration>;
export interface CreateEmailIntegrationRequest {
    name: string;
    supportEmail: string;
    isPrimaryEmail: boolean;
    mailboxType: MailBoxType;
    mailboxConfig: MailBoxConfig | {
        forwardEmail: string;
    };
}
export declare type CreateEmailIntegrationResponse = BaseResponse<EmailIntegration>;
export interface UpdateEmailIntegrationRequest {
    name: string;
    supportEmail: string;
    isPrimaryEmail: boolean;
    mailboxType: MailBoxType;
    mailboxConfig: MailBoxConfig | {
        forwardEmail: string;
    };
}
export declare type UpdateEmailIntegrationResponse = BaseResponse<EmailIntegration>;
export interface CheckConnectionRequest {
    host: string;
    port: number;
    tls: boolean;
    user: string;
    password: string;
}
//# sourceMappingURL=EmailIntegration.d.ts.map