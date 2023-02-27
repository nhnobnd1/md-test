import { useToggle } from "@moose-desk/core";
import { Collapsible, Icon } from "@shopify/polaris";
import { CaretDownMinor } from "@shopify/polaris-icons";
import { Option } from "src/models/Form";
import "./CardStatistic.scss";

interface CardStatisticProps {
  options: Option[];
  title: string;
  className?: string;
}

const CardStatistic = ({ className, options, title }: CardStatisticProps) => {
  const { state: toggle, toggle: handleToggle } = useToggle(true);

  return (
    <div className={`${className} CardStatistic`}>
      <div className="collapsible-header">
        <span className="cursor-pointer inline-flex" onClick={handleToggle}>
          <Icon source={() => <CaretDownMinor />}></Icon>
          <span className="ml-1">{title}</span>
        </span>
      </div>
      <Collapsible
        open={toggle}
        id="basic-collapsible"
        transition={{ duration: "300ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        <div className="collapsible-body">
          {options.map((item, index) => (
            <div
              className="pb-2 flex justify-between items-center"
              key={`${index}-${item.label}`}
            >
              <div className="label">{item.label}</div>
              <div className="value">{item.value}</div>
            </div>
          ))}
        </div>
      </Collapsible>
    </div>
  );
};

export default CardStatistic;
