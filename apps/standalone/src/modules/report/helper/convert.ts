import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(utc);
export const startOfMonth = dayjs().utc().startOf("month").unix();
export const endOfMonth = dayjs().utc().endOf("month").unix();
export const convertToTimeStamp = (date: string) => {
  if (!date) return;
  return dayjs(date, "MM/DD/YYYY").utc().unix();
};
export const convertToLongDate = (date: string) => {
  return dayjs(date, "MM/DD/YYYY").local().format("MMMM Do YYYY");
};
export const convertSecondsToHoursMinutes = (seconds: number) => {
  if (!seconds) return `0s`;
  const duration = dayjs.duration(seconds, "seconds");
  const hours = duration.hours();
  const minutes = duration.minutes();
  if (seconds < 60) {
    return `${seconds}s`;
  }
  if (seconds > 60 && seconds < 3600) {
    return `${minutes}m`;
  } else return `${hours}h${minutes}m`;
};
export const getTwoWeeksAfter = (currentTime: Date) => {
  // if (!currentTime) return;
  const twoWeekFromCurrent = dayjs(currentTime).add(2, "weeks");
  return twoWeekFromCurrent;
};
export const getTwoWeeksBefore = (currentTime: Date) => {
  const twoWeekBeforeCurrent = dayjs(currentTime).subtract(2, "weeks");
  return twoWeekBeforeCurrent;
};
export const convertTimeStamp = (
  date: Date,
  timezone: string,
  type: "start" | "end"
) => {
  const convertDate =
    type === "start"
      ? dayjs(date).tz(timezone).startOf("day")
      : dayjs(date).tz(timezone).endOf("day");
  return convertDate.unix();
};
export const getTimeFilterDefault = () => {
  return {
    twoWeekAgo: dayjs().subtract(2, "weeks"),
    current: dayjs(),
  };
};
