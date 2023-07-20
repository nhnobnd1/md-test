import { create } from "zustand";

interface TicketCreateState {
  content: { [key: string]: string };
  updateContent: (object: { [key: string]: string }) => void;
}

const useDetailTicketContent = create<TicketCreateState>()((set) => ({
  content: {},
  updateContent: (object) =>
    set((state) => ({ content: { ...state.content, ...object } })),
}));
export default useDetailTicketContent;
