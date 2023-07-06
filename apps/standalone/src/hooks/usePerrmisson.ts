import { useRole } from "@moose-desk/core";
import { Role } from "src/models/Rule";

export function usePermission() {
  const role = useRole();

  return {
    role,
    isAdmin:
      role === Role.Admin || localStorage.getItem("login_redirect") === "true",
    isLead: role === Role.AgentLeader,
    isAgent: role === Role.BasicAgent,
  };
}
