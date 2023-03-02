import { useToggle } from "@moose-desk/core";
import { DatePicker } from "antd";
import { useCallback } from "react";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import ChartAgentsTicket from "src/modules/report/components/ChartAgentsTicket/ChartAgentsTicket";
import { ReportAgentTable } from "src/modules/report/components/ReportAgentTable";

interface ByAgentPageProps {}

const ByAgentPage = (props: ByAgentPageProps) => {
  const [form] = Form.useForm();
  const { toggle: updateForm } = useToggle();

  const disabledStartDate = useCallback(
    (current) => {
      return form.getFieldValue("to")
        ? current > form.getFieldValue("to")
        : false;
    },
    [form.getFieldValue("to")]
  );

  const disabledEndDate = useCallback(
    (current) => {
      return form.getFieldValue("from")
        ? current < form.getFieldValue("from")
        : false;
    },
    [form.getFieldValue("from")]
  );

  return (
    <>
      <Header title="Reporting" />
      <Form onValuesChange={updateForm} form={form} layout="inline">
        <Form.Item name="from" label="From">
          <DatePicker
            format={"DD/MM/YYYY"}
            placeholder="dd/mm/yyyy"
            disabledDate={disabledStartDate}
          />
        </Form.Item>
        <Form.Item name="to" label="To">
          <DatePicker
            format={"DD/MM/YYYY"}
            placeholder="dd/mm/yyyy"
            disabledDate={disabledEndDate}
          />
        </Form.Item>
      </Form>
      <div className="wrap-chart mb-[40px] mt-6">
        <div className="title text-lg font-semibold mb-6">
          Ticket closed per agent per day (Top 5 Agents)
        </div>
        <div className="w-full h-[450px]">
          <ChartAgentsTicket />
        </div>
      </div>

      <div className="table w-full">
        <div className="title text-lg font-semibold mb-6">
          Tickets by Agents
        </div>
        <ReportAgentTable />
      </div>
    </>
  );
};

export default ByAgentPage;
