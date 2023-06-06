import { create } from "zustand";

interface SettingState {
  fullScreen: boolean;
  changeUpdateScreen: (boolean: boolean) => void;
}

const useFullScreen = create<SettingState>()((set) => ({
  fullScreen: true,
  changeUpdateScreen: (boolean: boolean) =>
    set((state) => ({ fullScreen: boolean })),
}));
export default useFullScreen;
