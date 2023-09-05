import { Avatar } from "@shopify/polaris";
import React from "react";
import { getFirstCharacter } from "src/components/MDAvatar/helper/function";
interface IProps {
  email?: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  skeleton?: boolean;
}
const MDAvatar = ({
  email,
  firstName,
  lastName,
  source = "",
  skeleton = false,
  ...props
}: IProps) => {
  const convertAvatarText = () => {
    if (firstName?.trim() || lastName?.trim()) {
<<<<<<< HEAD
      return `${getFirstCharacter(firstName)}${getFirstCharacter(
        lastName
=======
      return `${getFirstCharacter(firstName?.trim())}${getFirstCharacter(
        lastName?.trim()
>>>>>>> 3d619f24 (save: begta)
      )}`.toUpperCase();
    }
    if (email) {
      return `${getFirstCharacter(email)}`.toUpperCase();
    }
    return "M";
  };
  return (
    <Avatar
      customer={skeleton}
      initials={convertAvatarText()}
      source={source}
      {...props}
    />
  );
};
export default React.memo(MDAvatar);
