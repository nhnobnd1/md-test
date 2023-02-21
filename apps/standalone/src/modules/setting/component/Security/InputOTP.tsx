import { Input, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";

interface InputOTPProps {
  value?: string;
  onChange?: (value: string) => void;
  errorMessage?: any;
  setErrorMessage: (value: string | undefined) => void;
}

const InputOTP = ({
  value,
  onChange,
  errorMessage,
  setErrorMessage,
}: InputOTPProps) => {
  const [errorText, setErrorText] = useState<string>();
  const handleChangeValueInput = useCallback(
    (e) => {
      if (errorMessage) {
        setErrorMessage(undefined);
      }
      onChange && onChange(e.target.value);
    },
    [onChange, errorMessage]
  );
  useEffect(() => {
    if (errorMessage) {
      setErrorText("The input OTP is incorrect!");
    } else {
      setErrorText(undefined);
    }
  }, [errorMessage]);
  return (
    <div className="flex items-center">
      <div className="w-20">
        <Input
          value={value}
          onChange={handleChangeValueInput}
          type="text"
          autoComplete="off"
          maxLength={6}
        />
      </div>
      {errorText ? (
        <div className="ml-2">
          <Typography.Text type="danger">{errorText}</Typography.Text>
        </div>
      ) : null}
    </div>
  );
};

export default InputOTP;
