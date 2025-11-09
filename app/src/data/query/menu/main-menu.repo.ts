import { apiService } from "../../../service/global/api.s";
import type { IMainMenuRepo } from "@/@intf/menu/main-menu-repo.i";
import type { IApiResponseMainMenu } from "@/@intf/menu/main-menu.i";

export const mainMenuRepo: IMainMenuRepo = {
  get: async () => {
    const response = await apiService.get<IApiResponseMainMenu>("/main-menu");
    return response.data;
  },
};
