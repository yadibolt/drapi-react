import type { IPageResolverRepo } from "@/@intf/content/page-resolver-repo.i";
import { apiService } from "../../../service/global/api.s";
import type { TContentValues } from "@/@types/content/content-values.t";
import type { IApiResponsePage } from "@/@intf/content/page-resolver.i";

export const contentRepo: IPageResolverRepo = {
  get: async (data: TContentValues) => {
    const response = await apiService.get<IApiResponsePage>(
      "/resolve" + `?dest=${data.destination}`,
    );
    return response.data;
  },
};
