import type { TPageValues } from "@/@types/content/page-values.t";
import type { IApiResponseBlogPage } from "./blog-page.i";

export interface IBlogPageRepo {
  get: (data: TPageValues) => Promise<IApiResponseBlogPage>;
}
