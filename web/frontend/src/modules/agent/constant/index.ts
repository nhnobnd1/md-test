import { Status } from "@shopify/polaris/build/ts/latest/src/components/Badge";

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
