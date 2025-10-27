import type { IApiResponseUserToken } from "../../../@intf/user/user-token.i";
import type { ITokenRepo } from "../../../@intf/user/user-token-repo.i";
import { apiAuthService } from "../../../service/global/api.s";

export const tokenRepo: ITokenRepo = {
  g: async () => {
    const response = await apiAuthService.get<IApiResponseUserToken>("/token");
    return response.data;
  },
};
