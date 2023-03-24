import { CaretRightOutlined } from "@ant-design/icons";
import { generatePath, useNavigate } from "@moose-desk/core";
import { Collapse, CollapsePanelProps, CollapseProps } from "antd";
import { Option } from "src/models/Form";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

interface CardStatisticProps extends CollapseProps {
  options: Option[];
  panelProps: Omit<CollapsePanelProps, "key">;
  keyPanel: string;
}

export const CardStatistic = ({
  options,
  keyPanel,
  panelProps,
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
              className={`label ${
                item.label === "Trash"
                  ? "cursor-pointer hover:underline hover:text-blue-500"
                  : ""
              }`}
              onClick={() => {
                if (item.label === "Trash") {
                  navigate(generatePath(TicketRoutePaths.Trash));
                }
              }}
            >
              {item.label}
            </div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </Collapse.Panel>
    </Collapse>
  );
};

export default CardStatistic;
