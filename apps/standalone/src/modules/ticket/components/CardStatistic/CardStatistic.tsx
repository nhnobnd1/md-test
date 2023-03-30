import { CaretRightOutlined } from "@ant-design/icons";
import { generatePath, useNavigate } from "@moose-desk/core";
import { StatusTicket } from "@moose-desk/repo";
import { Collapse, CollapsePanelProps, CollapseProps } from "antd";
import { Option } from "src/models/Form";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface CardStatisticProps extends CollapseProps {
  options: Option[];
  panelProps: Omit<CollapsePanelProps, "key">;
  keyPanel: string;
  handleApply?: (object: { status: string }) => void;
  status?: string;
}

export const CardStatistic = ({
  options,
  keyPanel,
  panelProps,
  handleApply,
  status,
  ...props
}: CardStatisticProps) => {
  const navigate = useNavigate();
  return (
    <Collapse
      {...props}
      defaultActiveKey={[keyPanel]}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      // style={{ background: }}
    >
      <Collapse.Panel {...panelProps} key={keyPanel}>
        {options.map((item) => (
          <div
            className="pb-2 flex justify-between items-center"
            key={`${panelProps.header}-${item.label}`}
          >
            <div
              className={`label  cursor-pointer hover:underline hover:text-blue-500 ${
                item.label.toUpperCase() === status ? "font-bold" : ""
              }`}
              onClick={() => {
                if (item.label === "Trash") {
                  navigate(generatePath(TicketRoutePaths.Trash));
                }
                if (item.label === "Pending") {
                  handleApply &&
                    handleApply({
                      status: StatusTicket.PENDING,
                    });
                }
                if (item.label === "New") {
                  handleApply &&
                    handleApply({
                      status: StatusTicket.NEW,
                    });
                }
                if (item.label === "Open") {
                  handleApply &&
                    handleApply({
                      status: StatusTicket.OPEN,
                    });
                }
                if (item.label === "Resolved") {
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
      </Collapse.Panel>
    </Collapse>
  );
};

export default CardStatistic;
