import { ChatItem } from "src/modules/ticket/pages/DetailTicket";
import { create } from "zustand";

interface TicketCreateState {
  chatItem: ChatItem | undefined;
  clickForward: boolean;
  updateChatItem: (chatItem: ChatItem | undefined) => void;
}

const useForwardTicket = create<TicketCreateState>()((set) => ({
  chatItem: undefined,
  clickForward: false,
  updateChatItem: (object) =>
    set((state) => ({ chatItem: object, clickForward: !state.clickForward })),
}));
export default useForwardTicket;
