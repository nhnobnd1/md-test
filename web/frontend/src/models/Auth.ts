import { HttpStatusCode } from "axios";

export interface Account {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    expiresIn: number;
    tokenType: "Bearer";
  };
  datetime: string;
  statusCode: HttpStatusCode;
}
