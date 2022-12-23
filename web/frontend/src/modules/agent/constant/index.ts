import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";
import { Choice, SortOrderOptions } from "src/models/Form";

export const getStatusAgent = (
  isActive: boolean,
  emailConfirmed: boolean
): {
  label: string;
  status: Status;
} => {
  if (isActive) {
    if (emailConfirmed) {
      return {
        label: "Active",
        status: "success",
      };
    } else
      return {
        label: "Invited",
        status: "info",
      };
  } else
    return {
      label: "Deactivate",
      status: "critical",
    };
};

export const optionsSort: Choice[] = [
  { label: "Last name A-Z", value: `lastName:${SortOrderOptions.ACS}` },
  { label: "Last name Z-A", value: `lastName:${SortOrderOptions.DES}` },
  { label: "Email A-Z", value: `email:${SortOrderOptions.ACS}` },
  { label: "Email Z-A", value: `email:${SortOrderOptions.DES}` },
  { label: "Status A-Z", value: `isActive:${SortOrderOptions.ACS}` },
  { label: "Status Z-A", value: `isActive:${SortOrderOptions.DES}` },
  { label: "Role A-Z", value: `role:${SortOrderOptions.ACS}` },
  { label: "Role Z-A", value: `role:${SortOrderOptions.DES}` },
];
