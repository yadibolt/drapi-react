import type { IUserRepo } from "../../../@intf/user/user-repo.i";
import type { IApiResponseUser } from "../../../@intf/user/user.i";
import { apiService } from "../../../service/global/api.s";

export const userRepo: IUserRepo = {
  g: async () => {
    const response = await apiService.get<IApiResponseUser>("/user");
    return response.data;
  },
};
