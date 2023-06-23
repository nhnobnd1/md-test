import { Ticket } from "@moose-desk/repo";
import { create } from "zustand";

interface TicketSelectedState {
  tickets: Ticket[];
  needTicket: Ticket[];

  changeTicketSelected: (tickets: Ticket[]) => void;
  getTicketSelected: (ids: string[]) => void;
}

const useTicketSelected = create<TicketSelectedState>()((set) => ({
  tickets: [],
  needTicket: [],
  changeTicketSelected: (tickets: Ticket[]) =>
    set((state) => ({ tickets: [...state.tickets, ...tickets] })),
  getTicketSelected: (ids: string[]) =>
    set((state) => {
      const mapping = ids.map((id) => {
        return state.tickets.find((ticket) => ticket._id === id);
      });
      return { needTicket: mapping as Ticket[] };
    }),
}));
export default useTicketSelected;
