import jwt_decode from "jwt-decode";
import { TokenManager } from "./StorageManager";

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
    const decoded = jwt_decode(baseToken);
    return decoded;
  }
  return null;
}
