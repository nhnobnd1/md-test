import { useDidUpdate } from "@moose-desk/core";
import { InlineError } from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";
export interface SwitchProps {
  inititalValue?: any[];
  disabled: boolean;
  value?: any;
  error?: string;
  setValue?: (value: any[]) => void;
  onChange?: (value: string) => void;
}

const InputDisableSubmit = ({
  inititalValue = [],
  disabled,
  value = "",
  error = "",
  setValue,
  onChange,
}: SwitchProps) => {
  const [messageError, setMessageError] = useState(error);
  const [domainSubmit, setDomainSubmit] = useState(value);
  const handleSubmitDomain = useCallback(
    (event: any) => {
      if (event.key === "Enter" && !messageError) {
        if (
          domainSubmit &&
          inititalValue.indexOf(domainSubmit.toLocaleLowerCase()) === -1
        ) {
          setValue &&
            setValue([...inititalValue, domainSubmit.toLocaleLowerCase()]);
        }
        setDomainSubmit("");
        event.preventDefault();
      }
    },
    [domainSubmit, setDomainSubmit, inititalValue, messageError]
  );
  useDidUpdate(() => {
    setDomainSubmit(value);
  }, [value]);
  useEffect(() => {
    if (inititalValue.length === 0 && !disabled) {
      setMessageError("Please, enter domain!");
    }
  }, [inititalValue, setMessageError, disabled]);
  useEffect(() => {
    setMessageError(error);
  }, [error, setMessageError]);
  useEffect(() => {
    if (disabled) {
      setMessageError("");
    }
  }, [disabled]);
  return (
    <div className="">
      <div className="Polaris-Connected">
        <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
          <div className="Polaris-TextField">
            <input
              type="text"
              onKeyDown={handleSubmitDomain}
              value={domainSubmit}
              onChange={(e) => {
                onChange && onChange(e.target.value);
                setDomainSubmit(e.target.value);
              }}
              className="Polaris-TextField__Input"
              disabled={disabled}
            />
            <div className="Polaris-TextField__Backdrop"></div>
          </div>
        </div>
      </div>
      {messageError ? (
        <div className="Polaris-Labelled__Error">
          <InlineError message={messageError} fieldID="myFieldID" />
        </div>
      ) : null}
    </div>
  );
};

export default memo(InputDisableSubmit);
