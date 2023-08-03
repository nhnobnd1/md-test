import { create } from "zustand";

interface DomainNameState {
  show: boolean;
  star: number;
  comment: string;
  isFetch: boolean;
  changeStar: (star: number) => void;
  changeComment: (comment: string) => void;
  changeShow: (show: boolean) => void;
  changeFetching: (isFetching: boolean) => void;
}

const useRating = create<DomainNameState>()((set) => ({
  show: false,
  star: 0,
  comment: "",
  isFetch: false,
  changeFetching: (isFetch) => set(() => ({ isFetch: isFetch })),
  changeComment: (comment) => set(() => ({ comment: comment })),
  changeStar: (star) => set(() => ({ star: star })),
  changeShow: (show) => set(() => ({ show: show })),
}));
export default useRating;
