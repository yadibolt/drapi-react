import { blogBlockRepo } from "./blog-block.repo";

export const BLOG_BLOCK_QUERY_KEY = ["blog-block"];

export const getBlogBlockQuery = () => ({
  queryKey: [BLOG_BLOCK_QUERY_KEY],
  queryFn: () => blogBlockRepo.get(),
});
