import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const createdDatetimeFormat = (
  time: string | null | undefined,
  timezone: null | string = null,
  format: string = "MM/DD/YYYY HH:mm:ss"
) => {
  if (timezone) {
    return time ? dayjs.utc(time).tz(timezone).format(format) : "";
  }
  return time ? dayjs(time).format(format) : "";
};

export { createdDatetimeFormat };
