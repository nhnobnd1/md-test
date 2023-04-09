import { Choice, SortOrderOptions } from "src/models/Form";

export const optionsSort: Choice[] = [
  { label: "Ticket title A-Z", value: `subject:${SortOrderOptions.ACS}` },
  { label: "Ticket title Z-A", value: `subject:${SortOrderOptions.DES}` },
  {
    label: "Customer A-Z",
    value: `customer:${SortOrderOptions.ACS}`,
  },
  {
    label: "Customer Z-A",
    value: `customer:${SortOrderOptions.DES}`,
  },
  {
    label: "Tags A-Z",
    value: `tags:${SortOrderOptions.ACS}`,
  },
  {
    label: "Tags Z-A",
    value: `tags:${SortOrderOptions.DES}`,
  },
  {
    label: "Priority A-Z",
    value: `priority:${SortOrderOptions.ACS}`,
  },
  {
    label: "Priority Z-A",
    value: `priority:${SortOrderOptions.DES}`,
  },
  {
    label: "Last update A-Z",
    value: `updatedDatetime:${SortOrderOptions.ACS}`,
  },
  {
    label: "Last update Z-A",
    value: `updatedDatetime:${SortOrderOptions.DES}`,
  },
];
