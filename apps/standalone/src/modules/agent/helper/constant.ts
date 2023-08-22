import { Role } from "@moose-desk/repo";

export const ROLE_OPTIONS_LEAD = [
  { label: "Agent Leader", value: Role.AgentLeader },
  { label: "Basic Agent", value: Role.BasicAgent },
];
export const ROLE_OPTIONS_FULL = [
  { label: "System Admin", value: Role.Admin },
  { label: "Agent Leader", value: Role.AgentLeader },
  { label: "Basic Agent", value: Role.BasicAgent },
];
