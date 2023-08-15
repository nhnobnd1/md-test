import { create } from "zustand";

interface BusinessHourState {
  tabSelected: string;
  formChanged: boolean;
  isReset: boolean;
  isSubmit: boolean;
  updateTabSelected: (tab: string) => void;
  updateFormDirty: (dirty: boolean) => void;
  handleResetForm: () => void;
  handleSubmitForm: () => void;
}

const useBusinessHour = create<BusinessHourState>()((set) => ({
  tabSelected: "1",
  isReset: false,
  isSubmit: false,
  formChanged: false,
  updateTabSelected: (tab) => set((state) => ({ tabSelected: tab })),

  updateFormDirty: (dirty) =>
    set((state) => ({ formChanged: dirty, isReset: false, isSubmit: false })),
  handleResetForm: () =>
    set((state) => ({ isReset: true, formChanged: false })),
  handleSubmitForm: () =>
    set((state) => ({ isSubmit: true, formChanged: false })),
}));
export default useBusinessHour;
