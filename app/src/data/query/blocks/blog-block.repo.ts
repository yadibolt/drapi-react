import type { IBlogTeasersRepo } from "@/@intf/content/blog-teasers-repo.i";
import { apiService } from "../../../service/global/api.s";
import type { IApiResponseBlogTeasers } from "@/@intf/content/blog-teasers.i";

export const blogBlockRepo: IBlogTeasersRepo = {
  get: async () => {
    const response = await apiService.get<IApiResponseBlogTeasers>(
      "/blog-teasers",
    );
    return response.data;
  },
};
