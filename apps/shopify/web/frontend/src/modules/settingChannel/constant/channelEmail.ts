import { Choice, SortOrderOptions } from "src/models/Form";

export const optionsSort: Choice[] = [
  { label: "Name A-Z", value: `name:${SortOrderOptions.ACS}` },
  { label: "Name Z-A", value: `name:${SortOrderOptions.DES}` },
  {
    label: "Email address A-Z",
    value: `supportEmail:${SortOrderOptions.ACS}`,
  },
  {
    label: "Email address Z-A",
    value: `supportEmail:${SortOrderOptions.ACS}`,
  },
];
