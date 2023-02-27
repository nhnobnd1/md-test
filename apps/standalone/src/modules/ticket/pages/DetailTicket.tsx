import { Header } from "src/components/UI/Header";
import DetailTicketForm from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";

interface DetailTicketProps {}

const DetailTicket = (props: DetailTicketProps) => {
  return (
    <div>
      <Header title="Ticket#: Ticket Title" back></Header>

      <DetailTicketForm />
    </div>
  );
};

export default DetailTicket;
