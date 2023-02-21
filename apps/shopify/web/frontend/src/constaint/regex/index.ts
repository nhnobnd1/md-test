import { object, ref, string } from "yup";

const regexPhoneValidate = /^(?:[0-9]{1,4})+-(?:[0-9]{3,15})$/;
const validateSchemaObjectPassword = object().shape({
  currentPassword: string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*#=\/^?&])[a-zA-Z@$!%*#=\/^?&\d]{8,}$/g,
      "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols"
    )
    .required("The current password is required"),
  newPassword: string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*#=\/^?&])[a-zA-Z@$!%*#=\/^?&\d]{8,}$/g,
      "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols"
    )
    .required("New Password is required!"),
  confirmNewPassword: string()
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*#=\/^?&])[a-zA-Z@$!%*#=\/^?&\d]{8,}$/g,
      "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols"
    )
    .required("Confirm New Password is required!")
    .oneOf(
      [ref("newPassword")],
      "Confirm New Password must match with New Password."
    ),
});

export { regexPhoneValidate, validateSchemaObjectPassword };
