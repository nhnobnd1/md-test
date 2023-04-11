import dayjs from "dayjs";
export const getCurrentTime = () => {
  const moment = dayjs();
  return moment.format();
};
