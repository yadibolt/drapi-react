import type { TLoginValues } from "@/@types/form/login-values.t";
import type { IApiResponseUserLogin } from "./user-login.i";

export interface IUserLoginRepo {
  login: (data: TLoginValues) => Promise<IApiResponseUserLogin>;
}
