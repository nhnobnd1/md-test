import { Button, ButtonProps, Icon } from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";

interface ButtonDeleteProps extends ButtonProps {
  isTable?: boolean;
}

export const ButtonDelete = ({
  isTable = false,
  children,
  ...props
}: ButtonDeleteProps) => {
  return (
    <Button
      icon={<Icon source={DeleteMinor} color="base" />}
      plain={isTable}
      {...props}
    ></Button>
  );
};

export default ButtonDelete;
