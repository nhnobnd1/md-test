import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MDInput } from "src/components/UI/Input";

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
      <div className="">
        <MDInput
          value={value}
          onChange={handleChangeValueInput}
          type="phone"
          autoComplete="off"
          maxLength={6}
          placeholder="OTP Code"
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
