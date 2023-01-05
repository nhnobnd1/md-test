export const phoneNumberRegex = /(^[0-9]{9,16}$)\b/g;
export const usernameRegex = /^[a-z0-9\-\d@._]+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*#?&])[a-zA-Z@$!%*#?&\d]{8,32}$/g;

export function validateAsciiChars(input: string) {
  // eslint-disable-next-line no-control-regex
  return !/[^\x00-\x7F]/.test(input);
}
