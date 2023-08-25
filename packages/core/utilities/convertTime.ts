import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const createdDatetimeFormat = (
  time: string | null | undefined,
  timezone: null | string = null,
  format: string = "MM/DD/YYYY HH:mm:ss"
) => {
  if (timezone) {
    const currentTime = dayjs.utc().tz(timezone);
    const timeFormat = dayjs.utc(time).tz(timezone);
    const timeDifference = currentTime.diff(timeFormat, "second");
    let formattedTime;
    if (timeDifference > 7 * 60 * 60 * 24) {
      formattedTime = timeFormat.format("MMM D HH:mm");
    } else if (timeDifference > 60 * 60 * 24) {
      formattedTime = `${timeFormat.format("dddd HH:mm")}`;
    } else if (timeDifference > 60 * 60) {
      formattedTime = `${currentTime.from(timeFormat)} (${timeFormat.format(
        "HH:mm"
      )})`;
    } else {
      formattedTime = currentTime.from(timeFormat);
    }

    return time ? formattedTime : "";
  }
  return time ? dayjs(time).format(format) : "";
};
const createdDatetimeFormatDefault = (
  time: string | null | undefined,
  timezone: null | string = null,
  format: string = "MM/DD/YYYY HH:mm:ss"
) => {
  if (timezone) {
    return time ? dayjs.utc(time).tz(timezone).format(format) : "";
  }
  return time ? dayjs(time).format(format) : "";
};

export { createdDatetimeFormat, createdDatetimeFormatDefault };
