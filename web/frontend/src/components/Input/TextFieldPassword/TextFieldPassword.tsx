import { Icon, TextField, TextFieldProps } from "@shopify/polaris";
import { HideMinor, ViewMinor } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

export interface TextFieldPasswordProps
  extends Omit<TextFieldProps, "type" | "suffix"> {}

export const TextFieldPassword = (props: TextFieldPasswordProps) => {
  const [typeField, setTypeField] = useState<"password" | "text">("password");

  const toggleVisiblePassword = useCallback(() => {
    setTypeField((old) => {
      return old === "password" ? "text" : "password";
    });
  }, [typeField]);

  return (
    <TextField
      {...props}
      type={typeField}
      suffix={
        <span className="cursor-pointer" onClick={toggleVisiblePassword}>
          <Icon
            source={() => (
              <>{typeField === "password" ? <ViewMinor /> : <HideMinor />}</>
            )}
            color="base"
          ></Icon>
        </span>
      }
    ></TextField>
  );
};

export default TextFieldPassword;
