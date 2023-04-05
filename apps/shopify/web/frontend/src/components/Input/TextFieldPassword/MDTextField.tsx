import { Icon, TextField } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
interface IMDTextField {
  type?: "text" | "search";
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export const MDTextField = ({
  type = "text",
  label = "",
  value,
  onChange,
}: IMDTextField) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      autoComplete="off"
      suffix={type === "search" ? <Icon source={SearchMinor} /> : null}
    />
  );
};
