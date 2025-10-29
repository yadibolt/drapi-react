import { tokenRepo } from "./token.repo";

export const TOKEN_QUERY_KEY = ["token"];

export const gTokenQuery = () => ({
  queryKey: [TOKEN_QUERY_KEY],
  queryFn: () => tokenRepo.get(),
});
