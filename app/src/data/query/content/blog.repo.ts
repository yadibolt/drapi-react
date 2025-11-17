import type { IBlogPageRepo } from "@/@intf/content/blog-page-repo.i";
import type { IApiResponseBlogPage } from "@/@intf/content/blog-page.i";
import type { TPageValues } from "@/@types/content/page-values.t";
import { apiService } from "@/service/global/api.s";

export const blogPageRepo: IBlogPageRepo = {
  get: async (data: TPageValues) => {
    const response = await apiService.get<IApiResponseBlogPage>(
      `/${data.type}/${data.content_type}/${data.id}`,
    );
    return response.data;
  },
};
