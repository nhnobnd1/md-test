import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const createdDatetimeFormat = (
  time: string | null | undefined,
  timezone: null | string = null
) => {
  if (timezone) {
    return time
      ? dayjs.utc(time).tz(timezone).format("MM/DD/YYYY HH:mm:ss")
      : "";
  }
  return time ? dayjs(time).format("MM/DD/YYYY HH:mm:ss") : "";
};

export { createdDatetimeFormat };
