import type { IUserLoginRepo } from "@/@intf/user/user-login-repo.i";
import type { IUserRepo } from "../../../@intf/user/user-repo.i";
import type { IApiResponseUser } from "../../../@intf/user/user.i";
import { apiAuthService, apiService } from "../../../service/global/api.s";
import type { IApiResponseUserLogin } from "@/@intf/user/user-login.i";
import type { TLoginValues } from "@/@types/form/login-values.t";

export const userRepo: IUserRepo = {
  get: async () => {
    const response = await apiService.get<IApiResponseUser>("/user");
    return response.data;
  },
};

export const userLoginRepo: IUserLoginRepo = {
  login: async (data: TLoginValues) => {
    const response = await apiAuthService.post<IApiResponseUserLogin>(
      "/login",
      {
        ...data,
      },
    );
    return response.data;
  },
};
