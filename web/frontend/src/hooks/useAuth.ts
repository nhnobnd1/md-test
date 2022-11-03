import { useAuthContext } from "src/core/authentication";
import { Account } from "src/models/Auth";

export default function useAuth() {
  return useAuthContext<Account>();
}
