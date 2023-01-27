import { Choice, SortOrderOptions } from "src/models/Form";

export const optionsSort: Choice[] = [
  { label: "Group name A-Z", value: `name:${SortOrderOptions.ACS}` },
  { label: "Group name Z-A", value: `name:${SortOrderOptions.DES}` },
  {
    label: "Number of Agents A-Z",
    value: `memberCount:${SortOrderOptions.ACS}`,
  },
  {
    label: "Number of Agents Z-A",
    value: `memberCount:${SortOrderOptions.DES}`,
  },
];
