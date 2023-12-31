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

// GET LIST
export interface GetListAgentRequest extends BaseListRequest {
  isLive?: number;
}

export type GetListAgentResponse = BaseListResponse<Agent>;

// CREATE
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

export enum ErrorCodeCreate {
  INVITATION_EXISTS = "INVITATION_EXISTS",
  USER_IS_EXISTS = "USER_IS_EXISTS",
}

// GET ONE
export type GetOneAgentResponse = BaseResponse<Agent>;

// UPDATE
export interface UpdateAgentRequest {
  firstName: string;
  lastName?: string;
  role?: Role;
  phoneNumber?: string;
}

export type UpdateAgentResponse = BaseResponse<Agent>;

// DELETE
export type DeleteAgentResponse = BaseResponse<{}>;

// ACTIVE NEW AGENT
export interface ActiveNewAgentRequest {
  token: string;
  email: string;
  storeId: string;
  password: string;
  confirmPassword: string;
}

export type ActiveNewAgentResponse = BaseResponse<Agent>;

// RESEND EMAIL
export interface ResendEmailInvitationRequest {
  email: string;
  storeId: string;
}

export type ResendEmailInvitationResponse = BaseResponse<string>;

// DE ACTIVE
export type DeActiveAgentResponse = BaseResponse<string>;

// REACTIVE
export type ReActiveResponse = BaseResponse<string>;

export interface CheckTokenNewAgentRequest {
  token: string;
  email: string;
  storeId: string;
}

export enum TypeCheckTokenNewAgent {
  TOKEN_VALID = "TOKEN_VALID",
  TOKEN_INVALID = "TOKEN_INVALID",
  INVITATION_NOT_EXISTS = "INVITATION_NOT_EXISTS",
  USER_ACTIVE = "USER_ACTIVE",
}

export type CheckTokenNewAgentResponse = BaseResponse<TypeCheckTokenNewAgent>;
