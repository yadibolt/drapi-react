import type { IApiResponseBlogTeasers } from "./blog-teasers.i";

export interface IBlogTeasersRepo {
  get: () => Promise<IApiResponseBlogTeasers>;
}
