import { useDidUpdate } from "@moose-desk/core";
import { InlineError } from "@shopify/polaris";
import { memo, useCallback, useEffect, useState } from "react";
export interface InputDisableSubmit {
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
}: InputDisableSubmit) => {
  const [valueInput, setValueInput] = useState("");
  const [messageError, setMessageError] = useState(error);
  const [domainSubmit, setDomainSubmit] = useState(value);

  const handleChangeValueInput = useCallback((e) => {
    setValueInput(e.target.value);
    onChange && onChange(e.target.value);
    setDomainSubmit(e.target.value);
  }, []);
  const handleChangeDisabled = useCallback(() => {
    onChange && onChange(valueInput);
  }, [valueInput]);
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
    if (inititalValue.length === 0 && disabled) {
      setMessageError("The email domain is required!");
      if (disabled) {
        setMessageError("");
      }
    } else {
      if (inititalValue.length === 0 && !disabled) {
        setMessageError("The email domain is required!");
      }
    }
  }, [inititalValue, setMessageError, disabled]);
  useEffect(() => {
    setMessageError(error);
  }, [error, setMessageError]);
  useEffect(() => {
    if (disabled) {
      document
        .getElementById("div-input")
        ?.classList.add("Polaris-TextField--disabled");
    } else {
      document
        .getElementById("div-input")
        ?.classList.remove("Polaris-TextField--disabled");

      handleChangeDisabled();
    }
  }, [disabled]);
  return (
    <div className="">
      <div className="Polaris-Connected">
        <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
          <div id="div-input" className="Polaris-TextField">
            <input
              type="text"
              onKeyDown={handleSubmitDomain}
              value={domainSubmit}
              onChange={handleChangeValueInput}
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
