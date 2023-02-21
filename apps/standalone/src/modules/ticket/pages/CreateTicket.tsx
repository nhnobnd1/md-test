import { useNavigate } from "@moose-desk/core";
import { Button } from "antd";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { TicketForm } from "src/modules/ticket/components/TicketForm";

interface CreateTicketProps {}

const CreateTicket = (props: CreateTicketProps) => {
  const [form] = Form.useForm(undefined);
  const navigate = useNavigate();
  const message = useMessage();
  const notification = useNotification();

  return (
    <>
      <Header className="mb-[40px]" title="New Ticket" back>
        <div className="flex-1 flex justify-end items-center gap-2">
          <Button>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>
            Save
          </Button>
        </div>
      </Header>

      <TicketForm />
    </>
  );
};

export default CreateTicket;
