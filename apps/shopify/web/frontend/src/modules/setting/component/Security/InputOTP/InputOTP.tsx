import { InlineError, Text, TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

interface InputOTPProps {
  value?: string;
  onChange?: (value: string) => void;
  error?: any;
  errorMessage?: any;
  setErrorMessage: (value: string | undefined) => void;
}

const InputOTP = ({
  value,
  onChange,
  error,
  errorMessage,
  setErrorMessage,
}: InputOTPProps) => {
  const [errorText, setErrorText] = useState();
  const handleChangeValueInput = useCallback(
    (value: string) => {
      if (errorMessage) {
        setErrorMessage(undefined);
      }
      onChange && onChange(value);
    },
    [onChange, errorMessage]
  );
  useEffect(() => {
    if (error) {
      setErrorText(error);
    }
    if (errorMessage) {
      setErrorText(errorMessage);
    }
    if (!error && !errorMessage) {
      setErrorText(undefined);
    }
  }, [error, errorMessage]);
  return (
    <div className="flex items-center">
      <Text variant="bodyMd" as="span">
        OTP code
      </Text>
      <div className="w-20 ml-4">
        <TextField
          type="text"
          label="OTP code"
          labelHidden
          value={value}
          onChange={handleChangeValueInput}
          autoComplete="off"
          maxLength={6}
        />
      </div>
      {errorText ? (
        <div className="Polaris-Labelled__Error ml-2">
          <InlineError message={errorText} fieldID="myFieldID" />
        </div>
      ) : null}
    </div>
  );
};

export default InputOTP;
