import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
dayjs.extend(duration);
dayjs.extend(utc);
export const startOfMonth = dayjs().utc().startOf("month").unix();
export const endOfMonth = dayjs().utc().endOf("month").unix();
export const convertToTimeStamp = (date: string) => {
  if (!date) return;
  return dayjs(date, "DD/MM/'YYYY").utc().unix();
};
export const convertToLongDate = (date: string) => {
  return dayjs(date, "MM/DD/YYYY").local().format("MMMM Do YYYY");
};
export const convertSecondsToHoursMinutes = (seconds: number) => {
  if (!seconds) return `0m`;
  const duration = dayjs.duration(seconds, "seconds");
  const hours = duration.hours();
  const minutes = duration.minutes();
  return `${hours}h${minutes}m`;
};
