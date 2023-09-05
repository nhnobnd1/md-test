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
  if (selfOwner === "True") return false;
  if (owner) return true;
  if (self) return false;
  if (basic) return true;
  if (admin && role === Role.Admin) return false;
  if (lead && role === Role.AgentLeader) return false;
  if (lead && role === Role.Admin) return true;
  return false;
};
