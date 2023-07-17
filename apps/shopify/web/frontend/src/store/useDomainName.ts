import { create } from "zustand";

interface DomainNameState {
  name: string;
  changeName: (name: string) => void;
}

const useDomainName = create<DomainNameState>()((set) => ({
  name: new URL(window.location as any).searchParams
    .get("shop")
    ?.split(".")[0] as string,
  changeName: (name) => set(() => ({ name })),
}));
export default useDomainName;
