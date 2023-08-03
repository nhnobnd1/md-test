import { create } from "zustand";

interface BusinessHourState {
  tabSelected: string;

  updateTabSelected: (tab: string) => void;
}

const useBusinessHour = create<BusinessHourState>()((set) => ({
  tabSelected: "1",
  updateTabSelected: (tab) => set((state) => ({ tabSelected: tab })),
}));
export default useBusinessHour;
