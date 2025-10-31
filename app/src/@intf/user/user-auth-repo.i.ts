import type { TLoginValues } from "@/@types/form/auth-values.t";
import type {
  IApiResponseUserLogin,
  IApiResponseUserLogout,
  IApiResponseUserPasswordReset,
} from "./user-auth.i";

export interface IUserAuthRepo {
  login: (data: TLoginValues) => Promise<IApiResponseUserLogin>;
  logout: () => Promise<IApiResponseUserLogout>;
  resetPassword: (email: string) => Promise<IApiResponseUserPasswordReset>;
}
