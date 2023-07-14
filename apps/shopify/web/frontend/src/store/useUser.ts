import * as jose from "jose";
import { create } from "zustand";

interface DomainNameState {
  user: any;
  changeUser: (token: string) => void;
}

const useUser = create<DomainNameState>()((set) => ({
  user: undefined,
  changeUser: (token) => set(() => ({ user: jose.decodeJwt(token) })),
}));
export default useUser;
