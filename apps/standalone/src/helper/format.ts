import dayjs from "dayjs";

export const formatTime = (timeString: string) => {
  return dayjs(timeString).format("DD-MM-YYYY");
};
