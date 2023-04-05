export { default as EventListenersManager } from "./EventListenersManager";
export {
  default as StorageManager,
  StorageManager as StorageManagerClass,
  TokenManager,
} from "./StorageManager";
export * from "./VariableWatcher";
export * from "./object";
export * from "./regexes";
export * from "./request";
export * from "./useRole";
export * from "./convertTime";

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
