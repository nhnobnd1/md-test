import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

export const formatTimeDDMMYY = (timeString: string) => {
  return dayjs(timeString).format("DD/MM/YYYY");
};
export const formatTimeByTimezone = (timezoneString: string | undefined) => {
  const currentDay = !timezoneString ? dayjs() : dayjs().tz(timezoneString);
  console.log({
    timezoneString: timezoneString,
    startOfMonth: currentDay.startOf("month").unix(),
    endOfMonth: currentDay.endOf("month").unix(),
  });
  return {
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
