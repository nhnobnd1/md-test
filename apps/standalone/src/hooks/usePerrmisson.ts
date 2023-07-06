import { useRole } from "@moose-desk/core";
import { Role } from "src/models/Rule";
import useCheckAdminRedirect from "src/store/useCheckAdminRedirect";

export function usePermission() {
  const role = useRole();
  const updateStatusRedirect = useCheckAdminRedirect(
    (state) => state.isRedirect
  );
  return {
    role,
    isAdmin: role === Role.Admin || (!role && updateStatusRedirect),
    isLead: role === Role.AgentLeader,
    isAgent: role === Role.BasicAgent,
  };
}
