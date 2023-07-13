import { useAuthContext } from "@moose-desk/core";
import { Account } from "src/models/Auth";

export default function useAuth() {
  return useAuthContext<any>();
}
