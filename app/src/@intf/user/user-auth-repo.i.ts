import type {
  TLoginValues,
  TRegisterValues,
  TResetPasswordConfirmValues,
  TResetPasswordValues,
} from "@/@types/form/auth-values.t";
import type {
  IApiResponseUserLogin,
  IApiResponseUserLogout,
  IApiResponseUserPasswordReset,
  IApiResponseUserPasswordResetConfirm,
  IApiResponseUserRegister,
} from "./user-auth.i";

export interface IUserAuthRepo {
  login: (data: TLoginValues) => Promise<IApiResponseUserLogin>;
  logout: () => Promise<IApiResponseUserLogout>;
  register: (data: TRegisterValues) => Promise<IApiResponseUserRegister>;
  resetPassword: (
    data: TResetPasswordValues,
  ) => Promise<IApiResponseUserPasswordReset>;
  resetPasswordConfirm: (
    data: TResetPasswordConfirmValues,
  ) => Promise<IApiResponseUserPasswordResetConfirm>;
}
