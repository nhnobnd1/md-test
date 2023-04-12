import dayjs from "dayjs";

export const formatTimeDDMMYY = (timeString: string) => {
  return dayjs(timeString).format("DD/MM/YYYY");
};
