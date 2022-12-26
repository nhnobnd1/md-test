import { memo } from "react";
import { FormItemProps } from "./Item.types";
import FormItemContext from "./ItemContext";
import FormItemInput from "./ItemInput";

const FormItem = memo((props: FormItemProps) => {
  if (props.name) {
    return <FormItemInput {...props} />;
  }

  return <FormItemContext {...props} />;
});

export default FormItem;
