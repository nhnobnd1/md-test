export interface RequestProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
export interface RequestPasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
