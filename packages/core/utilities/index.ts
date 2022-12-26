export { default as EventListenersManager } from "./EventListenersManager";
export * from "./object";
export * from "./request";
export { default as TokenManager } from "./TokenManager";
export * from "./VariableWatcher";

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
