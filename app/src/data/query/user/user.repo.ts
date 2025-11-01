import type { IUserAuthRepo } from "@/@intf/user/user-auth-repo.i";
import type { IUserRepo } from "../../../@intf/user/user-repo.i";
import type { IApiResponseUser } from "../../../@intf/user/user.i";
import { apiAuthService, apiService } from "../../../service/global/api.s";
import type {
  IApiResponseUserLogin,
  IApiResponseUserLogout,
  IApiResponseUserPasswordReset,
} from "@/@intf/user/user-auth.i";
import type {
  TLoginValues,
  TResetPasswordConfirmValues,
  TResetPasswordValues,
} from "@/@types/form/auth-values.t";

export const userRepo: IUserRepo = {
  get: async () => {
    const response = await apiService.get<IApiResponseUser>("/user");
    return response.data;
  },
};

export const userAuthRepo: IUserAuthRepo = {
  login: async (data: TLoginValues) => {
    const response = await apiAuthService.post<IApiResponseUserLogin>(
      "/login",
      {
        ...data,
      },
    );
    return response.data;
  },
  logout: async () => {
    const response = await apiAuthService.get<IApiResponseUserLogout>(
      "/logout",
    );
    return response.data;
  },
  resetPassword: async (data: TResetPasswordValues) => {
    const response = await apiAuthService.post<IApiResponseUserPasswordReset>(
      "/password/reset",
      { mail: data.email },
    );
    return response.data;
  },
  resetPasswordConfirm: async (data: TResetPasswordConfirmValues) => {
    const response = await apiAuthService.post<IApiResponseUserPasswordReset>(
      "/password/reset/confirm" + `?token=${encodeURIComponent(data.token)}`,
      { password: data.newPassword, password_confirm: data.confirmNewPassword },
    );
    return response.data;
  },
};
