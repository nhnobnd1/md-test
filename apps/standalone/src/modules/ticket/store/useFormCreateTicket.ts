import { Priority } from "@moose-desk/repo";
import { create } from "zustand";

interface TicketCreateState {
  priority: string;
  content: string;
  to: string;
  tags: string[];
  subject: string;
  assignee: string;
  updateState(object: any): void;
  resetState(): void;
}

const useFormCreateTicket = create<TicketCreateState>()((set) => ({
  priority: Priority.MEDIUM,
  content: "",
  to: "",
  tags: [],
  subject: "",
  assignee: "",
  updateState: (object) =>
    set((state) => ({
      ...state,
      ...object,
    })),
  resetState: () =>
    set(() => ({
      priority: Priority.MEDIUM,
      content: "",
      to: "",
      tags: [],
      subject: "",
      assignee: "",
    })),
}));
export default useFormCreateTicket;
