import { create } from "zustand";

interface SelectFromState {
  selected: string;
  changeSelected: (id: string) => void;
}

const useSelectFrom = create<SelectFromState>()((set) => ({
  selected: "",
  changeSelected: (id) => set(() => ({ selected: id })),
}));
export default useSelectFrom;
