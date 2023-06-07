import { create } from "zustand";

interface SettingState {
  fullScreen: boolean;
  showNav: boolean;
  changeUpdateScreen: (boolean: boolean) => void;
  changeShowNav: (boolean: boolean) => void;
}

const useFullScreen = create<SettingState>()((set) => ({
  fullScreen: true,
  showNav: true,
  changeUpdateScreen: (boolean: boolean) =>
    set(() => ({ fullScreen: boolean })),
  changeShowNav: (boolean: boolean) => set(() => ({ showNav: boolean })),
}));
export default useFullScreen;
