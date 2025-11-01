export type TLoginValues = {
  login: string;
  password: string;
};

export type TResetPasswordValues = {
  email: string;
};

export type TResetPasswordConfirmValues = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  token: string;
};

export type TJWTPasswordResetToken = {
  mod_sig: string;
  iss: string;
  iat: number;
  exp: number;
  data: TJWTPasswordResetTokenData;
};

export type TJWTPasswordResetTokenData = {
  user_id: number;
  mail: string;
  langcode: string;
};
