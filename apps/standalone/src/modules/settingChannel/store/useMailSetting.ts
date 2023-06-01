import { MailSettingType } from "@moose-desk/repo";
import { create } from "zustand";

interface SettingState {
  mailSettingType: string;
  isForwardEmailCreated: boolean;
  changeUpdate: (updateType: string) => void;
  createForwardEmail: () => void;
}
export const initialSave = MailSettingType.CUSTOM;

const useMailSetting = create<SettingState>()((set) => ({
  mailSettingType: initialSave,
  isForwardEmailCreated: false,
  createForwardEmail: () => set(() => ({ isForwardEmailCreated: true })),
  changeUpdate: (updateType: string) =>
    set(() => ({ mailSettingType: updateType })),
}));
export default useMailSetting;
