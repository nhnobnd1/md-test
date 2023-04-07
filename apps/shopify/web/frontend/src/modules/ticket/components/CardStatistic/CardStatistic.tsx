import { generatePath, useNavigate, useToggle } from "@moose-desk/core";
import { Collapsible, Icon } from "@shopify/polaris";
import { CaretDownMinor } from "@shopify/polaris-icons";
import { Option } from "src/models/Form";

import { StatusTicket } from "@moose-desk/repo";
import "./CardStatistic.scss";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface CardStatisticProps {
  options: Option[];
  title: string;
  className?: string;
  status?: string;
  handleApply?: (object: { status: string }) => void;
  screen: string;
}

const CardStatistic = ({
  className,
  options,
  title,
  status,
  screen,
  handleApply,
}: CardStatisticProps) => {
  const navigate = useNavigate();

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
              <div
                className={`label  cursor-pointer hover:underline hover:text-blue-500 ${
                  item.label.toUpperCase() === status ? "font-bold" : ""
                }`}
                onClick={() => {
                  if (item.label === "Trash" && screen === "ListTicket") {
                    navigate(generatePath(TicketRoutePaths.Trash));
                  }
                  if (item.label === "Pending") {
                    if (screen === "Trash") {
                      navigate(TicketRoutePaths.Index, {
                        state: StatusTicket.PENDING,
                      });
                      return;
                    }
                    handleApply &&
                      handleApply({
                        status: StatusTicket.PENDING,
                      });
                  }
                  if (item.label === "New") {
                    if (screen === "Trash") {
                      navigate(TicketRoutePaths.Index, {
                        state: StatusTicket.NEW,
                      });
                      return;
                    }
                    handleApply &&
                      handleApply({
                        status: StatusTicket.NEW,
                      });
                  }
                  if (item.label === "Open") {
                    if (screen === "Trash") {
                      navigate(TicketRoutePaths.Index, {
                        state: StatusTicket.OPEN,
                      });
                      return;
                    }
                    handleApply &&
                      handleApply({
                        status: StatusTicket.OPEN,
                      });
                  }
                  if (item.label === "Resolved") {
                    if (screen === "Trash") {
                      navigate(TicketRoutePaths.Index, {
                        state: StatusTicket.RESOLVED,
                        replace: true,
                      });
                      return;
                    }
                    handleApply &&
                      handleApply({
                        status: StatusTicket.RESOLVED,
                      });
                  }
                }}
              >
                {item.label}
              </div>
              <div
                className={`value ${
                  item.label.toUpperCase() === status ? "font-bold" : ""
                }`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </Collapsible>
    </div>
  );
};

export default CardStatistic;
