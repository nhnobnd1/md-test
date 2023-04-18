import { create } from "zustand";

interface SettingState {
  fullScreen: boolean;
  changeUpdateScreen: (boolean: boolean) => void;
}

const useFullScreen = create<SettingState>()((set) => ({
  fullScreen: false,
  changeUpdateScreen: (boolean: boolean) =>
    set((state) => ({ fullScreen: boolean })),
}));
export default useFullScreen;
