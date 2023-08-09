import { BaseListRequest, BaseListResponse, BaseResponse, Role } from '../unty';
export interface Agent {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    companyName: string | null;
    storeId: string | null;
    isOwner: boolean;
    isActive: boolean;
    emailConfirmed: boolean;
    timezone: string;
    role: Role;
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
}
export interface GetListAgentRequest extends BaseListRequest {
    isLive?: number;
}
export type GetListAgentResponse = BaseListResponse<Agent>;
export interface CreateAgentRequest {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    storeId: string | null;
    phoneNumber?: string;
    subdomain?: string;
}
export type CreateAgentResponse = BaseResponse<Agent>;
export declare enum ErrorCodeCreate {
    INVITATION_EXISTS = "INVITATION_EXISTS",
    USER_IS_EXISTS = "USER_IS_EXISTS"
}
export type GetOneAgentResponse = BaseResponse<Agent>;
export interface UpdateAgentRequest {
    firstName: string;
    lastName?: string;
    role?: Role;
    phoneNumber?: string;
}
export type UpdateAgentResponse = BaseResponse<Agent>;
export type DeleteAgentResponse = BaseResponse<{}>;
export interface ActiveNewAgentRequest {
    token: string;
    email: string;
    storeId: string;
    password: string;
    confirmPassword: string;
}
export type ActiveNewAgentResponse = BaseResponse<Agent>;
export interface ResendEmailInvitationRequest {
    email: string;
    storeId: string;
}
export type ResendEmailInvitationResponse = BaseResponse<string>;
export type DeActiveAgentResponse = BaseResponse<string>;
export type ReActiveResponse = BaseResponse<string>;
export interface CheckTokenNewAgentRequest {
    token: string;
    email: string;
    storeId: string;
}
export declare enum TypeCheckTokenNewAgent {
    TOKEN_VALID = "TOKEN_VALID",
    TOKEN_INVALID = "TOKEN_INVALID",
    INVITATION_NOT_EXISTS = "INVITATION_NOT_EXISTS",
    USER_ACTIVE = "USER_ACTIVE"
}
export type CheckTokenNewAgentResponse = BaseResponse<TypeCheckTokenNewAgent>;
//# sourceMappingURL=Agent.d.ts.map