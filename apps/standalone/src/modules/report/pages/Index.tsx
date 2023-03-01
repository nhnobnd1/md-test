import { PageComponent, useToggle } from "@moose-desk/core";
import { DatePicker } from "antd";
import { useCallback } from "react";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
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
      <div className="card-statistic">
        <Statistic />
      </div>
    </>
  );
};

export default ReportIndexPage;
