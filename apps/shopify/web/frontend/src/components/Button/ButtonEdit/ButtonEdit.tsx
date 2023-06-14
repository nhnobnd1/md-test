import { Button, ButtonProps, Icon } from "@shopify/polaris";
import { EditMinor } from "@shopify/polaris-icons";

interface ButtonEditProps extends ButtonProps {
  isTable?: boolean;
}

export const ButtonEdit = ({
  isTable = false,
  children,
  ...props
}: ButtonEditProps) => {
  return (
    <Button
      icon={<Icon source={EditMinor} color="base" />}
      plain={isTable}
      {...props}
    ></Button>
  );
};

export default ButtonEdit;
