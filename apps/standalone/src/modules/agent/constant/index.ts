export const getStatusAgent = (
  isActive: boolean,
  emailConfirmed: boolean
): {
  label: string;
  color: string;
} => {
  if (isActive) {
    if (emailConfirmed) {
      return {
        label: "Active",
        color: "green",
      };
    } else
      return {
        label: "Invited",
        color: "blue",
      };
  } else
    return {
      label: "Deactivate",
      color: "red",
    };
};
