import { Button, ButtonProps, Icon } from "@shopify/polaris";
import { EditMinor } from "@shopify/polaris-icons";

interface ButtonEditProps extends ButtonProps {}

export const ButtonEdit = ({ children, ...props }: ButtonEditProps) => {
  return (
    <Button
      icon={() => <Icon source={() => <EditMinor />} color="base" />}
      size="slim"
      primary
      {...props}
    ></Button>
  );
};

export default ButtonEdit;
