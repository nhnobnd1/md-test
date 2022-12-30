import { memo, useCallback, useState } from "react";
export interface SwitchProps {
  setValue: (value: any) => void;
  inititalValue: any[];
  disabled: boolean;
}

const InputDisableSubmit = ({
  setValue,
  inititalValue,
  disabled,
}: SwitchProps) => {
  const [domainSubmit, setDomainSubmit] = useState("");
  const handleSubmitDomain = useCallback(
    (event: any) => {
      if (event.key === "Enter") {
        setValue([...inititalValue, domainSubmit.toLocaleLowerCase()]);
        setDomainSubmit("");
        event.preventDefault();
      }
    },
    [domainSubmit, setDomainSubmit, inititalValue]
  );
  return (
    <div className="Polaris-Connected">
      <div className="Polaris-Connected__Item Polaris-Connected__Item--primary">
        <div className="Polaris-TextField">
          <input
            type="text"
            placeholder="domainname.moosedesk.com"
            onKeyDown={handleSubmitDomain}
            value={domainSubmit}
            onChange={(e) => {
              setDomainSubmit(e.target.value);
            }}
            className="Polaris-TextField__Input"
            disabled={disabled}
          />
          <div className="Polaris-TextField__Backdrop"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(InputDisableSubmit);
