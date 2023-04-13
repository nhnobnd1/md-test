import jwt_decode from "jwt-decode";
import { TokenManager } from "./StorageManager";
interface BaseToken {
  sub: string;
  preferred_username: string;
  email: string;
  role: string;
  tenantid: string;
  given_name: string;
  family_name: string;
  phone_number: string;
  phone_number_verified: string;
  email_verified: string;
  unique_name: string;
  storeId: string;
  subdomain: string;
  oi_prst: string;
  oi_au_id: string;
  client_id: string;
  oi_tkn_id: string;
  scope: string;
  exp: number;
  iss: string;
  iat: string;
}

export function useRole(): string {
  const baseToken = TokenManager.getToken("base_token");
  if (baseToken) {
    const decoded: { role: string } = jwt_decode(baseToken);
    return decoded.role;
  }
  return "";
}

export function useUser() {
  const baseToken = TokenManager.getToken("base_token");
  if (baseToken) {
    const decoded: BaseToken = jwt_decode(baseToken);
    return decoded;
  }
  return null;
}
