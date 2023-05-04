import moment from "moment-timezone";
const createdDatetimeFormat = (
  time: string | null | undefined,
  timezone: null | string = null
) => {
  if (timezone) {
    return time ? moment(time).tz(timezone).format("MM/DD/YYYY HH:mm:ss") : "";
  }
  return time ? moment(time).format("MM/DD/YYYY HH:mm:ss") : "";
};
export { createdDatetimeFormat };
