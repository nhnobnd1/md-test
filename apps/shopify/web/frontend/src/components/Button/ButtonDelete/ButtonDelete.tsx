import { Button, ButtonProps, Icon } from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";

interface ButtonDeleteProps extends ButtonProps {}

export const ButtonDelete = ({ children, ...props }: ButtonDeleteProps) => {
  return (
    <Button
      icon={() => <Icon source={() => <DeleteMajor />} color="base" />}
      size="medium"
      destructive
      {...props}
    ></Button>
  );
};

export default ButtonDelete;
