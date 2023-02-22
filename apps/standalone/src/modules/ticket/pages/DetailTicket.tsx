import { Header } from "src/components/UI/Header";
import DetailTicketForm from "src/modules/ticket/components/DetailTicketForm/DetailTicketForm";

interface DetailTicketProps {}

const DetailTicket = (props: DetailTicketProps) => {
  return (
    <div>
      <Header justify="center" title="Ticket#: Ticket Title"></Header>

      <DetailTicketForm />
    </div>
  );
};

export default DetailTicket;
