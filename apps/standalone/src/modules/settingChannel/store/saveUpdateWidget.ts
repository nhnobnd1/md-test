import { create } from "zustand";

interface SettingState {
  update: Date;
  changeUpdate: (object: Date) => void;
}
export const initialSave = new Date();

const useUpdateSave = create<SettingState>()((set) => ({
  update: initialSave,
  changeUpdate: (object: Date) => set((state) => ({ update: object })),
}));
export default useUpdateSave;
