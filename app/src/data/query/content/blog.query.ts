import type { TPageValues } from "@/@types/content/page-values.t";
import { blogPageRepo } from "./blog.repo";

export const BLOG_QUERY_KEY = ["blog"];

export const getBlogQuery = (data: TPageValues) => ({
  queryKey: [BLOG_QUERY_KEY, data.id],
  queryFn: () => blogPageRepo.get(data),
});
