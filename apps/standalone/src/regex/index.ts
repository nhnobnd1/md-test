export const phoneNumberRegex = /^(?:[0-9]{1,4})+-(?:[0-9]{3,15})$/g;
export const usernameRegex = /^[a-z0-9\-\d@._]+$/;

export const passwordRegex =
  // eslint-disable-next-line no-useless-escape
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

export function validateAsciiChars(input: string) {
  // eslint-disable-next-line no-control-regex
  return !/[^\x00-\x7F]/.test(input);
}
export const regexPhoneValidate = /^(?:[0-9]{1,4})+-(?:[0-9]{3,15})$/;

export const rulesValidatePassword = [
  {
    pattern: passwordRegex,
    message:
      "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols",
  },
];
export const sentryRegex = /^https:\/\/([\w-]+\.)+moosedesk\.net.*$/;
