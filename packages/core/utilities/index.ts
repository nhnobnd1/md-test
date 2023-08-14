export { default as EventListenersManager } from "./EventListenersManager";
export {
  default as StorageManager,
  StorageManager as StorageManagerClass,
  TokenManager,
} from "./StorageManager";
export * from "./VariableWatcher";
export * from "./convertTime";
export * from "./object";
export * from "./regexes";
export * from "./request";
export * from "./useRole";

export function makeId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export function upperCaseFirst(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function priorityToTag(str: string) {
  switch (str.toLowerCase()) {
    case "urgent":
      return "error";
    case "high":
      return "warning";
    case "medium":
      return "processing";
    case "low":
      return "default";
    default:
      return "default";
  }
}
export function priorityToTagShopify(str: string) {
  switch (str.toLowerCase()) {
    case "urgent":
      return "critical";
    case "high":
      return "warning";
    case "medium":
      return "info";
    case "low":
      return undefined;
    default:
      return undefined;
  }
}

export function typeChannelTicket(isCreatedByWidget: boolean) {
  if (isCreatedByWidget) return "success";
  return "warning";
}

export enum MediaScreen {
  XS = 320,
  SM = 576,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XXL = 1600,
}
