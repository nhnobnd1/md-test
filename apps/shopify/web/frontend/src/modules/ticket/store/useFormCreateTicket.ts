import { create } from "zustand";

interface TicketCreateState {
  content: string | undefined;
  updateState(object: any): void;
  resetState(): void;
}

const useFormCreateTicket = create<TicketCreateState>()((set) => ({
  content: undefined,

  updateState: (object) =>
    set((state) => ({
      ...state,
      ...object,
    })),
  resetState: () =>
    set(() => ({
      content: "",
    })),
}));
export default useFormCreateTicket;
