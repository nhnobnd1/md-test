import { Role } from "@moose-desk/repo";

export const enabledEditRole = (
  owner?: boolean,
  admin?: boolean,
  leader?: boolean,
  role?: Role.Admin | Role.AgentLeader | Role.BasicAgent | undefined,
  isActive?: boolean,
  emailConfirmed?: boolean
) => {
  const accountActive = isActive && emailConfirmed;
  if (accountActive) {
    if (owner) return true;
    if (admin) return true;
    if (admin && role !== Role.Admin) return true;
    if (leader && role === Role.BasicAgent) return true;
    return false;
  }
  return false;
};
export const hiddenEditAgent = (
  self?: boolean,
  owner?: boolean,
  admin?: boolean,
  lead?: boolean,
  basic?: boolean,
  role?: Role.Admin | Role.AgentLeader | Role.BasicAgent | undefined
) => {
  if (owner) return true;
  if (self) return true;
  if (basic) return true;
  if (admin && role === Role.Admin) return true;

  if (lead && (role === Role.Admin || role === Role.AgentLeader)) return true;
  return false;
};
