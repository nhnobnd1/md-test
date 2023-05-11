import { object, ref, string } from "yup";

const regexPhoneValidate = /^(?:[0-9]{1,4})+-(?:[0-9]{3,15})$/;
const validateSchemaObjectPassword = object().shape({
  currentPassword: string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols"
    )
    .required("The current password is required"),
  newPassword: string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols"
    )
    .required("New Password is required!"),
  confirmNewPassword: string()
    .required("Confirm New Password is required!")
    .oneOf([ref("newPassword")], "The confirmation password is not match"),
});

export { regexPhoneValidate, validateSchemaObjectPassword };
