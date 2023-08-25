import { Role } from "@moose-desk/repo";
export const hiddenEditAgent = (
  selfOwner?: "True" | "False",
  self?: boolean,
  owner?: boolean,
  admin?: boolean,
  lead?: boolean,
  basic?: boolean,
  role?: Role.Admin | Role.AgentLeader | Role.BasicAgent | undefined
) => {
  // dont change position checking
  if (owner) return true;
  if (self) return true;
  if (basic) return true;
  if (selfOwner === "True") return false;
  if (admin && role === Role.Admin) return true;
  if (lead && (role === Role.Admin || role === Role.AgentLeader)) return true;
  return false;
};
