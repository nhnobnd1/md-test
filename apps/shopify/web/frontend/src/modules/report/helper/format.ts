import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

export const formatTimeDDMMYY = (timeString: string) => {
  return dayjs(timeString).format("MM/DD/YYYY");
};
export const formatTimeByTimezone = (timezoneString: string | undefined) => {
  const currentDay = !timezoneString ? dayjs() : dayjs().tz(timezoneString);
  return {
    startOfMonthDateFormat: currentDay.startOf("month"),
    endOfMonthDateFormat: currentDay.endOf("month"),
    startOfMonth: currentDay.startOf("month").unix(),
    endOfMonth: currentDay.endOf("month").unix(),
  };
};
export const formatTimeStamp = (
  timeString: string,
  format: string,
  timezoneString: string
) => {
  const originalTime = dayjs(timeString, format);
  const timeFormatByTimezone = originalTime.tz(timezoneString);
  return timeFormatByTimezone.unix();
};
export const formatDefaultTimeRangePicker = (
  time: string,
  timezone: string | undefined
) => {
  if (!timezone) return dayjs.unix(Number(time)).format("MM-DD-YYYY");
  return dayjs.unix(Number(time)).tz(timezone).format("MM-DD-YYYY");
};
export const formatDefaultTimeRangePickerForRender = (
  time: string,
  timezone: string | undefined
) => {
  if (!timezone) return dayjs.unix(Number(time)).format("MM/DD/YYYY");
  return dayjs.unix(Number(time)).tz(timezone).format("MM/DD/YYYY");
};
