import { create } from "zustand";

interface DomainNameState {
  show: boolean;
  star: number;
  comment: string;
  isFetch: boolean;
  fetchStatistic: boolean;
  changeStar: (star: number) => void;
  changeComment: (comment: string) => void;
  changeShow: (show: boolean) => void;
  changeFetching: (isFetching: boolean) => void;
  changeFetchStatistic: (fetchStatistic: boolean) => void;
}

const useRating = create<DomainNameState>()((set) => ({
  show: false,
  star: 0,
  comment: "",
  isFetch: false,
  fetchStatistic: false,
  changeFetching: (isFetch) => set(() => ({ isFetch: isFetch })),
  changeComment: (comment) => set(() => ({ comment: comment })),
  changeStar: (star) => set(() => ({ star: star })),
  changeShow: (show) => set(() => ({ show: show })),
  changeFetchStatistic: (fetchStatistic) =>
    set(() => ({ fetchStatistic: fetchStatistic })),
}));
export default useRating;
