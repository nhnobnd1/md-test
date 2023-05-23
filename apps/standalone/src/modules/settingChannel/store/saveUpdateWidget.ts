import { create } from "zustand";

interface SettingState {
  update: Date;
  cancel: Date;
  changeUpdate: (object: Date) => void;
  changeCancel: (object: Date) => void;
}
export const initialSave = new Date();
export const initialCancel = new Date();

const useUpdateSave = create<SettingState>()((set) => ({
  update: initialSave,
  cancel: initialCancel,
  changeUpdate: (object: Date) => set(() => ({ update: object })),
  changeCancel: (object: Date) => set(() => ({ cancel: object })),
}));
export default useUpdateSave;
