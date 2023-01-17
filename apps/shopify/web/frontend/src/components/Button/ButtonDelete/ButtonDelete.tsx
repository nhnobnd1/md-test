import { Button, ButtonProps, Icon } from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";

interface ButtonDeleteProps extends ButtonProps {}

export const ButtonDelete = ({ children, ...props }: ButtonDeleteProps) => {
  return (
    <Button
      icon={() => <Icon source={() => <DeleteMinor />} color="base" />}
      size="slim"
      destructive
      {...props}
    ></Button>
  );
};

export default ButtonDelete;
