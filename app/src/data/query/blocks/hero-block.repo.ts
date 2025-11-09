import type { IHeroBlockRepo } from "@/@intf/block/hero-block-repo.i";
import { apiService } from "../../../service/global/api.s";
import type { IApiResponseHeroBlock } from "@/@intf/block/hero-block.i";

export const heroBlockRepo: IHeroBlockRepo = {
  get: async () => {
    const response = await apiService.get<IApiResponseHeroBlock>("/hero");
    return response.data;
  },
};
