import { PageComponent, useToggle } from "@moose-desk/core";
import { DatePicker } from "antd";
import { useCallback } from "react";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import { ChartFirstResponseTime } from "src/modules/report/components/ChartFirstResponseTime";
import { ChartResolutionTime } from "src/modules/report/components/ChartResolutionTime";
import { ChartSupportVolume } from "src/modules/report/components/ChartSupportVolume";
import { Statistic } from "src/modules/report/components/Statistic";

interface ReportIndexPageProps {}

const ReportIndexPage: PageComponent<ReportIndexPageProps> = () => {
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
      <div className="card-statistic mb-8">
        <Statistic />
      </div>
      <div className="wrap-chart mb-[40px]">
        <div className="title text-lg font-semibold mb-6">Support Volume</div>
        <div className="w-full h-[450px]">
          <ChartSupportVolume />
        </div>
      </div>
      <div className="wrap-chart mb-[50px]">
        <div className="title text-lg font-semibold mb-6">
          Resolution Time (median)
        </div>
        <div className="w-full h-[450px]">
          <ChartResolutionTime />
        </div>
      </div>
      <div className="wrap-chart">
        <div className="title text-lg font-semibold mb-6">
          First Response Time (median)
        </div>
        <div className="w-full h-[450px]">
          <ChartFirstResponseTime />
        </div>
      </div>
    </>
  );
};

export default ReportIndexPage;
