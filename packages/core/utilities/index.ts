export { default as EventListenersManager } from "./EventListenersManager";
export * from "./object";
export * from "./regexes";
export * from "./request";
export {
  default as StorageManager,
  StorageManager as StorageManagerClass,
  TokenManager,
} from "./StorageManager";
export * from "./VariableWatcher";
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
