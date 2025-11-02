import type { TContentValues } from "@/@types/content/content-values.t";
import { contentRepo } from "./content.repo";

export const CONTENT_QUERY_KEY = ["content"];

export const getContentQuery = (data: TContentValues) => ({
  queryKey: [CONTENT_QUERY_KEY],
  queryFn: () => contentRepo.get(data),
});
