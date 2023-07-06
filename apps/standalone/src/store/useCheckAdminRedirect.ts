import { create } from "zustand";

interface SettingState {
  isRedirect: boolean;
  updateStatusRedirect: (status: boolean) => void;
}

const useCheckAdminRedirect = create<SettingState>()((set) => ({
  isRedirect: false,
  updateStatusRedirect: (status: boolean) =>
    set(() => ({ isRedirect: status })),
}));
export default useCheckAdminRedirect;
