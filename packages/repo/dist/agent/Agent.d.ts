import { BaseListRequest, BaseListResponse, BaseResponse, Role } from "../unty";
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
}
export declare type GetListAgentResponse = BaseListResponse<Agent>;
export interface CreateAgentRequest {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    storeId: string | null;
    phoneNumber?: string;
    subdomain?: string;
}
export declare type CreateAgentResponse = BaseResponse<Agent>;
export declare enum ErrorCodeCreate {
    INVITATION_EXISTS = "INVITATION_EXISTS",
    USER_IS_EXISTS = "USER_IS_EXISTS"
}
export declare type GetOneAgentResponse = BaseResponse<Agent>;
export interface UpdateAgentRequest {
    firstName: string;
    lastName?: string;
    role?: Role;
    phoneNumber?: string;
}
export declare type UpdateAgentResponse = BaseResponse<Agent>;
export declare type DeleteAgentResponse = BaseResponse<{}>;
export interface ActiveNewAgentRequest {
    token: string;
    email: string;
    storeId: string;
    password: string;
    confirmPassword: string;
}
export declare type ActiveNewAgentResponse = BaseResponse<Agent>;
export interface ResendEmailInvitationRequest {
    email: string;
    storeId: string;
}
export declare type ResendEmailInvitationResponse = BaseResponse<string>;
export declare type DeActiveAgentResponse = BaseResponse<string>;
export declare type ReActiveResponse = BaseResponse<string>;
//# sourceMappingURL=Agent.d.ts.map