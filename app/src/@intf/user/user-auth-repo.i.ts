import type {
  TLoginValues,
  TResetPasswordConfirmValues,
  TResetPasswordValues,
} from "@/@types/form/auth-values.t";
import type {
  IApiResponseUserLogin,
  IApiResponseUserLogout,
  IApiResponseUserPasswordReset,
  IApiResponseUserPasswordResetConfirm,
} from "./user-auth.i";

export interface IUserAuthRepo {
  login: (data: TLoginValues) => Promise<IApiResponseUserLogin>;
  logout: () => Promise<IApiResponseUserLogout>;
  resetPassword: (
    data: TResetPasswordValues,
  ) => Promise<IApiResponseUserPasswordReset>;
  resetPasswordConfirm: (
    data: TResetPasswordConfirmValues,
  ) => Promise<IApiResponseUserPasswordResetConfirm>;
}
