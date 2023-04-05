import moment from "moment";

const createdDatetimeFormat = (time: string | null | undefined) => {
  return time ? moment(time).format("DD/MM/YYYY HH:mm:ss") : "";
};
export { createdDatetimeFormat };
