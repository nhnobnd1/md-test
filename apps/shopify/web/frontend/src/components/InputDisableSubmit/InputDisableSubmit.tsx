import { useDidUpdate } from "@moose-desk/core";
import { InlineError } from "@shopify/polaris";
import { memo, useCallback, useState } from "react";
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
  error,
  setValue,
  onChange,
}: SwitchProps) => {
  const [domainSubmit, setDomainSubmit] = useState(value);
  const handleSubmitDomain = useCallback(
    (event: any) => {
      if (event.key === "Enter" && !error) {
        setValue &&
          setValue([...inititalValue, domainSubmit.toLocaleLowerCase()]);
        setDomainSubmit("");
        event.preventDefault();
      }
    },
    [domainSubmit, setDomainSubmit, inititalValue, error]
  );
  useDidUpdate(() => {
    setDomainSubmit(value);
  }, [value]);
  return (
    <div className="">
      <div className="Polaris-Connected">
        <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
          <div className="Polaris-TextField">
            <input
              type="text"
              placeholder="domainname.moosedesk.com"
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
      {error ? (
        <div className="Polaris-Labelled__Error">
          <InlineError message={error} fieldID="myFieldID" />
        </div>
      ) : null}
    </div>
  );
};

export default memo(InputDisableSubmit);
