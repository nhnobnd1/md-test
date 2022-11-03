export function createVariableWithWatcher<
  T extends { [key: string | symbol]: any }
>(target: T, onChange: (obj: T) => void) {
  return new Proxy(target, {
    set(obj, prop: keyof T, value) {
      obj[prop] = value;

      onChange(obj);

      return true;
    },
  });
}
