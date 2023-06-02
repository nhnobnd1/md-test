import { MailSettingType } from "@moose-desk/repo";
import { create } from "zustand";

interface SettingState {
  mailSettingType: string;
  isForwardEmailCreated: boolean;
  haveMooseDeskEmail: boolean;
  changeUpdate: (updateType: string) => void;
  changeUpdateMooseDeskEmail: (updateType: boolean) => void;
  createForwardEmail: () => void;
}
export const initialSave = MailSettingType.CUSTOM;

const useMailSetting = create<SettingState>()((set) => ({
  mailSettingType: initialSave,
  isForwardEmailCreated: false,
  haveMooseDeskEmail: false,

  createForwardEmail: () => set(() => ({ isForwardEmailCreated: true })),
  changeUpdate: (updateType: string) =>
    set(() => ({ mailSettingType: updateType })),
  changeUpdateMooseDeskEmail: (updateType: boolean) =>
    set(() => ({ haveMooseDeskEmail: updateType })),
}));
export default useMailSetting;
