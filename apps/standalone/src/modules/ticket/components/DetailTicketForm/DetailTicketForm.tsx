import { Button, Card } from "antd";
import { useMemo } from "react";
import { Form, FormProps } from "src/components/UI/Form";
import Select, { OptionType } from "src/components/UI/Select/Select";
import BoxReply from "src/modules/ticket/components/DetailTicketForm/BoxReply";
import { Priority } from "src/modules/ticket/components/TicketForm";
import FaMailReply from "~icons/fa/mail-reply";

interface DetailTicketFormProps extends FormProps {}

const DetailTicketForm = (props: DetailTicketFormProps) => {
  const initialValues = useMemo(() => {
    return (
      props.initialValues ?? {
        status: "resolved",
        assignee: "1",
        priority: Priority.Highest,
      }
    );
  }, [props.initialValues]);

  const statusOptions = useMemo<OptionType[]>(() => {
    return [{ label: "Resolved", value: "resolved" }];
  }, []);

  const assigneeOptions = useMemo<OptionType[]>(() => {
    return [{ label: "Minh Thức", value: "1" }];
  }, []);

  const priorityOptions = useMemo<OptionType[]>(() => {
    return [
      {
        label: "Highest",
        value: Priority.Highest,
      },
      {
        label: "High",
        value: Priority.High,
      },
      {
        label: "Medium",
        value: Priority.Medium,
      },
      {
        label: "Low",
        value: Priority.Low,
      },
      {
        label: "Lowest",
        value: Priority.Lowest,
      },
    ];
  }, [Priority]);

  return (
    <Form
      layout="inline"
      initialValues={initialValues}
      enableLoadForm
      enableReinitialize
    >
      <Card className="w-full">
        <div className="w-full flex items-center gap-4">
          <Form.Item label="Status" name="status">
            <Select className="w-[150px]" options={statusOptions} />
          </Form.Item>
          <Form.Item label="Assignee" name="assignee">
            <Select prefixCls="" options={assigneeOptions} />
          </Form.Item>
        </div>
        <div className="flex justify-between items-center w-full mb-6">
          <Form.Item label="Priority" name="priority">
            <Select prefixCls="" options={priorityOptions} />
          </Form.Item>
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              icon={
                <span className="mr-2 translate-y-[3px]">
                  <FaMailReply fontSize={14} />
                </span>
              }
            >
              Reply
            </Button>
            <Button>Reply & Close Ticket</Button>
          </div>
        </div>
        <BoxReply />
      </Card>
    </Form>
  );
};

export default DetailTicketForm;
