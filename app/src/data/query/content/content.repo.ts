import { apiService } from "../../../service/global/api.s";
import type { IApiResponseContent } from "@/@intf/content/content.i";
import type { IContentRepo } from "@/@intf/content/content-repo.i";
import type { TContentValues } from "@/@types/content/content-values.t";

export const contentRepo: IContentRepo = {
  get: async (data: TContentValues) => {
    const response = await apiService.get<IApiResponseContent>(
      "/content" + `?dest=${data.destination}`,
    );
    return response.data;
  },
};
