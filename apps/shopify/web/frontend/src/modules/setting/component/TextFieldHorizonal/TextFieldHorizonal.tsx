import { Text, TextField, TextFieldProps } from "@shopify/polaris";

interface TextFieldHorizonalProps {
  value?: string;
  onChange?: (value: string) => void;
  optionTextField: TextFieldProps;
}

const TextFieldHorizonal = (props: TextFieldHorizonalProps) => {
  return (
    <div className="flex items-center content-between">
      {props.optionTextField.label ? (
        <Text as="span" variant="bodyMd">
          {props.optionTextField.label}
        </Text>
      ) : null}
      <TextField
        {...props.optionTextField}
        label="textfield"
        labelHidden
        value={props.value}
        onChange={(value: string) => {
          props.onChange && props.onChange(value);
        }}
      />
    </div>
  );
};

export default TextFieldHorizonal;
